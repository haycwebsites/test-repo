import {
  siteConfig,
  navigationConfig,
  preloaderConfig,
  scrollToTopConfig,
  heroConfig,
  availabilityConfig,
  bedroomConfig,
  livingRoomConfig,
  kitchenConfig,
  bathroomConfig,
  amenitiesPageConfig,
  locationPageConfig,
  bookingPageConfig,
  contactPageConfig,
  digitalProductsConfig,
  type DigitalProductsConfig,
} from '../config';

export interface RemoteConfig {
  version: number;
  exportedAt: string;
  siteConfig: typeof siteConfig;
  navigationConfig: typeof navigationConfig;
  preloaderConfig: typeof preloaderConfig;
  scrollToTopConfig: typeof scrollToTopConfig;
  heroConfig: typeof heroConfig;
  availabilityConfig: typeof availabilityConfig;
  bedroomConfig: typeof bedroomConfig;
  livingRoomConfig: typeof livingRoomConfig;
  kitchenConfig: typeof kitchenConfig;
  bathroomConfig: typeof bathroomConfig;
  amenitiesPageConfig: typeof amenitiesPageConfig;
  locationPageConfig: typeof locationPageConfig;
  bookingPageConfig: typeof bookingPageConfig;
  contactPageConfig: typeof contactPageConfig;
  digitalProductsConfig?: DigitalProductsConfig;
}

export const defaultConfig: RemoteConfig = {
  version: 1,
  exportedAt: '',
  siteConfig,
  navigationConfig,
  preloaderConfig,
  scrollToTopConfig,
  heroConfig,
  availabilityConfig,
  bedroomConfig,
  livingRoomConfig,
  kitchenConfig,
  bathroomConfig,
  amenitiesPageConfig,
  locationPageConfig,
  bookingPageConfig,
  contactPageConfig,
  digitalProductsConfig,
};

export async function fetchRemoteConfig(): Promise<RemoteConfig> {
  if (import.meta.env.DEV) {
    return defaultConfig;
  }
  try {
    const res = await fetch('/hayc/config.json');
    if (!res.ok) throw new Error('Failed to fetch config: ' + res.status);
    const data = await res.json();
    return data as RemoteConfig;
  } catch (err) {
    console.warn('[HAYC] Remote config fetch failed, using default config.', err);
    return defaultConfig;
  }
}
