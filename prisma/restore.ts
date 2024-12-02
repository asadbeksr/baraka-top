import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const AMENITIES = [
  {
    name: "Wi-Fi",
    slug: "wifi",
  },
  {
    name: "Restroom",
    slug: "restroom",
  },
  {
    name: "Coffee Shop",
    slug: "coffee-shop",
  },
  {
    name: "Car Wash",
    slug: "car-wash",
  },
  {
    name: "Mini Market",
    slug: "mini-market",
  },
  {
    name: "ATM",
    slug: "atm",
  }
]

async function main() {
  console.log('Start seeding amenities...')
  
  // Seed amenities
  for (const amenity of AMENITIES) {
    const existingAmenity = await prisma.amenity.findUnique({
      where: { slug: amenity.slug },
    })

    if (!existingAmenity) {
      await prisma.amenity.create({
        data: {
          name: amenity.name,
          slug: amenity.slug,
          icon: amenity.slug,
        },
      })
      console.log(`Created amenity: ${amenity.name}`)
    } else {
      console.log(`Amenity already exists: ${amenity.name}`)
    }
  }

  // Seed stations
  console.log('Start seeding stations...')
  const stationsData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), 'filtered_stations.json'),
      'utf-8'
    )
  )

  for (const station of stationsData) {
    const existingStation = await prisma.station.findUnique({
      where: { id: station.id },
    })

    if (!existingStation) {
      // First create the station
      const createdStation = await prisma.station.create({
        data: {
          id: station.id,
          name: station.name,
          address: station.address,
          latitude: station.latitude,
          longitude: station.longitude,
        },
      })

      // Then connect amenities if they exist
      if (station.amenities && station.amenities.length > 0) {
        for (const amenitySlug of station.amenities) {
          const amenity = await prisma.amenity.findUnique({
            where: { slug: amenitySlug }
          })
          if (amenity) {
            await prisma.stationToAmenity.create({
              data: {
                station_id: createdStation.id,
                amenity_id: amenity.id,
              }
            })
          }
        }
      }

      console.log(`Created station: ${station.name}`)
    } else {
      console.log(`Station already exists: ${station.name}`)
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
