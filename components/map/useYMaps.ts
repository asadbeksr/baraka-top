import { useContext } from 'react';

import { YMapsContext } from './context';

import type { YMaps } from './types';

export function useYMaps(): YMaps {
  const deferred = useContext(YMapsContext);
  if (!deferred) {
    throw new Error('useYMaps requires YMapsProvider installed');
  }
  if (deferred.state === 'resolved') {
    return deferred.result;
  }
  if (deferred.state === 'rejected') {
    throw deferred.error;
  }
  throw deferred.promise;
}