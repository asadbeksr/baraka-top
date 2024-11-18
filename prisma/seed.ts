import { PrismaClient } from '@prisma/client'
import { AMENITIES } from '../config/amenities'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding amenities...')
  
  for (const amenity of AMENITIES) {
    const existingAmenity = await prisma.amenity.findUnique({
      where: { slug: amenity.slug },
    })

    if (!existingAmenity) {
      await prisma.amenity.create({
        data: {
          name: amenity.name,
          slug: amenity.slug,
          icon: amenity.slug, // You can update icons later
        },
      })
      console.log(`Created amenity: ${amenity.name}`)
    } else {
      console.log(`Amenity already exists: ${amenity.name}`)
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