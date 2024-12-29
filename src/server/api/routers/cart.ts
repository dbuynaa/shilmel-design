import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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

      return ctx.db.cartItem.upsert({
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

  removeItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.cartItem.delete({
        where: { id: input },
      });
    }),
});
