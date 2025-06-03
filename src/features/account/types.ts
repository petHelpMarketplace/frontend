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

export interface AccountServicesFormValues {
  services: {
    [animalType: string]: {
      [serviceName: string]: boolean;
    };
  };
}
