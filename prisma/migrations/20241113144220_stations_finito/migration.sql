/*
  Warnings:

  - You are about to drop the column `stationId` on the `photos` table. All the data in the column will be lost.
  - Added the required column `station_id` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_stationId_fkey";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "stationId",
ADD COLUMN     "station_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
