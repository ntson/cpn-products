import { Product } from '@/app/models/product';
import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

export const productFactory = Factory.define<Product>(({ sequence }) => {
  return {
    id: sequence,
    brand: faker.company.name(),
    category: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    title: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    discountPercentage: faker.number.float({ min: 0, max: 100 }),
    rating: faker.number.int({ min: 1, max: 5 }),
    stock: faker.number.int({ min: 0 }),
    thumbnail: faker.internet.url(),
  };
});
