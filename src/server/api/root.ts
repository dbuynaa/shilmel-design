import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import {
  cartRouter,
  categoryRouter,
  orderRouter,
  productRouter,
  workBranchRouter, // Add this line
  customOrderRouter, // Add this line
} from './routers';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  order: orderRouter,
  cart: cartRouter,
  category: categoryRouter,
  workBranch: workBranchRouter, // Add this line
  customOrder: customOrderRouter, // Add this line
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
