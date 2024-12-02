import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stationSchema } from "@/lib/validations/schemas";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { error: "Invalid request", message: "Station ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    
    // Parse and validate the request body
    const validatedData = stationSchema.parse(body);
    const { amenities, ...stationData } = validatedData;

    // Check if station exists
    const existingStation = await prisma.station.findUnique({
      where: { id: params.id },
      include: { amenities: true },
    });

    if (!existingStation) {
      return NextResponse.json(
        { error: "Not found", message: "Station not found" },
        { status: 404 }
      );
    }

    // Start a transaction to update both station and amenities
    const updatedStation = await prisma.$transaction(async (tx) => {
      // First, update the station data
      const station = await tx.station.update({
        where: { id: params.id },
        data: stationData,
      });

      // If amenities are provided, update them
      if (amenities && amenities.length > 0) {
        // Delete existing amenity connections for this station
        await tx.stationToAmenity.deleteMany({
          where: { station_id: station.id },
        });

        // Create new amenity connections
        await tx.stationToAmenity.createMany({
          data: amenities.map((amenity) => ({
            station_id: station.id,
            amenity_id: amenity.amenityId,
            enabled: amenity.enabled,
          })),
        });
      }

      // Return the updated station with amenities
      return tx.station.findUnique({
        where: { id: station.id },
        include: {
          amenities: {
            include: {
              amenity: true,
            },
          },
          photos: true
        }
      });
    });

    if (!updatedStation) {
      throw new Error("Failed to update station");
    }

    return NextResponse.json(updatedStation);
  } catch (error) {
    console.error("Error updating station:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation error", 
          message: "Invalid station data",
          details: error.errors 
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: "Update failed", 
          message: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: "Internal error", 
        message: "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}
