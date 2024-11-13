-- CreateTable
CREATE TABLE "stations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location_description" TEXT NOT NULL,
    "location_point" TEXT NOT NULL,
    "orientir" TEXT NOT NULL,
    "jurerdicheskoe_naimenovanie" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pressure" DOUBLE PRECISION NOT NULL,
    "working_time" TEXT NOT NULL,
    "kolichestvo_kolonok" INTEGER NOT NULL,
    "gas_temperature" DOUBLE PRECISION NOT NULL,
    "plotnost_metana" DOUBLE PRECISION NOT NULL,
    "live_camera_ip" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "stationId" TEXT NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "related_stations" (
    "id" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "relatedStationId" TEXT NOT NULL,

    CONSTRAINT "related_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "stationId" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "related_stations_stationId_relatedStationId_key" ON "related_stations"("stationId", "relatedStationId");

-- AddForeignKey
ALTER TABLE "amenities" ADD CONSTRAINT "amenities_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_stations" ADD CONSTRAINT "related_stations_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_stations" ADD CONSTRAINT "related_stations_relatedStationId_fkey" FOREIGN KEY ("relatedStationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
