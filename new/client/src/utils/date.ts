export function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}
export function diffDHMS(target: Date) {
  const now = Date.now();
  let diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s };
}
