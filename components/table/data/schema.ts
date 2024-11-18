import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const stationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Station name is required"),
  address: z.string().min(1, "Address is required"),
  legalName: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  website: z.string().url().optional().nullable().or(z.literal("")),
  phoneNumber: z.string().optional().nullable(),
  cameraIP: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  methaneDensity: z.coerce.number().optional().nullable(),
  columnsCount: z.coerce.number().optional().nullable(),
  gasTemperature: z.coerce.number().optional().nullable(),
  pressure: z.coerce.number().optional().nullable(),
  price: z.coerce.number().optional().nullable(),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
});

export type Station = z.infer<typeof stationSchema>;

// Schema for new station creation (without id)
export const createStationSchema = stationSchema.omit({ id: true });
export type CreateStation = z.infer<typeof createStationSchema>;
