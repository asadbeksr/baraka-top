"use client";

import { useEffect, useState, useRef } from "react";
import { type Station } from "@/types";
import { openMaps, cn, formatPricePerM3 } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface TgMapProps {
  stations?: Station[];
  initialLocation: { latitude: number; longitude: number };
  height?: string;
  disablePopup?: boolean;
  zoom?: number;
  controls?: string[];
}

const DEFAULT_CENTER: [number, number] = [41.311081, 69.240562];
const DEFAULT_ZOOM = 11;

declare global {
  interface Window {
    ymaps: any;
  }
}

const isValidStation = (station: Station): boolean => {
  return Boolean(
    station &&
    typeof station.latitude === 'number' &&
    typeof station.longitude === 'number' &&
    station.name &&
    station.id
  );
};

export default function TgMapComponent({
  stations = [],
  initialLocation,
  height = '400px',
  disablePopup = false,
  zoom = DEFAULT_ZOOM,
  controls = ['zoomControl', 'geolocationControl'],
}: TgMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const router = useRouter();

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
  };

  const handleCloseCard = () => {
    setSelectedStation(null);
  };

  const handleNavigateClick = () => {
    if (selectedStation) {
      openMaps(selectedStation.longitude, selectedStation.latitude);
    }
  };

  const handleDetailsClick = () => {
    if (selectedStation) {
      router.push(`/telegram/stations/${selectedStation.id}`);
    }
  };

  const initMap = () => {
    if (!mapRef.current || !window.ymaps || mapInstance) return;

    try {
      const center = initialLocation
        ? [initialLocation.latitude, initialLocation.longitude]
        : DEFAULT_CENTER;

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current!, {
          center,
          zoom,
          controls,
        });

        // Filter out invalid stations and add markers
        const validStations = stations.filter(isValidStation);

        if (validStations.length !== stations.length) {
          console.warn(`Filtered out ${stations.length - validStations.length} invalid stations`);
        }

        validStations.forEach((station) => {
          try {
            const placemark = new window.ymaps.Placemark(
              [station.latitude, station.longitude],
              {
                hintContent: station.name,
              },
              {
                preset: 'islands#blueDotIconWithCaption',
                iconCaption: station.name,
              }
            );

            placemark.events.add('click', () => {
              if (!disablePopup) {
                handleStationClick(station);
              }
            });
            map.geoObjects.add(placemark);
          } catch (err) {
            console.error(`Error adding marker for station ${station.id}:`, err);
          }
        });

        setMapInstance(map);
      });
    } catch (error) {
      console.error('Map initialization error:', error);
      setError('Failed to initialize map');
    }
  };

  useEffect(() => {
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YMAPS_API_KEY}&lang=ru_RU`;
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      script.onerror = () => {
        setError('Failed to load map service');
      };
      document.body.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
        setMapInstance(null);
      }
    };
  }, [initMap, mapInstance]);

  useEffect(() => {
    if (window.ymaps && !mapInstance) {
      initMap();
    }
  }, [initialLocation, stations, mapInstance, initMap]);

  if (!process.env.NEXT_PUBLIC_YMAPS_API_KEY) return null;
  if (error) return <div className={cn("text-red-500 p-4")}>{error}</div>;

  return (
    <div className={cn("relative w-full h-full")}>
      {selectedStation && !disablePopup && (
        <Card className={cn("absolute z-10 inset-x-4 bottom-24 shadow-2xl border")}>
          <CardHeader className={cn("pb-2", "relative")}>
            <button
              onClick={handleCloseCard}
              className={cn(
                "absolute",
                "right-4",
                "top-4",
                "p-1",
                "hover:bg-accent",
                "rounded-full",
                "transition-colors"
              )}
              aria-label="Close"
            >
              <X className={cn("h-4", "w-4", "text-muted-foreground")} />
            </button>
            <CardTitle>{selectedStation.name}</CardTitle>
            <CardDescription className={cn("text-sm", "text-muted-foreground")}>
              {selectedStation.address}
            </CardDescription>
          </CardHeader>
          <CardFooter className={cn("flex", "justify-between", "items-center", "pt-2")}>
            <p className={cn(
              "font-medium",
              selectedStation.price ? "text-green-600" : "text-muted-foreground"
            )}>
              {formatPricePerM3(selectedStation.price)}
            </p>
            <div className="flex gap-2">
            
              <Button
                size="sm"
                onClick={handleDetailsClick}
              >
                Batafsil
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      <div
        ref={mapRef}
        className={cn("absolute", "inset-0", "rounded-md", "overflow-hidden")}
        style={{ minHeight: height }}
      />
    </div>
  );
}
