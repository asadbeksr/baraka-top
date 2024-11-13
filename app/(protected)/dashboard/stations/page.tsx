import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getAllStations } from "@/lib/stations";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
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
  const data = await getAllStations();

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
                  <TableHead>Name</TableHead>
                  <TableHead>Adress</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((station) => (
                  <TableRow key={station.id}>
                    <TableCell>{station.name}</TableCell>
                    <TableCell>{station.address}</TableCell>
                    <TableCell>{station.price}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/stations/${station.id}`} passHref>
                        <Button variant="outline" size="sm">
                           Edit
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
