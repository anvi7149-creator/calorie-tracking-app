import React from 'react';

export function ProgressRing({ value, max, label, size = 120 }: { value: number; max: number; label: string; size?: number }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const pct = max ? Math.min((value / max) * 100, 100) : 0;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} stroke="#E6F0EC" strokeWidth="10" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={pct > 100 ? '#C94F4F' : '#237A57'}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-ink">{Math.round(value)}</div>
        <div className="text-[11px] uppercase tracking-[0.12em] text-muted">{label}</div>
      </div>
    </div>
  );
}
