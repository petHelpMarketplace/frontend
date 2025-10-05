type PublicOfferList = {
  text?: string;
  subList?: string[];
};

export type PublicOfferTerms = {
  title: string;
  description?: string;
  lists?: PublicOfferList[];
};
