import React from "react";
import { getAllStations } from "@/lib/stations";
import { shareOnTelegram } from "@/lib/telegram";
import { StationCard } from "../cards/station-card";

export default async function TgStations() {
  const stations = await getAllStations();

  return (
    <div className="mb-20 flex-1 space-y-4 overflow-auto p-4">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onShare={shareOnTelegram}
          onSave={() => {}}
        />
      ))}
    </div>
  );
}
