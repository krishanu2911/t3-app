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
  getPaginatedCategories: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        page: z.number().default(1),
        pageSize: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, page, pageSize } = input;
      const skip = (page - 1) * pageSize;

      const totalCount = await ctx.db.category.count();
      const totalPages = Math.ceil(totalCount / pageSize);
      const totalSelected = await ctx.db.category.count({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      });

      const selectedToFetch = Math.min(pageSize, totalSelected - skip);
      let categoriesWithSelectionStatus: {
        id: number;
        name: string;
        isSelected: boolean;
      }[] = [];

      if (selectedToFetch > 0) {
        const selectedCategories = await ctx.db.category.findMany({
          where: {
            users: {
              some: {
                id: userId,
              },
            },
          },
          skip,
          take: selectedToFetch,
        });

        categoriesWithSelectionStatus = selectedCategories.map((category) => ({
          ...category,
          isSelected: true,
        }));
      }

      if (categoriesWithSelectionStatus.length < pageSize) {
        const unselectedSkip = Math.max(0, skip - totalSelected);

        const unselectedCategories = await ctx.db.category.findMany({
          where: {
            NOT: {
              users: {
                some: {
                  id: userId,
                },
              },
            },
          },
          skip: unselectedSkip,
          take: pageSize - categoriesWithSelectionStatus.length,
        });

        const unselectedWithStatus = unselectedCategories.map((category) => ({
          ...category,
          isSelected: false,
        }));

        categoriesWithSelectionStatus = [
          ...categoriesWithSelectionStatus,
          ...unselectedWithStatus,
        ];
      }

      return{ items: categoriesWithSelectionStatus, totalPages: totalPages};
    }),
});
