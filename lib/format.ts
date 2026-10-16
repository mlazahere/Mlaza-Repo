/**
 * Formats cents as South African rand, e.g. 345000 → "R3 450".
 * Hand-rolled rather than Intl so server and browser output are identical
 * (ICU data differs between Node and browsers, which breaks hydration).
 */
export function formatPrice(cents: number): string {
  const negative = cents < 0;
  const abs = Math.abs(Math.round(cents));
  const rand = Math.floor(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const c = abs % 100;
  return `${negative ? "-" : ""}R${rand}${c ? "," + String(c).padStart(2, "0") : ""}`;
}
