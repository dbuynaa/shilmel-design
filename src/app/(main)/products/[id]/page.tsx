'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ProductImageGallery } from '../_components/product_image_gallery';
import { RelatedProducts } from '../_components/related-products';
import { api } from '@/trpc/react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    primary: string;
    secondary?: string;
  } | null>(null);

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
    if (!selectedSize) {
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

    addToCart.mutate({
      productId: product.id,
      quantity: 1,
      size: selectedSize,
      color: selectedColor ?? {
        name: 'default',
        primary: '#000000',
      },
    });
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

  return (
    <div className="container mx-auto px-[5%] py-8">
      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        <ProductImageGallery images={productImages} />
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Product code: #{product.id}
            </p>
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
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
                        setSelectedColor({
                          name: `color-${index}`,
                          primary: color as string,
                        })
                      }
                      className={`h-12 w-12 overflow-hidden rounded border ${
                        selectedColor?.primary === color
                          ? 'border-2 border-primary'
                          : ''
                      }`}
                    >
                      <div
                        style={{ backgroundColor: color as string }}
                        className="h-full w-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="mb-3 font-medium">Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size.toLowerCase()}
                        id={`size-${size.toLowerCase()}`}
                        className="peer hidden"
                      />
                      <Label
                        htmlFor={`size-${size.toLowerCase()}`}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              className="flex-1"
              onClick={handleAddToCart}
              disabled={addToCart.isPending}
            >
              {addToCart.isPending ? 'Нэмж байна...' : 'Сагсанд нэмэх'}
            </Button>
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
