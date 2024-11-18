'use client';

import dynamic from "next/dynamic";
import { type Station } from "@/types/station";

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

const EXAMPLE_STATIONS: Station[] = [
  {
    id: '1',
    name: 'Station 1',
    location: {
      latitude: 41.311081,
      longitude: 69.240562,
    },
    address: 'Example Address 1',
    description: 'Example Description 1',
    amenities: ['WiFi', 'Parking'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Station 2',
    location: {
      latitude: 41.321081,
      longitude: 69.250562,
    },
    address: 'Example Address 2',
    description: 'Example Description 2',
    amenities: ['WiFi', 'Charging'],
    status: 'active',
  },
];

export default function TgMap() {
  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-1 relative">
        <TgMapComponent 
          stations={EXAMPLE_STATIONS}
          initialLocation={TASHKENT_LOCATION}
        />
      </div>
    </div>
  );
}
