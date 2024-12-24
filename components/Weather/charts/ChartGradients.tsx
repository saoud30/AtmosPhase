'use client';

interface GradientProps {
  id: string;
  color: string;
}

export function ChartGradient({ id, color }: GradientProps) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={color} stopOpacity={0}/>
    </linearGradient>
  );
}