'use client';

import ProductCard from '@/app/components/ProductCard';
import { usePageContext } from '@/app/context/pageContext';
import { Product } from '@/app/models/product';
import { getProducts } from '@/app/services/products/getProducts';
import { getCurrentUser } from '@/app/services/users/getCurrentUser';
import { Center, Grid, Pagination, Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeRoute() {
  const { page, setPage } = usePageContext();

  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
    refetchOnMount: true,
  });

  const productsQuery = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(20, (page - 1) * 20),
    select: (data) => {
      return data.products;
    },
  });

  useEffect(() => {
    if (currentUserQuery.isLoading) {
      return;
    }

    if (currentUserQuery.data === null) {
      redirect('/login');
    }
  }, [currentUserQuery.data, currentUserQuery.isLoading]);

  if (currentUserQuery.isLoading) {
    return null;
  }

  return (
    <>
      <Grid>
        {productsQuery.isLoading
          ? Array.from({ length: 20 }, (v, i) => i).map((i) => {
              return (
                <Grid.Col span={{ xs: 6, md: 3 }} key={i}>
                  <Skeleton height={400} radius="md" />
                </Grid.Col>
              );
            })
          : null}
        {productsQuery.data
          ? productsQuery.data.map((product: Product) => {
              return (
                <Grid.Col span={{ xs: 6, md: 3 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid.Col>
              );
            })
          : null}
      </Grid>

      <Center mt="md">
        <Pagination total={5} value={page} onChange={(p) => setPage(p)} />
      </Center>
    </>
  );
}
