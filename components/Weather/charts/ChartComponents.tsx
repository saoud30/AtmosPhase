'use client';

import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';
import type { XAxisProps, YAxisProps } from 'recharts';

export function XAxis(props: XAxisProps) {
  return (
    <RechartsXAxis
      stroke="hsl(var(--muted-foreground))"
      tick={{ fill: 'hsl(var(--muted-foreground))' }}
      {...props}
    />
  );
}

export function YAxis(props: YAxisProps) {
  return (
    <RechartsYAxis
      stroke="hsl(var(--muted-foreground))"
      tick={{ fill: 'hsl(var(--muted-foreground))' }}
      {...props}
    />
  );
}