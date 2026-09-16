'use client';

import React, { useMemo } from 'react';
import {
  OXFORD_COVE_LOCATION,
  DESTINATION_POINTS,
  geoToMapPosition,
} from './locationCoordinates';

export interface ConnectionPathData {
  id: string;
  destinationId: string;
  phase: number;
  d: string;
  length: number;
}

export const LocationConnections: React.FC = () => {
  const origin = useMemo(() => {
    return geoToMapPosition(OXFORD_COVE_LOCATION.lat, OXFORD_COVE_LOCATION.lng);
  }, []);

  const connections: ConnectionPathData[] = useMemo(() => {
    return DESTINATION_POINTS.filter((p) => !p.isPrimary).map((dest) => {
      const target = geoToMapPosition(dest.lat, dest.lng);

      const dx = target.x - origin.x;
      const dy = target.y - origin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Subtle curved trajectory with control point
      const midX = (origin.x + target.x) / 2;
      const midY = (origin.y + target.y) / 2;
      const curvature = dist * 0.14;
      const ctrlX = midX - (dy / (dist || 1)) * curvature;
      const ctrlY = midY + (dx / (dist || 1)) * curvature;

      const pathString = `M ${origin.x} ${origin.y} Q ${ctrlX} ${ctrlY} ${target.x} ${target.y}`;

      return {
        id: `connection-${dest.id}`,
        destinationId: dest.id,
        phase: dest.phase,
        d: pathString,
        length: Math.round(dist * 1.15),
      };
    });
  }, [origin]);

  return (
    <g className="location-connections pointer-events-none">
      <defs>
        <linearGradient id="routeLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5D7B7" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#C8B89A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#806B54" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {connections.map((conn) => (
        <g key={conn.id} className={`route-group route-phase-${conn.phase}`}>
          {/* Subtle Outer Guide Path */}
          <path
            d={conn.d}
            fill="none"
            stroke="#FAF9F6"
            strokeWidth="1"
            strokeOpacity="0.12"
            strokeLinecap="round"
          />

          {/* Animated Route Line (GSAP Controls stroke-dashoffset) */}
          <path
            id={conn.id}
            data-phase={conn.phase}
            className="route-animated-path"
            d={conn.d}
            fill="none"
            stroke="url(#routeLineGradient)"
            strokeWidth="1.75"
            strokeLinecap="round"
            style={{
              strokeDasharray: conn.length,
              strokeDashoffset: conn.length,
            }}
          />
        </g>
      ))}
    </g>
  );
};
