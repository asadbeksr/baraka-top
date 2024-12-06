import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { calculateDistance } from "./utils/distance";

interface Location {
  latitude: number;
  longitude: number;
}

// Maximum radius in kilometers to search for nearby stations
const MAX_RADIUS_KM = 99999; // Changed from 50km to 10km - adjust this value to change the search radius

// Fetch all stations with optional location filtering
export const getAllStations = async (userLocation?: Location | null) => {
  try {
    // First, let's check all stations in the database
    const allStations = await prisma.station.findMany({
      // sort by date in descending order
      orderBy: {
        created_at: 'desc'
      }
    });
    // console.log('Total stations in database:', allStations.length);

    // Check stations with any coordinates
    // const stationsWithAnyCoords = await prisma.station.findMany({
    //   where: {
    //     OR: [
    //       { latitude: { not: null } },
    //       { longitude: { not: null } }
    //     ]
    //   }
    // });
    
    // // console.log('Stations with any coordinates:', stationsWithAnyCoords.length);
    // // console.log('Sample stations with coordinates:', 
    // //   stationsWithAnyCoords.slice(0, 3).map(s => ({
    // //     id: s.id,
    // //     name: s.name,
    // //     latitude: s.latitude,
    // //     longitude: s.longitude
    // //   }))
    // // );

    // let stations;
    // if (userLocation?.latitude && userLocation?.longitude) {
    //   const lat = parseFloat(userLocation.latitude.toString().replace(',', '.'));
    //   const lng = parseFloat(userLocation.longitude.toString().replace(',', '.'));
      
    //   // console.log('Searching near coordinates:', { lat, lng });

    //   // Simple distance calculation for debugging
    //   stations = await prisma.station.findMany({
    //     where: {
    //       AND: [
    //         { latitude: { not: null } },
    //         { longitude: { not: null } }
    //       ]
    //     }
    //   });

    //   // Calculate distances manually for debugging
    //   stations = stations.map(station => {
    //     const distance = calculateDistance(
    //       lat,
    //       lng,
    //       Number(station.latitude),
    //       Number(station.longitude)
    //     );
    //     return { ...station, distance };
    //   }).filter(station => station.distance <= MAX_RADIUS_KM) // Using MAX_RADIUS_KM constant here
    //     .sort((a, b) => a.distance - b.distance);

    //   // console.log('Found stations:', stations.length);
    //   // if (stations.length > 0) {
    //   //   console.log('First 3 stations with distances:', 
    //   //     stations.slice(0, 3).map(s => ({
    //   //       name: s.name,
    //   //       latitude: s.latitude,
    //   //       longitude: s.longitude,
    //   //       distance: s.distance
    //   //     }))
    //   //   );
    //   // }
    // } else {
    //   stations = allStations;
    // }

    return allStations;
  } catch (error) {
    console.error('Error in getAllStations:', error);
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
            amenity: true,
          },
        },
      },
    });

    if (!station) return null;

    // Flatten the amenities structure
    const amenities = station.amenities.map((amenityRelation) => ({
      amenity_id: amenityRelation.amenity_id,
      enabled: amenityRelation.enabled,
      station_id: amenityRelation.station_id,
      ...amenityRelation.amenity, // Spread the amenity data here
    }));

    return {
      ...station,
      amenities, // Replace nested amenities with flattened ones
    };
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
        updatedAt: Prisma.sql`NOW()`,
        amenities: {
          deleteMany: {},
          create: amenities.map(amenity => ({
            amenity_id: amenity.amenity_id,
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
            amenity_id: amenity.amenity_id,
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
