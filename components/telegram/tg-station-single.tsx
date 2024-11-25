"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WebApp from "@twa-dev/sdk";
import { Bookmark, Navigation, Share2, StarIcon } from "lucide-react";

import { nearbyStations } from "@/lib/mock";
import { getTelegramWebApp, shareOnTelegram } from "@/lib/telegram";
import { openTgLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { getAmenityIcon } from "@/components/icons/amenity-icons";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { StationCard } from "../cards/station-card";

const TgMapComponent = dynamic(() => import("@/components/telegram/tg-map"), {
  ssr: false,
});

export default function TgStationSingle({ station }) {
  const router = useRouter();
  // Set up back button
  useEffect(() => {
    const tg = getTelegramWebApp();
    console.log("tg", tg.BackButton);
    if (!tg?.BackButton) return;

    // Show back button
    tg.BackButton.show();

    // Set up click handler
    tg.BackButton.onClick(() => {
      router.back();
    });

    // Cleanup when component unmounts
    return () => {
      tg.BackButton.hide();
    };
  }, [router]);

  return (
    <div>
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
                height={320}
                className="aspect-video w-full rounded-b-md object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
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

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center gap-2 bg-card py-4"
              >
                <Navigation className="h-6 w-6" />
                <span>Yo&apos;nalish</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col divide-y">
                <div className="py-2 px-4">
                  <Button 
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-start gap-3 p-3"
                    onClick={() => window.open(`yandexnavi://build_route_on_map?lat_to=${station.latitude}&lon_to=${station.longitude}`)}
                  >
                    <Image
                      src="/maps/navigator.webp"
                      alt="Yandex Navigator"
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span>Yandex Navigator</span>
                  </Button>
                </div>
                <div className="py-2 px-4">
                  <Button 
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-start gap-3 p-3"
                    onClick={() => window.open(`https://yandex.ru/maps/?rtext=~${station.latitude},${station.longitude}&rtt=auto`)}
                  >
                    <Image
                      src="/maps/yandex.webp"
                      alt="Yandex Maps"
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span>Yandex Maps</span>
                  </Button>
                </div>
                <div className="py-2 px-4">
                  <Button 
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-start gap-3 p-3"
                    onClick={() => window.open(`google://?daddr=${station.latitude},${station.longitude}&directionsmode=driving`)}
                  >
                    <Image
                      src="/maps/google.webp"
                      alt="Google Maps"
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span>Google Maps</span>
                  </Button>
                </div>
                <div className="py-2 px-4">
                  <Button 
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-start gap-3 p-3"
                    onClick={() => window.open(`maps://?daddr=${station.latitude},${station.longitude}&dirflg=d`)}
                  >
                    <Image
                      src="/maps/apple.webp"
                      alt="Apple Maps"
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span>Apple Maps</span>
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {station.amenities.some((amenity) => amenity.enabled) && (
        <div className="space-y-3 p-6">
          <h2 className="text-2xl font-bold">Qulayliklar</h2>
          <Card className="grid grid-cols-2 gap-x-4 gap-y-6 p-4">
            {station.amenities.map((amenity) => {
              const icon = getAmenityIcon(amenity.icon);
              if (!amenity.enabled) return null;

              return (
                <div
                  key={amenity.amenityId}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 flex-shrink-0">{icon}</div>
                  <span className="text-lg">{amenity.name}</span>
                </div>
              );
            })}
          </Card>
        </div>
      )}

      <div className="mb-8 space-y-3 p-6">
        <h2 className="text-2xl font-bold">Xaritada</h2>
        <div className="relative h-[220px]">
          <TgMapComponent
            stations={[station]}
            initialLocation={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            height="250px"
            disablePopup
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
              className="w-[300px] flex-none"
              onShare={shareOnTelegram}
              onSave={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
