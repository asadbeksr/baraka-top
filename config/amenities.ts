export interface Amenity {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date | null;
}

export const AMENITIES: Amenity[] = [
  {
    id: "wifi",
    name: "Wi-Fi",
    slug: "wifi",
  },
  {
    id: "restroom",
    name: "Restroom",
    slug: "restroom",
  },
  {
    id: "coffee-shop",
    name: "Coffee Shop",
    slug: "coffee-shop",
  },
  {
    id: "car-wash",
    name: "Car Wash",
    slug: "car-wash",
  },
  {
    id: "mini-market",
    name: "Mini Market",
    slug: "mini-market",
  },
  {
    id: "atm",
    name: "ATM",
    slug: "atm",
  },
  {
    id: "24-7",
    name: "24/7",
    slug: "24-7",
  },
  {
    id: "tire-service",
    name: "Tire Service",
    slug: "tire-service",
  },
  {
    id: "auto-service",
    name: "Auto Service",
    slug: "auto-service",
  },
  {
    id: "payment-terminal",
    name: "Payment Terminal",
    slug: "payment-terminal",
  }
];
