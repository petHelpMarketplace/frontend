export interface Service {
  name: string;
  price: number;
  selected: boolean;
}

export interface AnimalCategoryData {
  type: 'Собаки' | 'Коти';
  icon: 'icon-cat' | 'icon-spec-dog';
  services: Service[];
}

export type AccountServicesFormValues = {
  services: {
    Собаки?: {
      [serviceName: string]: boolean;
    };
    Коти?: {
      [serviceName: string]: boolean;
    };
  };
  prices?: {
    Собаки?: {
      [serviceName: string]: string;
    };
    Коти?: {
      [serviceName: string]: string;
    };
  };
};
