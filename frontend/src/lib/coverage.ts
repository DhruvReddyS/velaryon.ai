/**
 * Illustrative coverage geometry — not a performance model.
 * A rectangular sea region (aspect × 1) with a stylised coastline on the left.
 * Each platform "watches" a disc of radius r (in region-height units).
 */

export const ASPECT = 1.6;
export const COLS = 96;
export const ROWS = 60;

/** Stylised coastline: land is everything left of this x for a given y. */
export const coastX = (y: number) => 0.1 + 0.05 * Math.sin(y * 7.3) + 0.028 * Math.sin(y * 19.1 + 1.3) + 0.02 * Math.cos(y * 3.1);

export type Pt = { x: number; y: number };

/** Platforms spread with the R2 low-discrepancy sequence — even, deterministic. */
export function stations(n: number): Pt[] {
  const g = 1.324717957244746;
  const a1 = 1 / g;
  const a2 = 1 / (g * g);
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const u = (0.5 + a1 * (i + 1)) % 1;
    const v = (0.5 + a2 * (i + 1)) % 1;
    const y = 0.06 + v * 0.88;
    const x0 = coastX(y) + 0.08;
    pts.push({ x: x0 + u * (ASPECT - x0 - 0.06), y });
  }
  return pts;
}

/** Small patrol orbit so the picture breathes; phase differs per platform. */
export function patrol(p: Pt, i: number, t: number, r: number): Pt {
  const a = t * (0.18 + (i % 5) * 0.03) + i * 1.7;
  return { x: p.x + Math.cos(a) * r * 0.35, y: p.y + Math.sin(a * 1.3) * r * 0.25 };
}

/** Fraction of sea cells within r of at least one platform. `lit` receives per-cell flags. */
export function coverage(pts: Pt[], r: number, lit?: Uint8Array) {
  let sea = 0;
  let seen = 0;
  const r2 = r * r;
  for (let j = 0; j < ROWS; j++) {
    const y = (j + 0.5) / ROWS;
    const land = coastX(y);
    for (let i = 0; i < COLS; i++) {
      const x = ((i + 0.5) / COLS) * ASPECT;
      const idx = j * COLS + i;
      if (x < land) { if (lit) lit[idx] = 2; continue; }
      sea++;
      let hit = 0;
      for (let k = 0; k < pts.length; k++) {
        const dx = pts[k].x - x;
        const dy = pts[k].y - y;
        if (dx * dx + dy * dy < r2) { hit = 1; break; }
      }
      if (lit) lit[idx] = hit;
      seen += hit;
    }
  }
  return sea ? seen / sea : 0;
}

/** Smallest platform count whose static stations reach the target fraction. */
export function platformsFor(target: number, r: number, max = 120) {
  for (let n = 1; n <= max; n++) if (coverage(stations(n), r) >= target) return n;
  return max;
}

export const RANGES = [
  { k: "Short", r: 0.09 },
  { k: "Medium", r: 0.13 },
  { k: "Long", r: 0.18 },
];
