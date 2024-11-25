'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { type Station } from "@/types";
import { useRouter } from "next/navigation";
import { getTelegramWebApp } from "@/lib/telegram";

const TgMapComponent = dynamic(
  () => import('@/components/telegram/tg-map'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    ),
  }
);

const TASHKENT_LOCATION = {
  latitude: 41.311081,
  longitude: 69.240562,
};

export default function TgMap() {
  const router = useRouter()

  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('/api/stations', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }

        const data = await response.json();
        setStations(data.stations);
      } catch (err) {
        console.error('Error loading stations:', err);
        setError('Failed to load stations');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);


  // Set up back button
  useEffect(() => {
    const tg = getTelegramWebApp();
    console.log('tg', tg.BackButton);
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-1 relative">
        <TgMapComponent 
          stations={stations}
          initialLocation={TASHKENT_LOCATION}
        />
      </div>
    </div>
  );
}
