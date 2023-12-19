'use client';

import { Product } from '@/app/models/product';
import { addProduct } from '@/app/services/products/addProduct';
import { getProducts } from '@/app/services/products/getProducts';
import { getCurrentUser } from '@/app/services/users/getCurrentUser';
import { Button, Flex, NumberInput, Text, TextInput } from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AddProductRoute() {
  const form = useForm<Omit<Product, 'id'>>({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 1,
      stock: 1,
      brand: '',
      category: '',
      thumbnail:
        'https://www.centralpattana.co.th/storage/share-centralpattana.jpg',
    },
    validate: {
      title: isNotEmpty('Required'),
      description: isNotEmpty('Required'),
      brand: isNotEmpty('Required'),
      category: isNotEmpty('Required'),
      rating: isInRange({ min: 1, max: 5 }),
      stock: isInRange({ min: 1 }),
      price: isInRange({ min: 0 }),
      discountPercentage: isInRange({ min: 0, max: 100 }),
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
    refetchOnMount: true,
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: async (data) => {
      await queryClient.ensureQueryData({
        queryKey: ['products', 1],
        queryFn: () => getProducts(20, 0),
      });

      queryClient.setQueryData(['products', 1], (oldData: any) => {
        const newData = {
          ...oldData,
          products: [data, ...oldData.products],
        };

        return newData;
      });

      router.push('/');
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

  const handleSubmit = (values: Omit<Product, 'id'>) => {
    addProductMutation.mutate(values);
  };

  if (currentUserQuery.isLoading) {
    return null;
  }

  return (
    <Flex
      mih="90vh"
      justify="center"
      align="center"
      direction="column"
      gap="md"
    >
      <Text fw={600} fz="xl">
        Add a new product
      </Text>

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          width: '95%',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Product title"
          {...form.getInputProps('title')}
        />

        <TextInput
          withAsterisk
          label="Description"
          placeholder="Product description"
          {...form.getInputProps('description')}
        />

        <TextInput
          withAsterisk
          label="Brand"
          placeholder="Brand"
          {...form.getInputProps('brand')}
        />

        <TextInput
          withAsterisk
          label="Category"
          placeholder="Product category"
          {...form.getInputProps('category')}
        />

        <NumberInput
          withAsterisk
          label="Price"
          placeholder="Price"
          min={0}
          {...form.getInputProps('price')}
        />

        <NumberInput
          withAsterisk
          label="Discount percentage"
          min={0}
          max={100}
          {...form.getInputProps('discountPercentage')}
        />

        <NumberInput
          withAsterisk
          label="Stock"
          min={1}
          {...form.getInputProps('stock')}
        />

        <NumberInput
          withAsterisk
          label="Rating"
          min={1}
          max={5}
          {...form.getInputProps('rating')}
        />

        {/* <FileInput
          withAsterisk
          label="Thumbnail"
          {...form.getInputProps('thumbnail')}
        /> */}

        <Button type="submit" loading={addProductMutation.isPending}>
          Confirm
        </Button>
      </form>
    </Flex>
  );
}
