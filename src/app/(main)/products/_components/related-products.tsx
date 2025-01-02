'use client';

import { ProductCard } from '@/components/product-card';
import { api } from '@/trpc/react';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const { data: products } = api.product.getAll.useQuery({
    categoryId,
    limit: 4,
    orderby: 'desc',
  });

  const relatedProducts = products?.items
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts?.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts?.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              title: product.name,
              price: product.price,
              image: product.images[0] ?? '/placeholder.svg',
            }}
          />
        ))}
      </div>
    </section>
  );
}
