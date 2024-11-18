import {  prisma } from "@/lib/db";

// Fetch all stations
export const getAllStations = async () => {
  try {
    const stations = await prisma.station.findMany();
    return stations;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch all amenities
export const getAllAmenities = async () => {
  try {
    const amenities = await prisma.amenity.findMany();
    return amenities;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch station by ID
export const getStationById = async (id: string) => {
  if (!id) {
    return null;
  }
  
  try {
    const station = await prisma.station.findUnique({
      where: { id: String(id) },
      include: {
        amenities: {
          include: {
            amenity: true
          }
        }
      }
    });
    return station;
  } catch (error) {
    console.error('Error fetching station:', error);
    return null;
  }
};

// Update station by ID
export const updateStation = async (id, data) => {
  const { amenities, ...stationData } = data;
  
  try {
    const updatedStation = await prisma.station.update({
      where: { id },
      data: {
        ...stationData,
        amenities: {
          deleteMany: {},
          create: amenities.map(amenity => ({
            amenityId: amenity.amenityId,
            enabled: amenity.enabled
          }))
        }
      },
      include: {
        amenities: {
          include: {
            amenity: true
          }
        }
      }
    });
    return updatedStation;
  } catch (error) {
    console.error("Failed to update station:", error);
    return null;
  }
};

// Create a new station
export const createStation = async (data) => {
  const { amenities, ...stationData } = data;
  
  try {
    const station = await prisma.station.create({
      data: {
        ...stationData,
        amenities: {
          create: amenities.map(amenity => ({
            amenityId: amenity.amenityId,
            enabled: amenity.enabled
          }))
        }
      },
      include: {
        amenities: {
          include: {
            amenity: true
          }
        }
      }
    });
    return station;
  } catch (error) {
    console.error("Failed to create station:", error);
    return null;
  }
};

// Delete a station by ID
export const deleteStation = async (id) => {
  try {
    const deletedStation = await prisma.station.delete({
      where: { id },
    });
    return deletedStation;
  } catch (error) {
    console.error("Failed to delete station:", error);
    return null;
  }
};
