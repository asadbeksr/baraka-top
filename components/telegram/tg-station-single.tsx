"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WebApp from "@twa-dev/sdk";
import { Bookmark, Navigation, Share2, StarIcon } from "lucide-react";

import { openMaps } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getAmenityIcon } from "@/components/icons/amenity-icons";

const nearbyStations = [
  {
    id: 3,
    pressure: 220,
    title: "Samarkand Methane Station",
    description:
      "Conveniently located near Samarkand's main highway, offering fast refueling services.",
    price: "3,750",
    rating: 4.7,
    image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  },
  {
    id: 4,
    pressure: 200,
    title: "Bukhara Methane Gas Station",
    description:
      "A well-maintained station in Bukhara with modern facilities and quick service.",
    price: "4,000",
    rating: 4.3,
    image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  },
  {
    id: 6,
    pressure: 210,
    title: "Bukhara Methane Gas Station",
    description:
      "A well-maintained station in Bukhara with modern facilities and quick service.",
    price: "4,000",
    rating: 4.3,
    image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  },
];

export default function TgStationSingle({ station }) {
  const shareOnTelegram = () => {
    const url = `https://t.me/metanchiuz_bot/app?startapp=p_1`;
    const text = `
Заправляйтесь удобно и быстро с Metanchi.uz`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank");
  };

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
            <Card key={station.id} className="w-[280px] flex-none">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={station.image}
                    alt={station.title}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-white">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span>{station.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 p-4">
                <h3 className="text-lg font-bold">{station.title}</h3>
                <p className="text-sm text-gray-400">{station.description}</p>
                <div className="mt-2 flex w-full items-center justify-between">
                  <span className="font-semibold">
                    {station.price} so&apos;m / m³
                  </span>

                  <Link href={`/telegram/stations/${station.id}`}>
                    <Button className="ml-2 bg-primary">Batafsil</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
