export function isOver24HoursFromNow(isoString: string) {
  const targetDate = new Date(isoString);
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - targetDate.getTime());

  return diffMs > 24 * 60 * 60 * 1000;
}
