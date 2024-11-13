import { prisma } from "@/lib/db";

export const getAllStations = async () => {
  try {
    const stations = await prisma.station.findMany();

    console.log(stations, 'S T A T I O N S')

    return stations;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getStationById = async (id: string) => {
  try {
    const station = await prisma.station.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,         
        address: true
      },
    });

    return station;
  } catch (error) {
    console.error(error);
    return null;
  }
};
