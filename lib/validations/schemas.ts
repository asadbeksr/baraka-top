import * as z from "zod";

const amenitySchema = z.object({
  amenityId: z.string(),
  enabled: z.boolean(),
});

export const stationSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(100),
  legal_name: z.string().optional(),
  region: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  phone_number: z.string().optional(),
  live_camera_ip: z.string().optional(),
  landmark: z.string().optional(),
  methane_density: z.number().nullable(),
  columns_count: z.number().nullable(),
  gas_temperature: z.number().nullable(),
  pressure: z.number().nullable(),
  price: z.number().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  amenities: z.array(amenitySchema).optional(),
});

export type StationFormData = z.infer<typeof stationSchema>;
