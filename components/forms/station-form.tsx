"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { stationSchema, type StationFormData } from "@/lib/validations/schemas";
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
import { StationAmenities } from "./station-amenities";
import { AMENITIES } from "@/config/amenities";

export default function StationForm({ station, amenities }) {
  const router = useRouter();
  const isEditMode = Boolean(station);
  const [selectedAmenities, setSelectedAmenities] = useState(
    station?.amenities?.map(amenity => ({
      amenityId: amenity.amenity.id,
      enabled: amenity.enabled
    })) || []
  );

  const form = useForm<StationFormData>({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      name: station?.name || "",
      address: station?.address || "",
      legalName: station?.legalName || "",
      region: station?.region || "",
      website: station?.website || "",
      phoneNumber: station?.phoneNumber || "",
      cameraIP: station?.cameraIP || "",
      landmark: station?.landmark || "",
      methaneDensity: station?.methaneDensity || null,
      columnsCount: station?.columnsCount || null,
      gasTemperature: station?.gasTemperature || null,
      pressure: station?.pressure || null,
      price: station?.price || null,
      latitude: station?.latitude || null,
      longitude: station?.longitude || null,
    },
  });

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev => {
      const existing = prev.find(a => a.amenityId === amenity.amenityId);
      if (existing) {
        return prev.map(a => 
          a.amenityId === amenity.amenityId 
            ? { ...a, enabled: amenity.enabled }
            : a
        );
      }
      return [...prev, amenity];
    });
  };

  const onSubmit = async (data: StationFormData) => {
    try {
      const url = isEditMode ? `/api/stations/${station.id}` : '/api/stations';
      const method = isEditMode ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          amenities: selectedAmenities
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save station");
      }

      toast.success(
        isEditMode
          ? "Station details have been updated."
          : "New station has been created."
      );
      
      if(!isEditMode) {
        router.push('/dashboard/stations');
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to save station:", error);
      toast.error("Failed to save station", {
        description: error.message,
      });
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
              <AlertDialog open={false} onOpenChange={() => {}}>
                <Button 
                  variant="destructive" 
                  onClick={() => {}}
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
          <Button type="submit" form="station-form">
            {isEditMode ? "Save" : "Create"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            id="station-form"
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Input 
                        placeholder="Legal name"
                        {...field}
                        value={form.getValues("legalName") || ""}
                      />
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
                      <Input 
                        placeholder="Phone number"
                        {...field}
                        value={form.getValues("phoneNumber") || ""}
                      />
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
                      <Input 
                        placeholder="Website"
                        {...field}
                        value={form.getValues("website") || ""}
                      />
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
                      <Input 
                        placeholder="Region"
                        {...field}
                        value={form.getValues("region") || ""}
                      />
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
                        type="number"
                        placeholder="Latitude"
                        {...field}
                        value={form.getValues("latitude") ?? ""}
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
                        type="number"
                        placeholder="Longitude"
                        {...field}
                        value={form.getValues("longitude") ?? ""}
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
                        type="number"
                        placeholder="Price"
                        {...field}
                        value={form.getValues("price") ?? ""}
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
                        type="number"
                        placeholder="Pressure"
                        {...field}
                        value={form.getValues("pressure") ?? ""}
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
                        type="number"
                        placeholder="Columns count"
                        {...field}
                        value={form.getValues("columnsCount") ?? ""}
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
                        type="number"
                        placeholder="Gas temperature"
                        {...field}
                        value={form.getValues("gasTemperature") ?? ""}
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
                        type="number"
                        placeholder="Methane density"
                        {...field}
                        value={form.getValues("methaneDensity") ?? ""}
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
                      <Input 
                        placeholder="Camera IP"
                        {...field}
                        value={form.getValues("cameraIP") || ""}
                      />
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
                      <Input 
                        placeholder="Landmark"
                        {...field}
                        value={form.getValues("landmark") || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <StationAmenities
              amenities={amenities}
              selectedAmenities={selectedAmenities}
              onAmenityChange={handleAmenityChange}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
