import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  createCategory: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const count = await ctx.db.category.create({
          data: {
            name: input.name,
          },
        });

        return {
          message: count,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error occured in the server.",
        });
      }
    }),
  addCategoryToUser: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryId } = input;

      return await ctx.db.user.update({
        where: { id: userId },
        data: {
          categories: {
            connect: { id: categoryId },
          },
        },
      });
    }),
  removeCategoryFromUser: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryId } = input;

      return await ctx.db.user.update({
        where: { id: userId },
        data: {
          categories: {
            disconnect: { id: categoryId },
          },
        },
      });
    }),
});
