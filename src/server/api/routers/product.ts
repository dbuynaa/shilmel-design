import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.prisma.product.findMany({
        take: input.limit + 1,
        where: input.categoryId ? { categoryId: input.categoryId } : undefined,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      let nextCursor: typeof input.cursor | undefined = undefined
      if (items.length > input.limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }

      return {
        items,
        nextCursor,
      }
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.product.findUnique({
        where: { id: input },
        include: {
          category: true,
        },
      })
    }),
})

