"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const stationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Station name is required"),
  address: z.string().min(1, "Address is required"),
  legalName: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  cameraIP: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  methaneDensity: z.number().optional().nullable(),
  columnsCount: z.number().optional().nullable(),
  gasTemperature: z.number().optional().nullable(),
  pressure: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

export default function StationForm({ station }) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isEditMode = Boolean(station);
  const form = useForm({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      ...station,
    },
  });

  const onSubmit = async (data) => {
    console.log(data, 'O N S U B M I T')
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
      toast.error("Failed to delete station", {
        description: error.message,
      });
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            {isEditMode ? "Edit Station" : "Create Station"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isEditMode && (
            <>
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete
                </Button>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the station
                      and remove all of its data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          <Button onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
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
                    <Input 
                      {...field} 
                      type="number" 
                      step="any"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Enter Latitude" 
                    />
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
                    <Input 
                      {...field} 
                      type="number" 
                      step="any"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Enter Longitude" 
                    />
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
                    <Input 
                      {...field} 
                      type="number"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Enter Price" 
                    />
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
                    <Input 
                      {...field} 
                      type="number"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Enter Pressure" 
                    />
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
                    <Input 
                      {...field} 
                      type="number"
                      onChange={e => field.onChange(e.target.value ? parseInt(e.target.value, 10) : null)}
                      placeholder="Enter Columns Count" 
                    />
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
                    <Input 
                      {...field} 
                      type="number"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Enter Gas Temperature" 
                    />
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
                    <Input 
                      {...field} 
                      type="number"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Enter Methane Density" 
                    />
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
