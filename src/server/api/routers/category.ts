import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return categories;
  }),

  getWorkBranch: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.workBranch.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { name: 'asc' },
    });
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.category.findUnique({
      where: { id: input },
      include: {
        products: true,
      },
    });
  }),
});
