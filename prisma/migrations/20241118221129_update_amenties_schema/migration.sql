/*
  Warnings:

  - You are about to drop the column `enabled` on the `amenities` table. All the data in the column will be lost.
  - You are about to drop the column `station_id` on the `amenities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `amenities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `amenities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "amenities" DROP CONSTRAINT "amenities_station_id_fkey";

-- AlterTable
ALTER TABLE "amenities" DROP COLUMN "enabled",
DROP COLUMN "station_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "station_to_amenities" (
    "stationId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "station_to_amenities_pkey" PRIMARY KEY ("stationId","amenityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "amenities_slug_key" ON "amenities"("slug");

-- AddForeignKey
ALTER TABLE "station_to_amenities" ADD CONSTRAINT "station_to_amenities_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "station_to_amenities" ADD CONSTRAINT "station_to_amenities_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
