import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getAllAmenities, getStationById } from "@/lib/stations";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import StationForm from "@/components/forms/station-form";

// Server component for the page
export default async function StationsSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const t = await getTranslations("StationSingle");

  const messages = {
    editStation: t("editStation"),
    createStation: t("createStation"),
    deleteStation: t("deleteStation"),
    deleteConfirmTitle: t("deleteConfirmTitle"),
    deleteConfirmDescription: t("deleteConfirmDescription"),
    cancel: t("cancel"),
    save: t("save"),
    create: t("create"),
    stationUpdated: t("stationUpdated"),
    stationCreated: t("stationCreated"),
    stationDeleted: t("stationDeleted"),
    failedToSaveStation: t("failedToSaveStation"),
    failedToDeleteStation: t("failedToDeleteStation"),
    stationName: t("stationName"),
    legalName: t("legalName"),
    address: t("address"),
    phoneNumber: t("phoneNumber"),
    website: t("website"),
    region: t("region"),
    latitude: t("latitude"),
    longitude: t("longitude"),
    price: t("price"),
    methane_density: t("methane_density"),
    columns_count: t("columns_count"),
    gas_temperature: t("gas_temperature"),
    pressure: t("pressure"),
    live_camera_ip: t("live_camera_ip"),
    landmark: t("landmark"),
    amenities: t("amenities"),
  };

  const isNewStation = params.id === "new";
  const amenities = (await getAllAmenities()).map((amenity) => ({
    ...amenity,
    icon: amenity.icon || undefined,
    description: amenity.description || undefined,
    created_at: amenity.created_at || undefined,
    updated_at: amenity.updated_at || undefined,
  }));

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
          <StationForm
            station={null}
            amenities={amenities}
            messages={messages}
          />
        </div>
      </>
    );
  }

  const station = await getStationById(params.id);

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
        <StationForm
          station={station}
          amenities={amenities}
          messages={messages}
        />
      </div>
    </>
  );
}
