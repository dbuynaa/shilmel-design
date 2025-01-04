import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const colorSchema = z.object({
  id: z.string(),
  value: z.string(),
});

const customItemSchema = z.object({
  workBranchId: z.string(),
  sizes: z.record(z.string(), z.number()),
  colors: z.array(colorSchema),
  material: z.enum(['standard', 'premium']),
  logoPosition: z.string().optional(),
  notes: z.string().optional(),
});

export const cartRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const cart = await ctx.db.cart.findFirst({
      where: { userId: ctx.session.user.id },
      include: {
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
        color: z.object({
          name: z.string(),
          primary: z.string(),
          secondary: z.string().optional(),
        }),
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

      // Create cart item with custom order details
      return await ctx.db.cartItem.create({
        data: {
          cartId: cart.id,
          quantity: Object.values(input.sizes).reduce((a, b) => a + b, 0),
          customization: {
            sizes: input.sizes,
            colors: input.colors,
            material: input.material,
            logoPosition: input.logoPosition,
            notes: input.notes,
          },
          size: [...new Set(Object.keys(input.sizes).map((size) => size))].join(
            ',',
          ), // Convert sizes object to string
        },
      });
    }),
});
