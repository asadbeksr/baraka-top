export interface Station {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  description?: string;
  amenities?: string[];
  status?: 'active' | 'inactive' | 'maintenance';
}
