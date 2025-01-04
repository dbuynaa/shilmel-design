import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const getProductsSchema = z.object({
  categoryId: z.string().optional(),
  limit: z.number().min(1).max(100).default(50),
  orderby: z.enum(['asc', 'desc']).default('desc'),
  cursor: z.string().nullish(),
});

const productSizeSchema = z.object({
  size: z.string(),
  stock: z.number().min(0, { message: 'Stock cannot be negative' }),
});

export const createProductSchema = z.object({
  name: z.string().min(2, {
    message: 'Бүтээгдэхүүний нэр хамгийн багадаа 2 тэмдэгт байх ёстой.',
  }),
  categoryId: z.string({
    required_error: 'Ангилал сонгоно уу.',
  }),

  description: z.string().max(100).optional(),
  price: z.number().min(0, {
    message: 'Үнэ нь эерэг тоо байх ёстой.',
  }),
  discount: z.number().min(0).max(100).optional(),
  sizes: z.array(productSizeSchema).min(1, {
    message: 'Дор хаяж нэг хэмжээ сонгоно уу.',
  }),
  images: z.array(z.string()).min(1, {
    message: 'Дор хаяж нэг зураг оруулна уу.',
  }),
  colors: z.array(z.string()).optional(),
});

export const deleteProductSchema = z.object({
  id: z.string(),
});

export const updateProductSchema = createProductSchema.extend({
  id: z.string(),
});

export type ProductFormValues = z.infer<typeof createProductSchema>;
export type ProductSize = z.infer<typeof productSizeSchema>;
