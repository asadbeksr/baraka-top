import { NextResponse } from 'next/server';
import { getAllStations } from "@/lib/stations";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stations = await getAllStations();
    return NextResponse.json({ stations });
  } catch (error) {
    console.error('Error fetching stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stations' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { amenities, ...stationData } = body;

    // First create the station without amenities
    const station = await prisma.station.create({
      data: stationData,
    });

    // Then create the amenity connections if there are any
    if (amenities && Array.isArray(amenities) && amenities.length > 0) {
      await prisma.stationToAmenity.createMany({
        data: amenities.map((amenity) => ({
          stationId: station.id,
          amenityId: amenity.amenityId,
          enabled: amenity.enabled,
        })),
      });
    }

    // Fetch the created station with amenities
    const createdStation = await prisma.station.findUnique({
      where: {
        id: station.id,
      },
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    return NextResponse.json(createdStation);
  } catch (error) {
    console.error("Error creating station:", error);
    // Log the full error details
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return new NextResponse(
      JSON.stringify({ 
        error: "Internal error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }), 
      { status: 500 }
    );
  }
}