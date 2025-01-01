import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ProductImageGallery } from '../_components/product_image_gallery';
import { RelatedProducts } from '../_components/related-products';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await api.product.getById(params.id);

  if (!product) {
    notFound();
  }

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
                      className={`h-12 w-12 overflow-hidden rounded border ${
                        index === 0 ? 'border-2 border-primary' : ''
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
                  defaultValue={product.sizes[0]}
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
            <Button className="flex-1">Add to cart</Button>
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
