import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { getAllStations } from "@/lib/stations";
import { constructMetadata } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export const metadata = constructMetadata({
  title: "Stations",
  description: "Create and manage content.",
});

export default async function StationsPage() {
  const user = await getCurrentUser();

  const data = await getAllStations();


  console.log(data)
  return (
    <>
      <DashboardHeader
        heading="Zapravkalar"
        text={`Gaz quyish shahobchalar ro‘yxati`}
      />

      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <Input
              type="search"
              placeholder="Search ..."
              className="h-8 w-full sm:w-64 sm:pr-12"
            />
          </div>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No Stations Found</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                No stations are available yet. Add some stations to get started.
              </EmptyPlaceholder.Description>
              <Button>Add Station</Button>
            </EmptyPlaceholder>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location Description</TableHead>
                  <TableHead>Legal Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((station) => (
                  <TableRow key={station.id}>
                    <TableCell>{station.title}</TableCell>
                    <TableCell>{station.locationDescription}</TableCell>
                    <TableCell>{station.legalName}</TableCell>
                    <TableCell>{station.price}</TableCell>
                    <TableCell>{new Date(station.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {station.updatedAt
                        ? new Date(station.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/stations/${station.id}`} passHref>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
