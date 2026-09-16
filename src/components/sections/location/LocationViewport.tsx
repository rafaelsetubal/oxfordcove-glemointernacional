'use client';

import React from 'react';
import { LocationWorldMap } from './LocationWorldMap';

export const LocationViewport: React.FC = () => {
  return (
    <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#FAF9F6] select-none">
      <LocationWorldMap />
    </div>
  );
};
