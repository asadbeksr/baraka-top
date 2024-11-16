import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
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

export type Task = z.infer<typeof taskSchema>;
