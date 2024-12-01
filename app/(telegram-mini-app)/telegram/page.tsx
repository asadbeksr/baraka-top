'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TgStations from "@/components/telegram/tg-stations";
import { requestLocation, type Location } from "@/lib/telegram";

import { Globe, LocateIcon, Map, MapPinIcon } from "lucide-react";
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
    // { id: "all", label: "Hudud", icon: Globe },
    { 
      id: "location", 
      label: "Eng yaqin", 
      icon: MapPinIcon,
      onClick: handleLocationRequest,
      isActive: !!userLocation
    },
    { id: "map", label: "Xarita", icon: Map, href: "/telegram/map" },
  ];

  return (
    <div className="flex w-full flex-col">
      <ScrollArea className="no-scrollbar w-full border-b">
        <div className="flex gap-2 p-4">
          {filters.map((filter) => (
            filter.href ? (
              <Link key={filter.id} href={filter.href} passHref>
                <Button
                  variant="secondary"
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2"
                >
                  <filter.icon className="h-5 w-5" />
                  {filter.label}
                </Button>
              </Link>
            ) : (
              <Button
                key={filter.id}
                variant={filter.isActive ? "default" : "secondary"}
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

      {/* <TgStations userLocation={userLocation}
      filterByLocation={true}
      /> */}
    </div>
  );
}
