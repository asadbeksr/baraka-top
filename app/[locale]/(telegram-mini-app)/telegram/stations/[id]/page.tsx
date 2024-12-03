import { getStationById } from "@/lib/stations";
import TgStationSingle from "@/components/telegram/tg-station-single";

export default async function TgStationSinglePage({ params }) {
  const station = await getStationById(params.id);

  if (!station) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Station not found</p>
      </div>
    );
  }

  return <TgStationSingle station={station} />;
}
