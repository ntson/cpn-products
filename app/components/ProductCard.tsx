import { Product } from '@/app/models/product';
import { Button, Card, Flex, Image, Rating, Text } from '@mantine/core';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      styles={{
        root: {
          height: 400,
        },
      }}
    >
      <Card.Section>
        <Image
          src={product.thumbnail}
          height={150}
          alt={`${product.brand}--${product.title}`}
        />
      </Card.Section>

      <Flex mt="md" justify="space-between" direction="column" h={250}>
        <Flex direction="column" justify="start">
          <Text fw={500}>{product.title}</Text>
          <Text size="sm" c="dimmed">
            {product.description}
          </Text>
        </Flex>

        <Flex justify="flex-end">
          <Rating value={product.rating} fractions={4} readOnly />
        </Flex>
      </Flex>
    </Card>
  );
}
