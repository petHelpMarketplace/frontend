import { CATEGORY_SLUGS, type CategorySlug } from "./types";

export const TITLE: Record<CategorySlug, string> = {
  registration: "Реєстрація фахівців",
  orders: "Замовлення",
  general: "Загальні питання",
};

export const ICON_BY_SLUG: Record<CategorySlug, string> = {
  registration: "icon-registration",
  orders: "icon-order",
  general: "icon-questions",
};

export const isCategorySlug = (v: unknown): v is CategorySlug =>
  typeof v === "string" && (CATEGORY_SLUGS as readonly string[]).includes(v);
