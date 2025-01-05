'use client';

import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { ProductCard } from '@/components/product-card';
import { api } from '@/trpc/react';
import { useCallback } from 'react';
import { groupBy } from '@/lib/utils';
import { CustomCartItem } from '@/components/cart/custom-cart-item';

export default function CartPage() {
  const { data: cart, refetch: refetchCart } = api.cart.get.useQuery();
  const { data: recommendedProducts } = api.product.getAll.useQuery({
    limit: 4,
    orderby: 'desc',
  });

  const removeItem = api.cart.removeItem.useMutation({
    onSuccess: () => refetchCart(),
  });

  const updateQuantity = api.cart.updateItemQuantity.useMutation({
    onSuccess: () => refetchCart(),
  });

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItem.mutate(itemId);
    },
    [removeItem],
  );

  const handleUpdateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      updateQuantity.mutate({ itemId, quantity });
    },
    [updateQuantity],
  );

  // Group cart items by product ID
  const groupedItems = cart?.items
    ? groupBy(cart.items, (item) => item.productId ?? '')
    : {};

  const totalItems =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const totalPrice =
    cart?.items.reduce(
      (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
      0,
    ) ?? 0;

  return (
    <div className="flex min-h-screen flex-col px-[12%]">
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Миний сагс ({totalItems})</h1>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="divide-y">
              {cart?.customCartItems.map((item) => (
                <CustomCartItem
                  key={item.id}
                  item={item}
                  sizes={item.sizes}
                  onRemove={() => handleRemoveItem(item.id)}
                />
              ))}
              {Object.entries(groupedItems).map(([productId, items]) => {
                const product = items[0]?.product;
                if (!product) return null;

                return (
                  <div key={productId} className="py-6">
                    <div className="mb-4 flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0] ?? '/placeholder.svg'}
                        alt={product.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.price.toLocaleString()}₮
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {items.map((item) => (
                        <CartItem
                          key={item.id}
                          id={item.id}
                          title={product.name}
                          price={product.price}
                          image={product.images[0] ?? '/placeholder.svg'}
                          quantity={item.quantity}
                          size={item.size}
                          color={item.color}
                          onUpdateQuantity={(quantity) =>
                            handleUpdateQuantity(item.id, quantity)
                          }
                          onRemove={() => handleRemoveItem(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
          </div>
          <div className="mt-16 space-y-4">
            <h2 className="text-2xl font-bold">Санал болгох</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recommendedProducts?.items.map((product) => (
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
          </div>
        </div>
      </main>
    </div>
  );
}
