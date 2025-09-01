export const CATEGORY_SLUGS = ['registration', 'orders', 'general'] as const;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type FaqItem = {
  id: number;
  category: CategorySlug;
  question: string;
  answer: string;
};

export const isCategorySlug = (v: unknown): v is CategorySlug =>
  typeof v === 'string' && (CATEGORY_SLUGS as readonly string[]).includes(v);