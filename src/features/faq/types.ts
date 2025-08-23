export type CategorySlug = "registration" | "orders" | "general";

export type FaqItem = {
    id: number;
    category: CategorySlug;
    question: string;
    answer: string; 
}