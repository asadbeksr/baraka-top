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
import { StationFormType } from "@/types";

interface StationFormProps {
  station?: (Station & {
    amenities?: {
      id: string;
      enabled: boolean;
      camera_ip?: string;
    }[];
  }) | null;
  amenities?: Amenity[];
  messages: StationFormType;
}

export default function StationForm({ station, amenities = AMENITIES, messages }: StationFormProps) {
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

      const formData = {
        ...data,
        methane_density: data.methane_density ? parseFloat(String(data.methane_density)) : null,
        columns_count: data.columns_count ? parseInt(String(data.columns_count)) : null,
        gas_temperature: data.gas_temperature ? parseFloat(String(data.gas_temperature)) : null,
        pressure: data.pressure ? parseFloat(String(data.pressure)) : null,
        price: data.price ? parseFloat(String(data.price)) : null,
        latitude: data.latitude ? parseFloat(String(data.latitude)) : null,
        longitude: data.longitude ? parseFloat(String(data.longitude)) : null,
        amenities: selectedAmenities
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save station");
      }

      toast.success(
        isEditMode
          ? messages.stationUpdated
          : messages.stationCreated
      );
      
      if(!isEditMode) {
        router.push('/dashboard/stations');
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to save station:", error);
      toast.error(messages.failedToSaveStation, {
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
        toast.success(messages.stationDeleted);
        router.push('/dashboard/stations')
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      console.error("Failed to delete station:", error);
      toast.error(messages.failedToDeleteStation, {
        description: error.message,
      });
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            {isEditMode ? messages.editStation : messages.createStation}
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
                  {messages.deleteStation}
                </Button>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{messages.deleteConfirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {messages.deleteConfirmDescription}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{messages.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>{messages.deleteStation}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          <Button type="submit" form="station-form">
            {isEditMode ? messages.save : messages.create}
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
                    <FormLabel>{messages.stationName}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={messages.stationName} />
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
                    <FormLabel>{messages.legalName}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={messages.legalName}
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
                    <FormLabel>{messages.address}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={messages.address} />
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
                    <FormLabel>{messages.phoneNumber}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={messages.phoneNumber}
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
                    <FormLabel>{messages.website}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={messages.website}
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
                    <FormLabel>{messages.region}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={messages.region}
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
                    <FormLabel>{messages.latitude}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="any"
                        placeholder={messages.latitude}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        value={field.value ?? ""}
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
                    <FormLabel>{messages.longitude}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="any"
                        placeholder={messages.longitude}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        value={field.value ?? ""}
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
                    <FormLabel>{messages.price}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="any"
                        placeholder={messages.price}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        value={field.value ?? ""}
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
                    <FormLabel>{messages.pressure}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="any"
                        placeholder={messages.pressure}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        value={field.value ?? ""}
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
                    <FormLabel>{messages.columns_count}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="1"
                        placeholder={messages.columns_count}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                        value={field.value ?? ""}
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
                    <FormLabel>{messages.gas_temperature}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="any"
                        placeholder={messages.gas_temperature}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        value={field.value ?? ""}
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
                    <FormLabel>{messages.methane_density}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="any"
                        placeholder={messages.methane_density}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        value={field.value ?? ""}
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
                    <FormLabel>{messages.live_camera_ip}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={messages.live_camera_ip}
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
                    <FormLabel>{messages.landmark}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={messages.landmark}
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
              messages={messages}
              selectedAmenities={selectedAmenities}
              onAmenityChange={handleAmenityChange}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
