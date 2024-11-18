'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TgStations from "@/components/telegram/tg-stations";
import { requestLocation, type Location } from "@/lib/telegram";

import { Globe, LocateIcon, Map, SlidersHorizontalIcon } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    }
  }
}

export default function TgHome() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationRequest = async () => {
    setIsLoading(true);
    try {
      const location = await requestLocation();
      if (location) {
        setUserLocation(location);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filters = [
    { id: "all", label: "Hudud", icon: Globe },
    { 
      id: "location", 
      label: "Eng yaqini", 
      icon: LocateIcon,
      onClick: handleLocationRequest 
    },
    { id: "map", label: "Xarita", icon: Map, href: "/telegram/map" },
    // { id: "station", label: "Filtr", icon: SlidersHorizontalIcon },
  ];

  return (
    <div className="flex w-full flex-col">
      <ScrollArea className="no-scrollbar w-full border-b">
        <div className="flex gap-2 p-4">
          {filters.map((filter) => (
            filter.href ? (
              <Link key={filter.id} href={filter.href} passHref>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2"
                >
                  <filter.icon className="h-5 w-5" />
                  {filter.label}
                </Button>
              </Link>
            ) : (
              <Button
                key={filter.id}
                variant="ghost"
                className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2"
                onClick={filter.onClick}
              >
                <filter.icon className="h-5 w-5" />
                {filter.label}
              </Button>
            )
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="px-4 py-2 bg-secondary rounded-lg mx-4 mt-4">
        <p className="text-sm">Your location: {userLocation?.latitude.toFixed(6)}, {userLocation?.longitude.toFixed(6)}</p>
      </div>


      {/* <TgStations userLocation={userLocation} /> */}
    </div>
  );
}
