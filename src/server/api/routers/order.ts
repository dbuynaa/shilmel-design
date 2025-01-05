import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, adminProcedure } from '../trpc';
import { OrderStatus } from '@prisma/client';

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        paymentMethod: z.enum(['card', 'qpay']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Begin transaction
      return await ctx.db.$transaction(async (tx) => {
        const cart = await tx.cart.findFirst({
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
          throw new Error('Cart is empty');
        }

        // Validate product availability and prices
        for (const item of cart.items) {
          const product = await tx.product.findUnique({
            where: { id: item.productId ?? '' },
            include: { sizes: true },
          });

          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }

          const sizeStock = product.sizes.find((s) => s.size === item.size);
          if (!sizeStock || sizeStock.stock < item.quantity) {
            throw new Error(
              `Insufficient stock for ${product.name} in size ${item.size}`,
            );
          }
        }

        const totalAmount = cart.items.reduce(
          (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
          0,
        );

        // Create the order

        const order = await tx.order.create({
          data: {
            totalAmount,
            paymentMethod: input.paymentMethod,
            orderedBy: {
              connect: { id: ctx.session.user.id },
            },
            items: {
              create: cart.items
                .filter((item) => item.product !== null)
                .map((item) => ({
                  quantity: item.quantity,
                  size: item.size,
                  color: item.color ?? {},
                  price: item.product?.price ?? 0,
                  product: {
                    connect: { id: item.productId! },
                  },
                })),
            },
          },
          include: {
            orderedBy: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        });

        // Update product stock
        for (const item of cart.items) {
          await tx.productSize.update({
            where: {
              productId_size: {
                productId: item.productId ?? '',
                size: item.size,
              },
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }

        // Clear the cart
        await tx.cart.delete({
          where: { id: cart.id },
        });

        return order;
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.order.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        orderedBy: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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
          orderedBy: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }),

  // Admin procedures
  getAllOrders: adminProcedure
    .input(
      z.object({
        status: z.nativeEnum(OrderStatus).optional(),
        search: z.string().optional(),
        paymentStatus: z.enum(['ALL', 'PAID', 'UNPAID']).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where = {
        ...(input.status ? { status: input.status as OrderStatus } : {}),
        ...(input.search
          ? {
              OR: [
                { id: { contains: input.search } },
                { user: { name: { contains: input.search } } },
              ],
            }
          : {}),
        ...(input.paymentStatus && input.paymentStatus !== 'ALL'
          ? { paymentStatus: input.paymentStatus }
          : {}),
      };

      const [orders, count] = await Promise.all([
        ctx.db.order.findMany({
          where,
          include: {
            orderedBy: true,
            items: { include: { product: true } },
          },
          orderBy: { createdAt: 'desc' },
        }),
        ctx.db.order.count({ where }),
      ]);

      return {
        orders,
        count,
      };
    }),

  getAllCustomOrders: adminProcedure
    .input(
      z.object({
        status: z.nativeEnum(OrderStatus).optional(),
        search: z.string().optional(),
        paymentStatus: z.enum(['ALL', 'PAID', 'UNPAID']).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where = {
        ...(input.status ? { status: input.status as OrderStatus } : {}),
        ...(input.search
          ? {
              OR: [
                { id: { contains: input.search } },
                { user: { name: { contains: input.search } } },
              ],
            }
          : {}),
        ...(input.paymentStatus && input.paymentStatus !== 'ALL'
          ? { paymentStatus: input.paymentStatus }
          : {}),
      };

      const [orders, count] = await Promise.all([
        ctx.db.customOrder.findMany({
          where,
          include: {
            orderedBy: true,
            sizes: true,
            category: true,
            workBranch: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        ctx.db.customOrder.count({ where }),
      ]);

      return {
        orders,
        count,
      };
    }),

  updatePaymentStatus: protectedProcedure
    .input(
      z.object({
        orderId: z.string(),
        paymentStatus: z.enum(['PENDING', 'PAID', 'FAILED']),
        paymentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.order.update({
        where: { id: input.orderId },
        data: {
          paymentStatus: input.paymentStatus,
          paymentId: input.paymentId,
          status: input.paymentStatus === 'PAID' ? 'PROCESSING' : 'PENDING',
        },
      });
    }),
});
