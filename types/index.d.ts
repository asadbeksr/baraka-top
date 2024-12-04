import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
  target?: string;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
  target?: string;
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// subcriptions
export type SubscriptionPlan = {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeSubscriptionId" | "stripePriceId"> & {
  stripeCustomerId: string | null;
  stripeCurrentPeriodEnd: number;
  isPaid: boolean;
  interval: "month" | "year" | null;
  isCanceled?: boolean;
};

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & {
  [key in (typeof plansColumns)[number]]: ColumnType;
};

// landing sections
export type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
};

export type FeatureLdg = {
  title: string;
  description: string;
  link: string;
  icon: keyof typeof Icons;
};

export type TestimonialType = {
  name: string;
  job: string;
  image: string;
  review: string;
};

export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
}

export interface Photo {
  id: string;
  url: string;
}

export interface Station {
  id: string;
  landmark?: string | null;
  legalName?: string | null;
  price?: number | null;
  pressure?: number | null;
  columnsCount?: number | null;
  gasTemperature?: number | null;
  methaneDensity?: number | null;
  cameraIP?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  
  // Location and contact info
  name: string;
  slug?: string | null;
  phoneNumber?: string | null;
  region?: string | null;
  website?: string | null;
  address?: string | undefined;
  latitude: number;
  longitude: number;

  // Relations
  amenities?: { amenity: Amenity }[];
  photos?: Photo[];
}


export interface StationFormType {
  editStation: string;
  createStation: string;
  deleteStation: string;
  deleteConfirmTitle: string;
  deleteConfirmDescription: string;
  cancel: string;
  save: string;
  create: string;
  stationUpdated: string;
  stationCreated: string;
  stationDeleted: string;
  failedToSaveStation: string;
  failedToDeleteStation: string;
  stationName: string;
  legalName: string;
  address: string;
  phoneNumber: string;
  website: string;
  region: string;
  latitude: string;
  longitude: string;
  price: string;
  methane_density: string;
  columns_count: string;
  gas_temperature: string;
  pressure: string;
  live_camera_ip: string;
  landmark: string;
  amenities: string;
}