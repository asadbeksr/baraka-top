export interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  phoneNumber?: string;
  website?: string | null;
  price?: number | null;
  gasTemperature?: number | null;
  pressure?: number | null;
  cameraIP?: string | null;
  columnsCount?: number | null;
  createdAt?: string;
  landmark?: string | null;
  legalName?: string | null;
  methaneDensity?: number | null;
  region?: string;
  slug?: string;
  updatedAt?: string | null;
}
