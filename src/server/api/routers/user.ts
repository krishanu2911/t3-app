import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { generateOtp } from "@/utils/utilFunc";
import { z } from "zod";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existedUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existedUser && existedUser.isVerified) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Already created account with this email.",
        });
      }

      const newOtp = generateOtp();
      const hashedPassword = await bcrypt.hash(input.password, 10);

      try {
        if (existedUser && !existedUser.isVerified) {
          const updateUser = await ctx.db.user.update({
            where: { email: input.email },
            data: {
              name: input.name,
              otp: newOtp,
              password: hashedPassword,
            },
          });

          return {
            message: "Resent otp.",
            otp: updateUser.otp,
          };
        }

        const newUser = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
            otp: newOtp,
          },
        });

        return {
          message: "OTP sent for verification.",
          otp: newUser.otp,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred during signup.",
        });
      }
    }),
  verifyOtp: publicProcedure
    .input(z.object({ email: z.string().email(), clientOtp: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: { email: input.email },
        });

        if (!user || user.otp !== input.clientOtp) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Invalid email or otp",
          });
        }

        await ctx.db.user.update({
          where: {
            email: input.email,
          },
          data: {
            otp: null,
            isVerified: true,
          },
        });

        return {
          message: "otp verified!!!",
          userId: user.id,
        };
      } catch (error) {
        throw error;
      }
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userDetails = await ctx.db.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (!userDetails) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Invalid email or passwor.d",
          });
        }

        if (!userDetails.isVerified) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Account not verified please sign up again.",
          });
        }

        const passwordCorrectFlag = await bcrypt.compare(
          input.password,
          userDetails.password
        );

        if (passwordCorrectFlag) {
          return {
            message: "login successfull!!!",
            success: true,
            userId: userDetails.id,
          };
        } else {
          return {
            message: "incorrect password",
            success: false,
          };
        }
      } catch (error) {
        throw error;
      }
    }),
});
