'use client';

import Script from 'next/script';
import React, { useEffect } from 'react';

import { useDeferred } from '@/components/map/useDeferred';
import { YMapsContext } from '@/components/map/context';
import { YMaps } from './types';


type Props = React.PropsWithChildren<{ apiKey?: string }>;

export function YMapsProvider({ children, apiKey }: Props) {
  const scriptDeferred = useDeferred<true>();
  const mapsDeferred = useDeferred<YMaps>();

  useEffect(() => {
    if (
      scriptDeferred.state === 'resolved' &&
      mapsDeferred.state === 'pending'
    ) {
      Promise.all([
        ymaps3.import('@yandex/ymaps3-clusterer@0.0.1'),
        ymaps3.ready,
      ]).then(
        ([clustererModule]) =>
          mapsDeferred.resolve({ ...ymaps3, ...clustererModule }),
        (error) => mapsDeferred.reject(error),
      );
    } else if (
      scriptDeferred.state === 'rejected' &&
      mapsDeferred.state === 'pending'
    ) {
      mapsDeferred.reject(scriptDeferred.error);
    }
  }, [scriptDeferred, mapsDeferred]);

  const handleScriptLoaded = () => {
    if (scriptDeferred.state === 'pending') {
      scriptDeferred.resolve(true);
    }
  };

  const handleScriptLoadingFailed = (error: Error) => {
    if (scriptDeferred.state === 'pending') {
      scriptDeferred.reject(error);
    }
  };

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=en_RU`}
        onReady={handleScriptLoaded}
        onError={handleScriptLoadingFailed}
      />
      <YMapsContext.Provider value={mapsDeferred}>
        {children}
      </YMapsContext.Provider>
    </>
  );
}