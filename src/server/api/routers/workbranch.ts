import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const workBranchRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.workBranch.findMany({
      where: { parentId: null }, // Only get parent branches
      include: {
        children: true, // Include sub-branches
      },
      orderBy: { name: 'asc' },
    });
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.workBranch.findUnique({
      where: { id: input },
      include: {
        children: true,
        parent: true,
      },
    });
  }),

  getSubBranches: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.workBranch.findMany({
        where: { parentId: input },
        orderBy: { name: 'asc' },
      });
    }),
});
