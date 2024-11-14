"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const stationSchema = z.object({
  name: z.string().min(1, "Station name is required"),
  legalName: z.string().optional().nullable(),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().optional(),
  website: z.string().url().optional(),
  region: z.string().optional(),
  cameraIP: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  methaneDensity: z.string().optional().nullable().transform((val) => val ? parseFloat(val) : null),
  columnsCount: z.string().optional().nullable().transform((val) => val ? parseFloat(val) : null),
  price: z.string().optional().nullable().transform((val) => val ? parseFloat(val) : null),
  pressure: z.string().optional().nullable().transform((val) => val ? parseFloat(val) : null),
  gasTemperature: z.string().optional().nullable().transform((val) => val ? parseFloat(val) : null),
  latitude: z.string().optional().nullable().transform((val) => val ? parseFloat(val) : null),
  longitude: z.string().optional().nullable().transform((val) => val ? parseFloat(val) : null),
});


export default function StationForm({ station }) {
  const router = useRouter();

  const isEditMode = Boolean(station);
  const form = useForm({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      ...station,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/station", {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isEditMode ? { id: station.id, ...data } : data),
      });

      if (!response.ok) {
        toast.error("Something went wrong.", {
          description: isEditMode
            ? "The station was not updated. Please try again."
            : "The station could not be created. Please try again.",
        });
      } else {
        toast.success(
          isEditMode
            ? "Station details have been updated."
            : "New station has been created."
        );
        if(!isEditMode) router.push('/dashboard/stations')
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  async function onDelete() {
    if (!station?.id) return;

    try {
      const response = await fetch(`/api/station`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: station.id }),
      });

      if (response.ok) {
        toast.success("Station deleted successfully");
        router.push('/dashboard/stations')
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      console.error("Failed to delete station:", error);
      toast.error("Something went wrong.", {
        description: "The station was not deleted. Please try again.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isEditMode ? "Edit Station" : "Create New Station"}
          </h2>

          <div className="flex gap-2">
            {isEditMode && (
              <Button variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            )}
            <Button onClick={form.handleSubmit(onSubmit)}>
              {isEditMode ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Station Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="legalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Legal Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Phone Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Website URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Region" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Latitude" type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Longitude"  type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Price"  type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pressure</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Pressure"  type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="columnsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Columns Count</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Columns Count"  type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gasTemperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gas Temperature</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Gas Temperature"  type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="methaneDensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Methane Density</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Methane Density"  type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cameraIP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camera IP</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Camera IP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Landmark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
