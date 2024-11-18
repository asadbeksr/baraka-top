import React from 'react';

import type { DeferredResult } from '@/components/map/useDeferred';

import type { YMaps } from './types';

export const YMapsContext = React.createContext<DeferredResult<YMaps> | null>(
  null,
);