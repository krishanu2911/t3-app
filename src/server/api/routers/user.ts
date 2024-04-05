import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { generateOtp } from "@/utils/utilFunc";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";


export const userRouter = createTRPCRouter({
  signUp: publicProcedure.input(
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }),
  ).mutation(async ({ctx , input}) => {
    const newOtp = generateOtp();
    const hashedPassword = await bcrypt.hash(input.password, 10);
    // console.log("")

    try {
     const newUser = await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        otp: newOtp,
      }
    })
    
    return {
      message: "send otp for verification",
      user: newUser,
      otp: newUser.otp
    } 
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new TRPCError({
          code:"CONFLICT",
          message:"An account with this email already exists."
        })
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error durring signup."
        })
      }
    }
    
    

  }),
});
