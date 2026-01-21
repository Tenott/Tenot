export const categories = [
  { id: "auto", name: "Авто и транспорт", hint: "авто, мото, запчасти" },
  { id: "realty", name: "Недвижимость", hint: "квартиры, дома, аренда" },
  { id: "electronics", name: "Электроника", hint: "телефоны, ноутбуки" },
  { id: "home", name: "Для дома", hint: "мебель, техника, ремонт" },
  { id: "fashion", name: "Одежда и стиль", hint: "одежда, обувь, аксессуары" },
  { id: "services", name: "Услуги", hint: "ремонт, доставка, обучение" },
  { id: "jobs", name: "Работа", hint: "вакансии и подработка" },
  { id: "kids", name: "Детям", hint: "игрушки, коляски, одежда" },
  { id: "hobby", name: "Хобби и отдых", hint: "спорт, туризм, музыка" }
] as const;

export const categoriesById: Record<string, { id: string; name: string; hint: string }> = Object.fromEntries(
  categories.map(c => [c.id, c])
);
