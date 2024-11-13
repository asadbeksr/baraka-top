/*
  Warnings:

  - You are about to drop the column `geolocation` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `location_description` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `stations` table. All the data in the column will be lost.
  - You are about to drop the column `working_hours` on the `stations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stations" DROP COLUMN "geolocation",
DROP COLUMN "location_description",
DROP COLUMN "title",
DROP COLUMN "working_hours",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "legal_name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "work_dates" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,

    CONSTRAINT "work_dates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "work_dates" ADD CONSTRAINT "work_dates_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
