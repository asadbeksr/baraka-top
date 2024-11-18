'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getTelegramInfo, type TelegramInfo } from '@/lib/telegram';

export default function TgDebugInfo() {
  const [info, setInfo] = useState<TelegramInfo>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setInfo(getTelegramInfo());
  }, []);

  if (!isClient) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto my-4">
      <CardHeader>
        <CardTitle>Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div className="space-y-2">
            <h3 className="font-semibold">Basic Information</h3>
            <p>Platform: {info.platform || 'N/A'}</p>
            <p>Version: {info.version || 'N/A'}</p>
            <p>Color Scheme: {info.colorScheme || 'N/A'}</p>
          </div>

          {/* Viewport Info */}
          <div className="space-y-2">
            <h3 className="font-semibold">Viewport Information</h3>
            <p>Height: {info.viewportHeight || 'N/A'}</p>
            <p>Stable Height: {info.viewportStableHeight || 'N/A'}</p>
            <p>Is Expanded: {info.isExpanded?.toString() || 'N/A'}</p>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <h3 className="font-semibold">Colors</h3>
            <p>Header Color: {info.headerColor || 'N/A'}</p>
            <p>Background Color: {info.backgroundColor || 'N/A'}</p>
          </div>

          {/* Main Button */}
          <div className="space-y-2">
            <h3 className="font-semibold">Main Button</h3>
            <p>Text: {info.MainButton?.text || 'N/A'}</p>
            <p>Color: {info.MainButton?.color || 'N/A'}</p>
            <p>Is Visible: {info.MainButton?.isVisible?.toString() || 'N/A'}</p>
            <p>Is Active: {info.MainButton?.isActive?.toString() || 'N/A'}</p>
          </div>

          {/* Back Button */}
          <div className="space-y-2">
            <h3 className="font-semibold">Back Button</h3>
            <p>Is Visible: {info.BackButton?.isVisible?.toString() || 'N/A'}</p>
          </div>

          {/* Cloud Storage */}
          <div className="space-y-2">
            <h3 className="font-semibold">Cloud Storage</h3>
            <p>Is Supported: {info.CloudStorage?.isSupported?.toString() || 'N/A'}</p>
          </div>

          {/* Theme Params */}
          <div className="space-y-2 col-span-full">
            <h3 className="font-semibold">Theme Parameters</h3>
            <pre className="bg-secondary p-2 rounded-lg overflow-auto max-h-40">
              {JSON.stringify(info.themeParams, null, 2)}
            </pre>
          </div>

          {/* Init Data */}
          <div className="space-y-2 col-span-full">
            <h3 className="font-semibold">Init Data</h3>
            <pre className="bg-secondary p-2 rounded-lg overflow-auto max-h-40">
              {JSON.stringify(info.initDataUnsafe, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
