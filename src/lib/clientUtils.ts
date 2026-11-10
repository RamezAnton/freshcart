export function priceFormatter(price: number) {
  const amount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return `${amount} EGP`;
}
