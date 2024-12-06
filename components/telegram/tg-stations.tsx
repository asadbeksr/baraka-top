'use client';

import { useEffect, useState } from "react";
import { StationCard } from "../cards/station-card";
import { shareOnTelegram } from "@/lib/telegram";
import type { Location } from "@/lib/telegram";

interface Station {
  id: string;
  name: string | null;
  address?: string | null;
  price?: number | null;
  pressure?: number | null;
  rating?: number | null;
  landmark?: string | null;
  legalName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  distance?: number;
}

interface TgStationsProps {
  userLocation: Location | null;
  filterByLocation: boolean;
}

export default function TgStations({ userLocation, filterByLocation }: TgStationsProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = '/api/stations';
        if (filterByLocation && userLocation) {
          // Pass coordinates as-is, they will be parsed on the server
          const params = new URLSearchParams({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          });
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          throw new Error('Failed to fetch stations');
        }

        const data = await response.json();
        setStations(data.stations || []);
      } catch (err) {
        console.error('Error fetching stations:', err);
        setError('Failed to load stations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, [userLocation, filterByLocation]);

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-3 overflow-auto p-4">
        {[1, 2,].map((index) => (
          <div key={index} className="rounded-lg border overflow-hidden animate-pulse h-[20.9rem] bg-muted" />
        ))}
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Yaqin atrofda zapravkalar mavjud emas!
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-auto p-4">
      {stations.slice(0,1).map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onShare={shareOnTelegram}
          onSave={() => {}}
          distance={station.distance}
          showAmenities={false}
        />
      ))}
    </div>
  );
}
