export const formatCount = (count: number) => {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(count);
};
