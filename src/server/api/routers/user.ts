import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { generateOtp } from "@/utils/utilFunc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure.input(
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }),
  ).mutation(async ({ctx , input}) => {
    const newOtp = generateOtp();

    
    

  }),
});
