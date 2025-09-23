import { AnimalCategoryData } from '@/features/account/types';
import { animals } from '@/data/bookMock';

export const categoriesFromAnimals: AnimalCategoryData[] = animals.map(
  animal => ({
    type: animal.name === 'собаки' ? 'Собаки' : 'Коти',
    icon: animal.name === 'собаки' ? 'icon-spec-dog' : 'icon-cat',
    services: animal.services.map(serviceName => ({
      name: serviceName,
      price: 0,
      selected: false,
    })),
  })
);
