import { NextResponse } from 'next/server';
import { getAllStations } from "@/lib/stations";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

const parseCoordinate = (coord: string): number => {
  // Replace comma with dot and remove any whitespace
  const parsed = parseFloat(coord.replace(',', '.').trim());
  // console.log('Parsing coordinate:', { input: coord, parsed });
  return parsed;
};

export async function GET(request: Request) {
  try {
    // Get location from query parameters
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('latitude');
    const lng = searchParams.get('longitude');

    // console.log('API received coordinates:', { lat, lng });

    let userLocation: { latitude: number; longitude: number; } | null = null;
    if (lat && lng) {
      // Parse coordinates, replacing comma with dot for decimal
      const latitude = parseFloat(lat.replace(',', '.'));
      const longitude = parseFloat(lng.replace(',', '.'));

      // console.log('Parsed coordinates:', { latitude, longitude });

      if (!isNaN(latitude) && !isNaN(longitude)) {
        userLocation = { latitude, longitude };
      } else {
        console.error('Invalid coordinates:', { lat, lng });
      }
    }

    const stations = await getAllStations(userLocation);
    // console.log('Found stations:', stations.length);
    
    return NextResponse.json({ stations });
  } catch (error) {
    console.error('Error in stations API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stations' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log('Request body:', body);
    const { amenities, ...stationData } = body;

    // First create the station without amenities
    const station = await prisma.station.create({
      data: stationData,
    });

    // Then create the amenity connections if there are any
    if (amenities && Array.isArray(amenities) && amenities.length > 0) {
      await prisma.stationToAmenity.createMany({
        data: amenities.map((amenity) => ({
          station_id: station.id,
          amenity_id: amenity.amenityId,
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