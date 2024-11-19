declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

export interface TelegramInfo {
  platform?: string;
  version?: string;
  colorScheme?: string;
  themeParams?: any;
  isExpanded?: boolean;
  viewportHeight?: number;
  viewportStableHeight?: number;
  headerColor?: string;
  backgroundColor?: string;
  isClosingConfirmationEnabled?: boolean;
  isVersionAtLeast?: (version: string) => boolean;
  initData?: string;
  initDataUnsafe?: any;
  MainButton?: {
    text?: string;
    color?: string;
    textColor?: string;
    isVisible?: boolean;
    isActive?: boolean;
    isProgressVisible?: boolean;
  };
  BackButton?: {
    isVisible?: boolean;
  };
  HapticFeedback?: {
    impactOccurred?: (style: string) => void;
    notificationOccurred?: (type: string) => void;
    selectionChanged?: () => void;
  };
  CloudStorage?: {
    isSupported?: boolean;
  };
}

export interface Location {
  latitude: string;
  longitude: string;
}

const NOT_IN_TELEGRAM_MESSAGE = "Please open it using Telegram.";

export const isTelegramWebApp = () => {
  if (typeof window === 'undefined') return false;
  return !!window.Telegram?.WebApp;
};

export const getTelegramWebApp = () => {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp || null;
};

export const getTelegramInfo = (): TelegramInfo => {
  const webApp = getTelegramWebApp();
  if (!webApp) return {};

  return {
    platform: webApp.platform,
    version: webApp.version,
    colorScheme: webApp.colorScheme,
    themeParams: webApp.themeParams,
    isExpanded: webApp.isExpanded,
    viewportHeight: webApp.viewportHeight,
    viewportStableHeight: webApp.viewportStableHeight,
    headerColor: webApp.headerColor,
    backgroundColor: webApp.backgroundColor,
    isClosingConfirmationEnabled: webApp.isClosingConfirmationEnabled,
    isVersionAtLeast: webApp.isVersionAtLeast,
    initData: webApp.initData,
    initDataUnsafe: webApp.initDataUnsafe,
    MainButton: {
      text: webApp.MainButton?.text,
      color: webApp.MainButton?.color,
      textColor: webApp.MainButton?.textColor,
      isVisible: webApp.MainButton?.isVisible,
      isActive: webApp.MainButton?.isActive,
      isProgressVisible: webApp.MainButton?.isProgressVisible,
    },
    BackButton: {
      isVisible: webApp.BackButton?.isVisible,
    },
    CloudStorage: {
      isSupported: webApp.CloudStorage?.isSupported,
    },
  };
};

export const showAlert = (message: string) => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.showAlert(message);
  } else {
    alert(NOT_IN_TELEGRAM_MESSAGE);
  }
};

export const showConfirm = (message: string): Promise<boolean> => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    return new Promise((resolve) => {
      webApp.showConfirm(message, (confirmed: boolean) => {
        resolve(confirmed);
      });
    });
  }
  alert(NOT_IN_TELEGRAM_MESSAGE);
  return Promise.resolve(false);
};

export const requestLocation = async (): Promise<Location | null> => {
  const webApp = getTelegramWebApp();
  
  if (!webApp?.LocationManager) {
    alert(NOT_IN_TELEGRAM_MESSAGE);
    return null;
  }

  const locationManager = webApp.LocationManager;
  console.log('Initial LocationManager state:', {
    isInited: locationManager.isInited,
    isLocationAvailable: locationManager.isLocationAvailable,
    isAccessGranted: locationManager.isAccessGranted,
    isAccessRequested: locationManager.isAccessRequested
  });

  try {
    // Step 1: Initialize if not initialized
    if (!locationManager.isInited) {
      console.log('Initializing location manager...');
      const initResult = await new Promise<boolean>((resolve) => {
        locationManager.init((success: boolean) => {
          console.log('Location manager init result:', success);
          resolve(success);
        });
      });
      
      if (!initResult) {
        console.log('Failed to initialize location manager');
        return null;
      }
    }

    // Step 2: Check if location is available on device
    if (!locationManager.isLocationAvailable) {
      console.log('Location is not available on this device');
      showAlert('Location is not available on this device');
      return null;
    }

    // Step 3: Request permission if not granted
    if (!locationManager.isAccessGranted) {
      console.log('Requesting location permission...');
      const permissionResult = await new Promise<boolean>((resolve) => {
        locationManager.requestAccess((success: boolean) => {
          console.log('Location permission result:', success);
          resolve(success);
        });
      });

      if (!permissionResult) {
        console.log('Location permission denied');
        if (locationManager.isAccessRequested) {
          console.log('Opening location settings...');
          locationManager.openSettings();
        }
        return null;
      }
    }

    // Step 4: Get location
    console.log('Requesting location...');
    const location = await new Promise<Location | null>((resolve) => {
      locationManager.getLocation((location: Location | null) => {
        console.log('Location result:', location);
        resolve(location);
      }, (error: any) => {
        console.error('Location error:', error);
        resolve(null);
      });
    });

    if (!location) {
      console.log('Could not get location');
      showAlert('Could not get location');
    }

    return location;
  } catch (error) {
    console.error('Location error:', error);
    alert(NOT_IN_TELEGRAM_MESSAGE);
    return null;
  }
};

export const closeTelegramWebApp = () => {
  const webApp = getTelegramWebApp();
  webApp?.close();
};

export const expandTelegramWebApp = () => {
  const webApp = getTelegramWebApp();
  webApp?.expand();
};

export const enableClosingConfirmation = () => {
  const webApp = getTelegramWebApp();
  webApp?.enableClosingConfirmation();
};

export const disableClosingConfirmation = () => {
  const webApp = getTelegramWebApp();
  webApp?.disableClosingConfirmation();
};

export const shareOnTelegram = () => {
  const url = `https://t.me/metanchiuz_bot/app?startapp=p_1`;
  const text = `Заправляйтесь удобно и быстро с Metanchi.uz`;
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, "_blank");
};
