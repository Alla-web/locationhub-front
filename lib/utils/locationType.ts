export const locationTypeLabels: Record<string, string> = {
  more: "Море",
  mountains: "Гори",
  lake: "Озеро",
  forest: "Ліс",
  river: "Річка",
  beach: "Пляж",
  park: "Парк",
  reserve: "Заповідник",
  canyon: "Каньйон",
  historical_place: "Історичне місце",
  resort: "Курорт",
  island: "Острів",
  cliffs: "Скелі",
  valley: "Долина",
};

export function getLocationTypeLabel(type?: string) {
  if (!type) return "Локація";
  return locationTypeLabels[type] || "Локація";
}
