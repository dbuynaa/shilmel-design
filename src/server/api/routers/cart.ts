import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { customItemSchema } from '@/lib/schemas';

export const cartRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const cart = await ctx.db.cart.findFirst({
      where: { userId: ctx.session.user.id },
      include: {
        customCartItems: {
          include: {
            sizes: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return ctx.db.cart.create({
        data: {
          userId: ctx.session.user.id,
        },
        include: {
          customCartItems: {
            include: {
              sizes: true,
            },
          },
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cart;
  }),

  addItem: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        size: z.string(),
        color: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let cart = await ctx.db.cart.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (!cart) {
        cart = await ctx.db.cart.create({
          data: {
            userId: ctx.session.user.id,
          },
        });
      }

      return await ctx.db.cartItem.upsert({
        where: {
          cartId_productId_size_color: {
            cartId: cart.id,
            productId: input.productId,
            size: input.size,
            color: input.color,
          },
        },
        update: {
          quantity: {
            increment: input.quantity,
          },
        },
        create: {
          cartId: cart.id,
          productId: input.productId,
          quantity: input.quantity,
          size: input.size,
          color: input.color,
        },
      });
    }),

  updateItemQuantity: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.cartItem.update({
        where: { id: input.itemId },
        data: { quantity: input.quantity },
      });
    }),

  removeItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.cartItem.delete({
        where: { id: input },
      });
    }),

  addCustomItem: protectedProcedure
    .input(customItemSchema)
    .mutation(async ({ ctx, input }) => {
      // Get or create cart for user
      let cart = await ctx.db.cart.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (!cart) {
        cart = await ctx.db.cart.create({
          data: { userId: ctx.session.user.id },
        });
      }

      const totalAmount = Object.values(input.sizes).reduce((a, b) => a + b, 0);

      // Create cart item with custom order details
      return await ctx.db.customCartItem.create({
        data: {
          cartId: cart.id,
          totalAmount: totalAmount,
          color: input.color,
          material: input.material,
          logoPosition: input.logoPosition,
          notes: input.notes,
          workBranchId: input.workBranchId,
          categoryId: input.categoryId,
          logoFile: input.logo,
          sizes: {
            create: Object.entries(input.sizes).map(([size, quantity]) => ({
              size,
              quantity,
            })),
          }, // Convert sizes object to string
        },
      });
    }),
});
