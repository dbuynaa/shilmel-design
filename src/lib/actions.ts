'use server';

import { signIn } from '@/server/auth';
import { AuthError } from 'next-auth';
import { api } from '@/trpc/server';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';
import { createProductSchema, updateProductSchema } from './schemas';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: true,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function deleteProduct(id: string | undefined) {
  if (!id) {
    throw new Error('Product not found.');
  }
  try {
    await api.product.delete({ id: id });
    revalidatePath('/admin/products');
    return {
      message: 'Product deleted successfully.',
      success: true,
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      return {
        message: error.message,
        success: false,
      };
    }
    return {
      message: 'Failed to delete product.',
      success: false,
    };
  }
}

export async function updateProduct(
  id: string,
  data: z.infer<typeof createProductSchema>,
) {
  try {
    await api.product.update({ id, ...data });
    revalidatePath('/admin/products');
    return {
      message: 'Product updated successfully.',
      success: true,
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      return {
        message: error.message,
        success: false,
      };
    }
    return {
      message: 'Failed to update product.',
      success: false,
    };
  }
}

export async function createProductAction(
  data: z.infer<typeof createProductSchema>,
) {
  try {
    await api.product.create(data);
    revalidatePath('/admin/product');
    return {
      message: `Product created successfully.`,
      success: true,
    };
  } catch (error) {
    if (error instanceof TRPCError)
      return {
        message: error.message,
        success: false,
      };

    return {
      message: 'Database Error: Failed to create/update product.',
      success: false,
    };
  }
}

export async function updateProductAction(
  data: z.infer<typeof updateProductSchema>,
) {
  try {
    await api.product.update({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      discount: data.discount,
      sizes: data.sizes,
      images: data.images,
      categoryId: data.categoryId,
    });

    revalidatePath('/admin/products');
    return {
      message: 'Product updated successfully.',
      success: true,
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      return {
        message: error.message,
        success: false,
      };
    }
    return {
      message: 'Failed to update product.',
      success: false,
    };
  }
}

// export async function orderStatusAction(orderId: string, status: OrderStatus) {
//   try {
//     await api.order.updateStatus({ id: orderId, status });
//     revalidatePath('/admin/order');
//     return { success: true, message: 'Order status updated successfully.' };
//   } catch (error) {
//     console.error('Failed to update order status:', error);
//     return { success: false, message: 'Failed to update order status.' };
//   }
// }
