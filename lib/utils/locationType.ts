export const locationTypeLabels: Record<string, string> = {
  more: "Море",
  hory: "Гори",
  ozero: "Озеро",
  lis: "Ліс",
  richka: "Річка",
  park: "Парк",
  canyon: "Каньйон",
  reserve: "Заповідник",
  island: "Острів",
  beach: "Пляж",
  mountains: "Гори",
  lake: "Озеро",
  forest: "Ліс",
  river: "Річка",
  resort: "Курорт",
  cliffs: "Скелі",
  valley: "Долина",
  "historical-place": "Історичне місце",
};

export function getLocationTypeLabel(type?: string) {
  if (!type) return "Локація";
  return locationTypeLabels[type] || "Локація";
}
