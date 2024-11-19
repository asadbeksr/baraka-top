"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WebApp from "@twa-dev/sdk";
import { Bookmark, Navigation, Share2, StarIcon } from "lucide-react";

import { openMaps } from "@/lib/utils";
import { shareOnTelegram } from "@/lib/telegram";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getAmenityIcon } from "@/components/icons/amenity-icons";
import { StationCard } from "../cards/station-card";

const nearbyStations = [
  {
    id: "3",
    pressure: 220,
    price: 4500,
    rating: 4.5,
    name: "Shayxontohur Gas Station",
    address: "Shayxontohur District, Tashkent",
    imageUrl: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    landmark: "Near Central Market",
    legalName: "Shayxontohur Gas LLC",
    columnsCount: 4,
    gasTemperature: 15,
    methaneDensity: 0.668,
    cameraIP: null,
    phoneNumber: "+998901234567",
    region: "Tashkent",
    website: null,
    latitude: 41.311081,
    longitude: 69.240562,
    amenities: []
  },
  {
    id: "4",
    pressure: 210,
    price: 4600,
    rating: 4.8,
    name: "Yunusabad Gas Station",
    address: "Yunusabad District, Tashkent",
    imageUrl: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    landmark: "Near Metro Station",
    legalName: "Yunusabad Gas LLC",
    columnsCount: 6,
    gasTemperature: 16,
    methaneDensity: 0.671,
    cameraIP: null,
    phoneNumber: "+998901234568",
    region: "Tashkent",
    website: null,
    latitude: 41.325095,
    longitude: 69.268642,
    amenities: []
  },
  {
    id: "5",
    pressure: 215,
    price: 4550,
    rating: 4.6,
    name: "Chilonzor Gas Station",
    address: "Chilonzor District, Tashkent",
    imageUrl: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    landmark: "Near Shopping Mall",
    legalName: "Chilonzor Gas LLC",
    columnsCount: 5,
    gasTemperature: 15.5,
    methaneDensity: 0.669,
    cameraIP: null,
    phoneNumber: "+998901234569",
    region: "Tashkent",
    website: null,
    latitude: 41.285698,
    longitude: 69.204229,
    amenities: []
  }
];

export default function TgStationSingle({ station }) {
  return (
    <div className="min-h-screen bg-black pb-20 text-white">
      {/* <div className="relative aspect-video">
   <img src="http://97.68.104.34:80/mjpg/video.mjpg" alt="Live Camera Feed" width="100%" height="auto" />
   </div> */}

      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4].map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src="https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg"
                alt={`Football field ${index + 1}`}
                width={800}
                height={400}
                className="aspect-video w-full rounded-b-xl object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="space-y-3 p-6">
        <h1 className="text-2xl font-bold text-primary">{station?.name}</h1>

        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center gap-2 bg-card py-4"
          >
            <Bookmark className="h-6 w-6" />
            <span>Saqlash</span>
          </Button>
          <Button
            onClick={shareOnTelegram}
            variant="outline"
            className="flex h-auto flex-col items-center gap-2 bg-card py-4"
          >
            <Share2 className="h-6 w-6" />
            <span>Ulashish</span>
          </Button>

          <Button
            variant="outline"
            className="flex h-auto flex-col items-center gap-2 bg-card py-4"
            onClick={() => openMaps(station.longitude, station.latitude)}
          >
            <Navigation className="h-6 w-6" />
            <span>Borish</span>
          </Button>
        </div>
      </div>

      {!!station.amenities.length && (
        <div className="space-y-3 p-6">
          <h2 className="text-2xl font-bold">Qulayliklar</h2>
          <Card className="grid grid-cols-2 gap-x-4 gap-y-6 p-4">
            {station.amenities.map((amenity) => {
              const icon = getAmenityIcon(amenity.amenity.icon);

              return (
                <div
                  key={amenity.amenityId}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 flex-shrink-0">{icon}</div>
                  <span className="text-lg">{amenity.amenity.name}</span>
                </div>
              );
            })}
          </Card>
        </div>
      )}

      <div className="space-y-3 p-6">
        <h2 className="text-2xl font-bold"> Xaritada joylashuvi</h2>
        <div className="relative aspect-video">
          <Image
            src="/_static/map.png"
            alt="map image"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </div>

      <div className="space-y-3 p-6">
        <h2 className="text-2xl font-bold">Yaqin shahobchalar</h2>
        <div className="no-scrollbar flex gap-4 overflow-scroll pb-4">
          {nearbyStations.map((station) => (
            <StationCard
              key={station.id}
              station={station}
              variant="default"
              showAmenities={false}
              className="w-[280px] flex-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
