'use client';

import ProductCard from '@/app/components/ProductCard';
import { usePageContext } from '@/app/context/pageContext';
import { Product } from '@/app/models/product';
import { getProducts } from '@/app/services/products/getProducts';
import { Center, Grid, Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function HomeRoute() {
  const { page, setPage } = usePageContext();

  const productsQuery = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(20, (page - 1) * 20),
    select: (data) => {
      return data.products;
    },
  });

  return (
    <>
      <Grid>
        {productsQuery.data &&
          productsQuery.data.map((product: Product) => {
            return (
              <Grid.Col span={{ xs: 6, md: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid.Col>
            );
          })}
      </Grid>

      <Center mt="md">
        <Pagination total={5} value={page} onChange={(p) => setPage(p)} />
      </Center>
    </>
  );
}
