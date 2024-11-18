"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { type Station } from "@/types/station";

interface TgMapProps {
  stations?: Station[];
  initialLocation?: { latitude: number; longitude: number };
}

const DEFAULT_CENTER: [number, number] = [41.311081, 69.240562];
const DEFAULT_ZOOM = 12;

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function TgMapComponent({ stations = [], initialLocation }: TgMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const scriptId = 'yandex-maps-script';

  const initMap = () => {
    if (!mapRef.current || !window.ymaps || mapInstance) return;

    try {
      const center = initialLocation 
        ? [initialLocation.latitude, initialLocation.longitude]
        : DEFAULT_CENTER;

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current!, {
          center,
          zoom: DEFAULT_ZOOM,
          controls: ['zoomControl', 'geolocationControl']
        });

        stations.forEach((station) => {
          const placemark = new window.ymaps.Placemark(
            [station.location.latitude, station.location.longitude],
            {
              balloonContentHeader: station.name,
              balloonContentBody: `
                <div style="padding: 16px;">
                  ${station.address ? `<p style="color: #666;">${station.address}</p>` : ''}
                  ${station.description ? `<p>${station.description}</p>` : ''}
                  ${station.amenities?.length ? `
                    <div class="mt-2">
                      <p style="font-weight: 600;">Amenities:</p>
                      <ul style="list-style-type: disc; padding-left: 20px;">
                        ${station.amenities.map(a => `<li>${a}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}
                </div>
              `,
              hintContent: station.name
            },
            {
              preset: 'islands#blueDotIconWithCaption',
              iconCaption: station.name
            }
          );
          map.geoObjects.add(placemark);
        });

        setMapInstance(map);
      });
    } catch (error) {
      setError('Failed to initialize map');
    }
  };

  // Handle script load and cleanup
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      const apiKey = process.env.NEXT_PUBLIC_YMAPS_API_KEY;
      script.id = scriptId;
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      // If script exists, just initialize the map
      initMap();
    }

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
        setMapInstance(null);
      }
    };
  }, []);

  // Reinitialize map when props change
  useEffect(() => {
    if (window.ymaps && !mapInstance) {
      initMap();
    }
  }, [initialLocation, stations]);

  if (!process.env.NEXT_PUBLIC_YMAPS_API_KEY) return null;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapRef} 
        className="absolute inset-0"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
