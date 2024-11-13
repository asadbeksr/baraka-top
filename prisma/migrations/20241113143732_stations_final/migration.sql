/*
  Warnings:

  - You are about to drop the column `stationId` on the `amenities` table. All the data in the column will be lost.
  - Added the required column `station_id` to the `amenities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "amenities" DROP CONSTRAINT "amenities_stationId_fkey";

-- AlterTable
ALTER TABLE "amenities" DROP COLUMN "stationId",
ADD COLUMN     "station_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "amenities" ADD CONSTRAINT "amenities_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
