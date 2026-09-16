'use client';

import React, { useMemo } from 'react';
import { DESTINATIONS, OXFORD_COVE_LOCATION } from './destinations';

interface ConnectionLinesProps {
  positions: Record<string, { x: number; y: number }>;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ positions }) => {
  const oxfordPos = positions[OXFORD_COVE_LOCATION.id];

  const destinationList = DESTINATIONS.filter((d) => !d.isPrimary);

  const paths = useMemo(() => {
    if (!oxfordPos) return [];

    return destinationList.map((dest) => {
      const targetPos = positions[dest.id];
      if (!targetPos) return null;

      const dx = targetPos.x - oxfordPos.x;
      const dy = targetPos.y - oxfordPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Subtle curved trajectory with control point
      const midX = (oxfordPos.x + targetPos.x) / 2;
      const midY = (oxfordPos.y + targetPos.y) / 2;
      const curvature = dist * 0.10;
      const ctrlX = midX - (dy / (dist || 1)) * curvature;
      const ctrlY = midY + (dx / (dist || 1)) * curvature;

      const d = `M ${oxfordPos.x} ${oxfordPos.y} Q ${ctrlX} ${ctrlY} ${targetPos.x} ${targetPos.y}`;
      const approxLength = Math.round(dist * 1.12);

      return {
        id: dest.id,
        order: dest.revealOrder,
        d,
        length: approxLength,
      };
    }).filter(Boolean);
  }, [oxfordPos, positions, destinationList]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5] overflow-visible">
      <defs>
        <linearGradient id="connectionStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#28372D" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#806B54" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#171815" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {paths.map((p) => {
        if (!p) return null;
        return (
          <g key={p.id}>
            {/* Subtle guide backdrop */}
            <path
              d={p.d}
              fill="none"
              stroke="#FAF9F6"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />

            {/* Animated Connection Line */}
            <path
              id={`connection-${p.id}`}
              data-order={p.order}
              className={`route-path route-path-${p.id}`}
              d={p.d}
              fill="none"
              stroke="url(#connectionStrokeGrad)"
              strokeWidth="1.75"
              strokeLinecap="round"
              style={{
                strokeDasharray: p.length,
                strokeDashoffset: p.length,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
};
