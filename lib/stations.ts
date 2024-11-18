import { prisma } from "@/lib/db";

// Fetch all stations
export const getAllStations = async () => {
  try {
    const stations = await prisma.station.findMany();
    console.log(stations, 'S T A T I O N S');
    return stations;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch station by ID
export const getStationById = async (id: string) => {
  console.log('Fetching station with ID:', id);
  if (!id) {
    console.log('No ID provided');
    return null;
  }
  
  try {
    const station = await prisma.station.findUnique({
      where: { id: String(id) },
    });
    console.log('Found station:', station);
    return station;
  } catch (error) {
    console.error('Error fetching station:', error);
    return null;
  }
};

// Update station by ID
export const updateStation = async (id, data) => {
  try {
    const updatedStation = await prisma.station.update({
      where: { id },
      data,
    });
    console.log(updatedStation, 'Updated Station');
    return updatedStation;
  } catch (error) {
    console.error("Failed to update station:", error);
    return null;
  }
};

// Create a new station
export const createStation = async (data) => {
  try {
    const newStation = await prisma.station.create({
      data,
    });
    console.log(newStation, 'New Station Created');
    return newStation;
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
    console.log(deletedStation, 'Deleted Station');
    return deletedStation;
  } catch (error) {
    console.error("Failed to delete station:", error);
    return null;
  }
};
