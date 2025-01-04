'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus, X, Loader2 } from 'lucide-react';
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
import { ProductLightbox } from './_components/product-lightbox';

const SIZES = ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S'];

export default function ProductForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const { data: categories } = api.category.getAll.useQuery();
  const utils = api.useUtils();
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
      colors: [],
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
        colors: product.colors,
        images: product.images,
      });
      setSelectedImages(product.images);
      setSelectedColors(product.colors);
    }
  }, [product, form, isEditMode]);

  async function onSubmit(data: ProductFormValues) {
    try {
      setIsLoading(true);
      const result = isEditMode
        ? await updateProductAction({ ...data, id: resolvedParams.id })
        : await createProductAction(data);

      if (result.success) {
        utils.product.getAll.invalidate();
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    try {
      setIsLoading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
          `/api/upload?filename=${encodeURIComponent(file.name)}`,
          {
            method: 'POST',
            body: file,
          },
        );

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setSelectedImages((prev) => [...prev, ...uploadedUrls]);
      form.setValue('images', [...form.getValues('images'), ...uploadedUrls]);

      toast({
        title: 'Success',
        description: 'Images uploaded successfully',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload images',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleColorImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files?.length) return;

    try {
      setIsLoading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
          `/api/upload?filename=${encodeURIComponent(file.name)}`,
          {
            method: 'POST',
            body: file,
          },
        );

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setSelectedColors((prev) => [...prev, ...uploadedUrls]);
      form.setValue('colors', [
        ...(form.getValues('colors') || []),
        ...uploadedUrls,
      ]);

      toast({
        title: 'Success',
        description: 'Color images uploaded successfully',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload color images',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      'images',
      form.getValues('images').filter((_, i) => i !== index),
    );
  };
  const handleRemoveColor = (index: number) => {
    setSelectedColors((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      'colors',
      (form.getValues('colors') || []).filter((_, i) => i !== index),
    );
  };
  return (
    <div className="container py-10">
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-4 md:grid-cols-3"
        >
          <div className="space-y-8 md:col-span-2">
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
                  <div className="grid gap-4 md:grid-cols-2">
                    {SIZES.map((size) => {
                      const sizeEntry = field.value?.find(
                        (s) => s.size === size,
                      );
                      return (
                        <div key={size} className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant={sizeEntry ? 'default' : 'outline'}
                            className="w-16"
                            onClick={() => {
                              const current = [...field.value];
                              const index = current.findIndex(
                                (s) => s.size === size,
                              );
                              if (index !== -1) {
                                current.splice(index, 1);
                              } else {
                                current.push({ size, stock: 0 });
                              }
                              field.onChange(current);
                            }}
                          >
                            {size}
                          </Button>
                          {sizeEntry && (
                            <Input
                              type="number"
                              min={0}
                              value={sizeEntry.stock}
                              onChange={(e) => {
                                const current = [...field.value];
                                const index = current.findIndex(
                                  (s) => s.size === size,
                                );
                                if (index !== -1) {
                                  current[index] = {
                                    size: current[index]?.size || '',
                                    stock: parseInt(e.target.value) || 0,
                                  };
                                  field.onChange(current);
                                }
                              }}
                              className="w-24"
                              placeholder="Stock"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colors"
              render={({}) => (
                <FormItem>
                  <FormLabel>Өнгө нэмэх</FormLabel>
                  <div className="grid grid-cols-5 gap-4">
                    {selectedColors.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square rounded-lg border bg-muted"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt={`Бүтээгдэхүүн ${index + 1}`}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(index)}
                          className="absolute right-1 top-1 hidden rounded-full bg-destructive p-1 text-white group-hover:block"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <FormControl>
                      <div className="relative aspect-square">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleColorImageUpload}
                          id="color-upload"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="color-upload"
                          className={cn(
                            'flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed',
                            'hover:bg-muted/50',
                            isLoading && 'cursor-not-allowed opacity-50',
                          )}
                        >
                          {isLoading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                          ) : (
                            <>
                              <Plus className="h-8 w-8 text-muted-foreground" />
                            </>
                          )}
                        </label>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="images"
              render={({}) => (
                <FormItem>
                  <FormLabel>Бүтээгдэхүүний зураг</FormLabel>
                  <FormControl>
                    <ProductLightbox
                      handleRemoveImage={handleRemoveImage}
                      handleImageUpload={handleImageUpload}
                      images={selectedImages}
                      colors={selectedColors}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-start space-x-4">
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
