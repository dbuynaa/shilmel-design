import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

const colorSchema = z.object({
  name: z.string(),
  value: z.string(),
});

const customOrderSchema = z.object({
  workBranchId: z.string(),
  sizes: z.record(z.string(), z.number()),
  colors: z.array(colorSchema),
  material: z.enum(['standard', 'premium']),
  logoPosition: z.string().optional(),
  logoFile: z.string().optional(),
  notes: z.string().optional(),
});

export const customOrderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(customOrderSchema)
    .mutation(async ({ ctx, input }) => {
      // Calculate total amount based on sizes
      const totalQuantity = Object.values(input.sizes).reduce(
        (a, b) => a + b,
        0,
      );
      const basePrice = 50000; // Base price per item
      const totalAmount = totalQuantity * basePrice;

      // Generate order number
      const orderNumber = `CO${Date.now()}`;

      return ctx.db.customOrder.create({
        data: {
          orderNumber,
          totalAmount,
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.customOrder.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        workBranch: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.customOrder.findUnique({
        where: { id: input },
        include: {
          workBranch: true,
          orderedBy: true,
        },
      });

      if (!order || order.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return order;
    }),
});
