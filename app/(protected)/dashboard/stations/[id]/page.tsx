import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { notFound } from "next/navigation";

import { getStationById, getAllAmenities } from "@/lib/stations";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import StationForm from "@/components/forms/station-form";

// Server component for the page
export default async function StationsSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const isNewStation = params.id === "new";
  const amenities = await getAllAmenities();
  
  if (isNewStation) {
    return (
      <>
        <DashboardHeader
          heading="Create New Station"
          text="Add a new gas station to the system"
        >
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/stations"
              className="flex items-center gap-2"
              passHref
            >
              <Button className="ml-auto shrink-0 gap-1 px-4">
                <ArrowLeftIcon className="hidden size-4 sm:block" />
                <span>Back</span>
              </Button>
            </Link>
          </div>
        </DashboardHeader>
        <div className="grid gap-10">
          <StationForm station={null} amenities={amenities} />
        </div>
      </>
    );
  }

  const station = await getStationById(params.id);

  console.log('station', station)
  if (!station) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        heading={station.name || "Unnamed Station"}
        text={station.address || "No address provided"}
      >
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/stations"
            className="flex items-center gap-2"
            passHref
          >
            <Button className="ml-auto shrink-0 gap-1 px-4">
              <ArrowLeftIcon className="hidden size-4 sm:block" />
              <span>Back</span>
            </Button>
          </Link>
        </div>
      </DashboardHeader>
      <div className="grid gap-10">
        <StationForm station={station} amenities={amenities} />
      </div>
    </>
  );
}
