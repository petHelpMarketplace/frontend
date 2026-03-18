export interface FooterLink {
  text: string;
  to: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: 'Про нас',
    links: [
      { text: 'Про проєкт', to: '#' },
      { text: 'Контакти', to: '/support' },
    ],
  },
  {
    title: 'Як це працює',
    links: [{ text: 'Як замовити послугу?', to: '#' }],
  },
  {
    title: 'Допомога',
    links: [
      { text: 'Питання та відповіді', to: '/faq' },
      { text: 'Правила конфіденційності', to: '#' },
      { text: 'Служба підтримки', to: '/support' },
      { text: 'Публічна оферта', to: '/public-offer' },
    ],
  },
  {
    title: 'Посилання',
    links: [
      { text: 'Вигул', to: '#' },
      { text: 'Перетримка', to: '#' },
      { text: 'Грумінг', to: '#' },
    ],
  },
];
