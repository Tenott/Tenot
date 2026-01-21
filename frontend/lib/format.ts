export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTime(value: string | number): string {
  const date =
    typeof value === "number" ? new Date(value) : new Date(Date.parse(value));

  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ✅ ДОБАВИЛИ (для карточек/списков)
export function formatTimeShort(value: string | number): string {
  const date =
    typeof value === "number" ? new Date(value) : new Date(Date.parse(value));

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
}
