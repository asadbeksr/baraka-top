/*
  Warnings:

  - You are about to drop the column `relatedStationId` on the `related_stations` table. All the data in the column will be lost.
  - You are about to drop the column `jurerdicheskoe_naimenovanie` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `kolichestvo_kolonok` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `location_point` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `orientir` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `plotnost_metana` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `working_time` on the `stations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stationId,related_station_id]` on the table `related_stations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `related_station_id` to the `related_stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geolocation` to the `stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landmark` to the `stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legal_name` to the `stations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "related_stations" DROP CONSTRAINT "related_stations_relatedStationId_fkey";

-- DropIndex
DROP INDEX "related_stations_stationId_relatedStationId_key";

-- AlterTable
ALTER TABLE "related_stations" DROP COLUMN "relatedStationId",
ADD COLUMN     "related_station_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stations" DROP COLUMN "jurerdicheskoe_naimenovanie",
DROP COLUMN "kolichestvo_kolonok",
DROP COLUMN "location_point",
DROP COLUMN "orientir",
DROP COLUMN "plotnost_metana",
DROP COLUMN "working_time",
ADD COLUMN     "columns_count" INTEGER,
ADD COLUMN     "geolocation" TEXT NOT NULL,
ADD COLUMN     "landmark" TEXT NOT NULL,
ADD COLUMN     "legal_name" TEXT NOT NULL,
ADD COLUMN     "methane_density" DOUBLE PRECISION,
ADD COLUMN     "working_hours" TEXT,
ALTER COLUMN "pressure" DROP NOT NULL,
ALTER COLUMN "gas_temperature" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "related_stations_stationId_related_station_id_key" ON "related_stations"("stationId", "related_station_id");

-- AddForeignKey
ALTER TABLE "related_stations" ADD CONSTRAINT "related_stations_related_station_id_fkey" FOREIGN KEY ("related_station_id") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
