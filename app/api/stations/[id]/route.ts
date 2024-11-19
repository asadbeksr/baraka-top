import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stationUpdateSchema } from "@/lib/validations/schemas";
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
    const validatedData = stationUpdateSchema.parse(body);
    const { amenities, ...stationData } = validatedData;

    // Check if station exists
    const existingStation = await prisma.station.findUnique({
      where: { id: params.id },
      include: {
        amenities: true
      }
    });

    if (!existingStation) {
      return NextResponse.json(
        { error: "Not found", message: "Station not found" },
        { status: 404 }
      );
    }

    // Use a transaction to ensure data consistency
    const updatedStation = await prisma.$transaction(async (tx) => {
      // Update station data
      const updated = await tx.station.update({
        where: { id: params.id },
        data: {
          ...stationData,
          amenities: amenities ? {
            deleteMany: {},  // First delete all existing connections
            create: amenities.map(amenity => ({  // Then create new ones
              amenityId: amenity.amenityId,
              enabled: amenity.enabled
            }))
          } : undefined
        },
        include: {
          amenities: {
            include: {
              amenity: true
            }
          }
        }
      });

      return updated;
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
