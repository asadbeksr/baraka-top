import Link from "next/link";
import { ArrowUpRight, PlusIcon } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { getAllStations } from "@/lib/stations";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { columns } from "@/components/table/components/columns";
import { DataTable } from "@/components/table/components/data-table";
import TaskPage from "@/components/table/page";

export const metadata = constructMetadata({
  title: "Stations",
  description: "Create and manage content.",
});

export default async function StationsPage() {
  const data = await getAllStations();

  return (
    <>
      <DashboardHeader
        heading="Zapravkalar"
        text={`Gaz quyish shahobchalar ro‘yxati`}
      />

      {/* @ts-ignore */}
      <DataTable data={data} columns={columns} />
    </>
  );
}
