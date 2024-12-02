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
import { AMENITIES, type Amenity } from "@/config/amenities";
import { Station } from "@prisma/client";

interface StationFormProps {
  station?: (Station & {
    amenities?: {
      id: string;
      enabled: boolean;
      camera_ip?: string;
    }[];
  }) | null;
  amenities?: Amenity[];
}

export default function StationForm({ station, amenities = AMENITIES }: StationFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(station);
  const [selectedAmenities, setSelectedAmenities] = useState(
    station?.amenities?.map(amenity => ({
      amenityId: amenity.id,
      enabled: amenity.enabled
    })) || []
  );

  const form = useForm<StationFormData>({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      name: station?.name || "",
      address: station?.address || "",
      legal_name: station?.legal_name || "",
      region: station?.region || "",
      website: station?.website || "",
      phone_number: station?.phone_number || "",
      live_camera_ip: station?.live_camera_ip || "",
      landmark: station?.landmark || "",
      methane_density: station?.methane_density || null,
      columns_count: station?.columns_count || null,
      gas_temperature: station?.gas_temperature || null,
      pressure: station?.pressure || null,
      price: station?.price || null,
      latitude: station?.latitude || null,
      longitude: station?.longitude || null,
    },
  });

  const handleAmenityChange = (amenity: { amenityId: string; enabled: boolean }) => {
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
      const url = isEditMode && station ? `/api/stations/${station.id}` : '/api/stations';
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
                name="legal_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Legal name"
                        {...field}
                        value={form.getValues("legal_name") || ""}
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
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Phone number"
                        {...field}
                        value={form.getValues("phone_number") || ""}
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
                name="columns_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Columns Count</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Columns count"
                        {...field}
                        value={form.getValues("columns_count") ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gas_temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gas Temperature</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Gas temperature"
                        {...field}
                        value={form.getValues("gas_temperature") ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="methane_density"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Methane Density</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Methane density"
                        {...field}
                        value={form.getValues("methane_density") ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="live_camera_ip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Camera IP</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Camera IP"
                        {...field}
                        value={form.getValues("live_camera_ip") || ""}
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
