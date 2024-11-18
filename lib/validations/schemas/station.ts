import { z } from "zod";

// Base schema for amenity
export const amenitySchema = z.object({
  amenityId: z.string(),
  enabled: z.boolean().default(false)
});

// Base schema for station data
export const stationBaseSchema = z.object({
  name: z.string().min(1, "Station name is required"),
  address: z.string().min(1, "Address is required"),
  legalName: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  website: z.union([
    z.string().url(),
    z.string().max(0),
    z.null()
  ]).optional(),
  phoneNumber: z.string().nullable().optional(),
  cameraIP: z.string().nullable().optional(),
  landmark: z.string().nullable().optional(),
  methaneDensity: z.number().nullable().optional(),
  columnsCount: z.number().nullable().optional(),
  gasTemperature: z.number().nullable().optional(),
  pressure: z.number().nullable().optional(),
  price: z.number().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

// Schema for station creation/update with amenities
export const stationSchema = stationBaseSchema.extend({
  amenities: z.array(amenitySchema).optional()
});

// Schema for station table data
export const stationTableSchema = stationBaseSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  amenities: z.array(amenitySchema).optional()
});

// Schema for station update operation
export const stationUpdateSchema = stationSchema;

// Schema for station creation operation
export const stationCreateSchema = stationSchema;

export type Station = z.infer<typeof stationTableSchema>;
export type StationFormData = z.infer<typeof stationSchema>;
export type StationUpdateData = z.infer<typeof stationUpdateSchema>;
export type StationCreateData = z.infer<typeof stationCreateSchema>;
