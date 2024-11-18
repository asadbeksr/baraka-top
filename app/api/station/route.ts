import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Handler for POST request (create a new station)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // Parse the request body

    // Remove any id field if present
    delete data.id;

    // Create a new station in the database
    const newStation = await prisma.station.create({
      data,
    });

    return NextResponse.json(newStation, { status: 200 });
  } catch (error) {
    console.error("Failed to create station:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to create station", 
      { status: 500 }
    );
  }
}

// Handler for PUT request (update an existing station)
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json(); // Parse the request body
    const { id, ...updateData } = data;

    if (!id) {
      return new NextResponse("Station ID is required", { status: 400 });
    }

    // Update an existing station in the database
    const updatedStation = await prisma.station.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedStation, { status: 200 });
  } catch (error) {
    console.error("Failed to update station:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to update station",
      { status: 500 }
    );
  }
}

// Handler for DELETE request (delete an existing station)
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json(); // Parse the request body

    if (!id) {
      return new NextResponse("Station ID is required", { status: 400 });
    }

    // Delete an existing station in the database
    const deletedStation = await prisma.station.delete({
      where: { id },
    });

    return NextResponse.json(deletedStation, { status: 200 });
  } catch (error) {
    console.error("Failed to delete station:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to delete station",
      { status: 500 }
    );
  }
}