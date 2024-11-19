import { shareOnTelegram } from "@/lib/telegram";
import { CardHeader } from "@/components/ui/card";
import { StationCard } from "@/components/cards/station-card";
import { nearbyStations } from "@/lib/mock";

export default function TgHome() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <CardHeader className="border-b pb-4">
        <h1 className="text-2xl font-bold">Saqlanganlar</h1>
      </CardHeader>

      <div className="flex-1 space-y-4 overflow-auto p-4">
        {nearbyStations.map((station) => (
           <StationCard
           key={station.id}
           station={station}
           variant="default"
           showAmenities={false}
         />
        ))}
      </div>
    </div>
  );
}
