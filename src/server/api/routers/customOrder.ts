import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const customOrderRouter = createTRPCRouter({
  create: protectedProcedure
    // .input(customItemSchema)
    .mutation(async ({ ctx }) => {
      const input = await ctx.db.cart.findFirst({
        where: { userId: ctx.session.user.id },
        include: {
          customCartItems: {
            include: {
              sizes: true,
            },
          },
        },
      });
      if (!input || input.customCartItems.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      const item = input.customCartItems[0]!;

      // Calculate total amount based on sizes
      const totalQuantity = item.sizes.reduce((a, b) => a + b.quantity, 0);
      const basePrice = 50000; // Base price per item
      const totalAmount = totalQuantity * basePrice;

      // Generate order number
      const orderNumber = `CO${Date.now()}`;

      // delete custom cart item
      await ctx.db.customCartItem.delete({
        where: { id: item.id },
      });

      return await ctx.db.customOrder.create({
        data: {
          orderNumber,
          totalAmount,
          sizes: {
            create: item.sizes.map((size) => ({
              size: size.size,
              quantity: size.quantity,
            })),
          },
          notes: item.notes,
          color: item.color || '',
          material: item.material,
          logoFile: item.logoFile,
          logoPosition: item.logoPosition,
          workBranchId: item.workBranchId,
          categoryId: item.categoryId,
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
