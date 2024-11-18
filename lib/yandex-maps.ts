declare global {
  interface Window {
    ymaps: any;
  }
}

export interface YandexMapOptions {
  center: [number, number];
  zoom: number;
  controls?: string[];
}

export interface MapMarker {
  coordinates: [number, number];
  title?: string;
  description?: string;
}

let mapsPromise: Promise<any> | null = null;

export const loadYandexMaps = (apiKey: string): Promise<any> => {
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cannot load Yandex Maps in server environment'));
      return;
    }

    // If already loaded, resolve immediately
    if (window.ymaps) {
      resolve(window.ymaps);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          resolve(window.ymaps);
        });
      } else {
        reject(new Error('Yandex Maps failed to load'));
      }
    });

    script.addEventListener('error', () => {
      reject(new Error('Failed to load Yandex Maps script'));
    });

    document.head.appendChild(script);
  });

  return mapsPromise;
};

export const createMap = (
  container: HTMLElement,
  options: YandexMapOptions
): Promise<any> => {
  return loadYandexMaps(process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || '')
    .then((ymaps) => {
      const map = new ymaps.Map(container, {
        center: options.center,
        zoom: options.zoom,
        controls: options.controls || ['zoomControl', 'fullscreenControl'],
      });

      return map;
    });
};

export const addMarker = (
  map: any,
  marker: MapMarker
): Promise<any> => {
  return loadYandexMaps(process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || '')
    .then((ymaps) => {
      const placemark = new ymaps.Placemark(
        marker.coordinates,
        {
          balloonContent: marker.description,
          hintContent: marker.title,
        },
        {
          preset: 'islands#blueDotIcon',
        }
      );

      map.geoObjects.add(placemark);
      return placemark;
    });
};

export const setMapCenter = (
  map: any,
  coordinates: [number, number],
  zoom?: number
): void => {
  map.setCenter(coordinates, zoom !== undefined ? zoom : map.getZoom());
};
