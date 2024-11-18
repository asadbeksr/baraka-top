"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Amenity {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

interface StationAmenity {
  amenityId: string;
  enabled: boolean;
}

interface StationAmenitiesProps {
  amenities: Amenity[];
  selectedAmenities: StationAmenity[];
  onAmenityChange: (amenity: StationAmenity) => void;
}

export function StationAmenities({
  amenities,
  selectedAmenities,
  onAmenityChange,
}: StationAmenitiesProps) {
  const getAmenityState = (amenityId: string) => {
    const amenity = selectedAmenities.find((a) => a.amenityId === amenityId);
    return amenity?.enabled || false;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center space-x-2 rounded-lg border p-4"
            >
              <Switch
                id={`amenity-${amenity.id}`}
                checked={getAmenityState(amenity.id)}
                onCheckedChange={(checked) =>
                  onAmenityChange({ amenityId: amenity.id, enabled: checked })
                }
              />
              <Label htmlFor={`amenity-${amenity.id}`}>{amenity.name}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
