
import type { CategorySlug } from "./types";

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

export { isCategorySlug } from "./types";
