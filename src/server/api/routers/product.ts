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
        },
        orderBy: {
          createdAt: 'desc',
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

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.product.findUnique({
      where: { id: input },
      include: {
        category: true,
      },
    });
  }),

  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { categoryId, ...rest } = input;

      console.log('categoryId ==', categoryId);

      // Check if category exists
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
          category: {
            connect: { id: categoryId },
          },
        },
      });
    }),

  update: publicProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, categoryId, ...rest } = input;

      const product = await ctx.db.product.findUnique({
        where: { id },
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

      return ctx.db.product.update({
        where: { id },
        data: {
          ...rest,
          ...(categoryId && {
            category: {
              connect: { id: categoryId },
            },
          }),
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
