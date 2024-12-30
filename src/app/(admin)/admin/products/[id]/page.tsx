'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createProductAction, updateProductAction } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createProductSchema, type ProductFormValues } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { api } from '@/trpc/react';

const SIZES = ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S'];

export default function ProductForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { data: categories } = api.category.getAll.useQuery();

  const resolvedParams = use(params);
  const isEditMode = resolvedParams.id !== 'new';

  const { data: product } = api.product.getById.useQuery(resolvedParams.id, {
    enabled: resolvedParams.id !== 'new',
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      discount: 0,
      sizes: [],
      images: [],
    },
  });

  useEffect(() => {
    if (product && isEditMode) {
      form.reset({
        name: product.name,
        description: product.description || undefined,
        price: product.price,
        discount: product.discount || 0,
        sizes: product.sizes,
        categoryId: product.categoryId,
        images: product.images,
      });
      setSelectedImages(product.images);
    }
  }, [product, form, isEditMode]);

  async function onSubmit(data: ProductFormValues) {
    try {
      setIsLoading(true);
      const result = isEditMode
        ? await updateProductAction({ ...data, id: resolvedParams.id })
        : await createProductAction(data);

      if (result.success) {
        toast({
          title: `Бүтээгдэхүүн амжилттай ${isEditMode ? 'шинэчлэгдлээ' : 'үүсгэгдлээ'}.`,
          description: result.message,
        });
        router.push('/admin/products');
      } else {
        toast({
          title: 'Алдаа гарлаа.',
          description: result.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Алдаа гарлаа.',
        description: `Бүтээгдэхүүн ${isEditMode ? 'шинэчлэхэд' : 'үүсгэхэд'} алдаа гарлаа.`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setSelectedImages((prev) => [...prev, ...newImages]);
      form.setValue('images', [...form.getValues('images'), ...newImages]);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Бүтээгдэхүүн рүү буцах
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold">
        {isEditMode ? 'Бүтээгдэхүүн засах' : 'Шинэ бүтээгдэхүүн'}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бүтээгдэхүүний нэр</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Бүтээгдэхүүний нэрийг оруулна уу"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ангилал</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Ангилал сонгох" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тайлбар</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Бүтээгдэхүүний тайлбар"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  {field.value?.length || 0}/100
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Үнэ</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хямдрал (%)</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Хямдрал сонгох" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(
                        (value) => (
                          <SelectItem key={value} value={String(value)}>
                            {value}%
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Боломжит хэмжээнүүд</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <Button
                      type="button"
                      key={size}
                      variant={
                        field.value?.includes(size) ? 'default' : 'outline'
                      }
                      className="w-16"
                      onClick={() => {
                        const current = new Set(field.value);
                        if (current.has(size)) {
                          current.delete(size);
                        } else {
                          current.add(size);
                        }
                        field.onChange(Array.from(current));
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({}) => (
              <FormItem>
                <FormLabel>Бүтээгдэхүүний зураг</FormLabel>
                <div className="grid grid-cols-5 gap-4">
                  {selectedImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg border bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={`Бүтээгдэхүүн ${index + 1}`}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  ))}
                  <FormControl>
                    <div className="relative aspect-square">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={cn(
                          'flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed',
                          'hover:bg-muted/50',
                        )}
                      >
                        <Plus className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Зураг нэмэх
                        </span>
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
            >
              Цуцлах
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Уншиж байна...'
                : isEditMode
                  ? 'Бүтээгдэхүүн шинэчлэх'
                  : 'Бүтээгдэхүүн үүсгэх'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
