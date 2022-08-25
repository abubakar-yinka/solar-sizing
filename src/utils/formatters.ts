export const formatDate = (
  timestamp: Date | string | number | undefined,
  format?: Intl.DateTimeFormatOptions,
): string => {
  if (!timestamp) return "";
  const initFormat = format || {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat("en-NG", initFormat).format(date);
  return formatter;
};

export const formatAmount = (amount: number | bigint) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
  return formatter;
};

export const formatUSDAmount = (amount: number | bigint) => {
  if (!amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(0);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
};

export const formatUsername = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
