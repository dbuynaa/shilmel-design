'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductImageGallery } from '../_components/product_image_gallery';
import { RelatedProducts } from '../_components/related-products';
import { api } from '@/trpc/react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, { quantity: number; stock: number }>
  >({});

  const { data: product } = api.product.getById.useQuery(params.id);
  const addToCart = api.cart.addItem.useMutation({
    onSuccess: () => {
      toast({
        title: 'Сагсанд нэмэгдлээ',
        description: 'Таны сонгосон бүтээгдэхүүн амжилттай нэмэгдлээ',
      });
    },
    onError: (error) => {
      toast({
        title: 'Алдаа гарлаа',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    const sizesWithQuantity = Object.entries(selectedSizes).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, { quantity }]) => quantity > 0,
    );

    if (sizesWithQuantity.length === 0) {
      toast({
        title: 'Хэмжээгээ сонгоно уу',
        variant: 'destructive',
      });
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: 'Өнгөө сонгоно уу',
        variant: 'destructive',
      });
      return;
    }

    // Add to cart for each size with quantity
    sizesWithQuantity.forEach(([size, { quantity }]) => {
      addToCart.mutate({
        productId: product.id,
        quantity,
        size,
        color: selectedColor!,
      });
    });
  };

  const handleQuantityChange = (
    size: string,
    quantity: number,
    stock: number,
  ) => {
    if (quantity < 0) return;
    if (quantity > stock) {
      toast({
        title: 'Бараа хүрэлцэхгүй байна',
        description: `Зөвхөн ${stock} ширхэг үлдсэн байна`,
        variant: 'destructive',
      });
      return;
    }

    setSelectedSizes((prev) => ({
      ...prev,
      [size]: { quantity, stock },
    }));
  };

  const productImages = product.images?.map((image) => ({
    src: image,
    alt: product.name,
  })) ?? [
    {
      src: '/placeholder.svg?height=600&width=600',
      alt: product.name,
    },
  ];

  const renderSizeSection = () => (
    <div className="space-y-4 border-t pt-4">
      <h3 className="mb-3 font-medium">Size</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {product.sizes.map((sizeObj) => (
          <div
            key={sizeObj.size}
            className={`rounded-lg border p-4 ${sizeObj.stock === 0 ? 'opacity-50' : ''}`}
          >
            <div className="mb-2 text-sm font-semibold">{sizeObj.size}</div>
            <div className="mb-2 text-xs text-muted-foreground">
              Stock: {sizeObj.stock}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max={sizeObj.stock}
                value={selectedSizes[sizeObj.size]?.quantity || 0}
                onChange={(e) =>
                  handleQuantityChange(
                    sizeObj.size,
                    parseInt(e.target.value) || 0,
                    sizeObj.stock,
                  )
                }
                disabled={sizeObj.stock === 0}
                className="h-8"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-[5%] py-8">
      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        <ProductImageGallery images={productImages} />
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Барааны код: #{product.id}
            </p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mb-4 text-sm text-muted-foreground">
              {product.category.name}
            </p>
            <p className="text-2xl font-semibold">{product.price}₮</p>
          </div>

          <div className="space-y-4">
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="mb-3 font-medium">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedColor(selectedColor === color ? null : color)
                      }
                      className={`h-12 w-12 overflow-hidden rounded border ${
                        selectedColor === color ? 'border-2 border-primary' : ''
                      }`}
                    >
                      <div
                        style={{ backgroundColor: color }}
                        className="h-full w-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && renderSizeSection()}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-1 flex-row gap-2">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
              >
                {addToCart.isPending ? 'Нэмж байна...' : 'Сагсанд нэмэх'}
              </Button>
              <Button
                className="flex-1 bg-stone-900 text-white hover:bg-stone-800"
                disabled={addToCart.isPending}
              >
                <Link href={`/products/${product.id}/logo-submission`}>
                  Лого тохируулах
                </Link>
              </Button>
            </div>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="border-t pt-6">
            <h3 className="mb-4 font-semibold">Product Details</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>

      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  );
}
