const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function formatPoints(points: number) {
  const value = formatter.format(points);

  if (points > 0) {
    return `+${value}`;
  }

  return value;
}
