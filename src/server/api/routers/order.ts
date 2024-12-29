import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        shippingInfo: z.object({
          address: z.string(),
          city: z.string(),
          phone: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      const totalAmount = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      );

      const order = await ctx.db.order.create({
        data: {
          userId: ctx.session.user.id,
          totalAmount,
          shippingInfo: input.shippingInfo,
          items: {
            create: cart.items.map((item) => ({
              quantity: item.quantity,
              size: item.size,
              color: item.color ? item.color : "",
              price: item.product.price,
              product: {
                connect: { id: item.productId },
              },
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Clear the cart after order creation
      await ctx.db.cart.delete({
        where: { id: cart.id },
      });

      return order;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.order.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.order.findFirst({
        where: {
          id: input,
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
    }),
});
