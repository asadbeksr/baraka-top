import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLoading() {
  return (
    <>
      <DashboardHeader heading="Zapravkalar" text="Gaz quyish shahobchalar ro‘yxati" />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
