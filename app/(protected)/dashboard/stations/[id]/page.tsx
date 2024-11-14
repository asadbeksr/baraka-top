import Link from "next/link";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";

import { getStationById } from "@/lib/stations";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import StationForm from "@/components/forms/station-form";

export default async function StationsSinglePage({ params }) {
  const isNewStation = params.id === "new";
  const station = isNewStation ? null : await getStationById(params.id);

  // Handle the case where a non-existent ID is provided for edit mode
  if (!isNewStation && !station) {
    return (
      <>
        <DashboardHeader heading={"Not Found"}>
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
      </>
    );
  }

  return (
    <>
      <DashboardHeader
        heading={station?.name || "Create New Station"}
        text={station?.address || ""}
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

      <StationForm station={station} />
    </>
  );
}
