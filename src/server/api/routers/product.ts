import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  createProductSchema,
  getProductsSchema,
  updateProductSchema,
  deleteProductSchema,
} from '@/lib/schemas';
import { TRPCError } from '@trpc/server';

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(getProductsSchema)
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.product.findMany({
        take: input.limit + 1,
        where: input.categoryId ? { categoryId: input.categoryId } : undefined,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          category: true,
          sizes: true,
        },
        orderBy: {
          createdAt: input.orderby,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  getByCategory: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findMany({
        where: { categoryId: input },
        include: {
          category: true,
          sizes: true,
        },
      });
    }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.product.findUnique({
      where: { id: input },
      include: {
        sizes: true,
        category: true,
      },
    });
  }),

  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { categoryId, colors, sizes, ...rest } = input;

      const category = await ctx.db.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Category with ID ${categoryId} not found`,
        });
      }

      return ctx.db.product.create({
        data: {
          ...rest,
          colors: colors || [],
          category: {
            connect: { id: categoryId },
          },
          sizes: {
            create: sizes.map((size) => ({
              size: size.size,
              stock: size.stock,
            })),
          },
        },
        include: {
          sizes: true,
        },
      });
    }),

  update: publicProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, categoryId, colors, sizes, ...rest } = input;

      const product = await ctx.db.product.findUnique({
        where: { id },
        include: {
          sizes: true,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with ID ${id} not found`,
        });
      }

      if (categoryId) {
        const category = await ctx.db.category.findUnique({
          where: { id: categoryId },
        });

        if (!category) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Category with ID ${categoryId} not found`,
          });
        }
      }

      // Delete existing sizes that are not in the new sizes array
      await ctx.db.productSize.deleteMany({
        where: {
          productId: id,
          size: {
            notIn: sizes.map((s) => s.size),
          },
        },
      });

      // Update or create sizes
      const sizePromises = sizes.map((size) =>
        ctx.db.productSize.upsert({
          where: {
            productId_size: {
              productId: id,
              size: size.size,
            },
          },
          create: {
            size: size.size,
            stock: size.stock,
            productId: id,
          },
          update: {
            stock: size.stock,
          },
        }),
      );

      await Promise.all(sizePromises);

      return ctx.db.product.update({
        where: { id },
        data: {
          ...rest,
          colors: colors || [],
          ...(categoryId && {
            category: {
              connect: { id: categoryId },
            },
          }),
        },
        include: {
          sizes: true,
        },
      });
    }),

  delete: publicProcedure
    .input(deleteProductSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input.id },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with ID ${input.id} not found`,
        });
      }

      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),
});
