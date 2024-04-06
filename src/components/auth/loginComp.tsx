import { emailRegex } from "@/constants/regex";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginComp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginMutation = api.user.login.useMutation();
  const router = useRouter();
  const loginHandler = async () => {
    if (!emailRegex.test(email) || password === "") {
      toast.error("Please enter valid email or password.");
      return;
    }
    try {
      const { message, success, userId } = await loginMutation.mutateAsync({
        email,
        password,
      });

      if (success && userId) {
        toast.success(message);
        localStorage.setItem("userId", `${userId}`);
        await router.push("/");
      } else {
        toast.error("login error");
        return;
      }
    } catch (error) {
      //   toast.error(`${error}`);
      console.log(error);
    }
  };
  return (
    <div className="w-full  border border-[#C1C1C1] rounded-2xl md:gap-8 gap-4 md:p-10 p-4 flex flex-col">
      <h1 className=" md:text-3xl text-xl font-semibold text-center">Login</h1>
      <div className="flex flex-col items-center gap-3">
        <h1 className=" text-center text-2xl font-medium">
          Welcome back to ECOMMERCE
        </h1>
        <h1 className=" text-center text-base">
          The next gen business marketplace
        </h1>
      </div>

      <div className=" w-full flex flex-col items-start gap-2">
        <h1 className=" text-base">Email</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter"
          className=" border border-[#C1C1C1] rounded-md p-4 w-full placeholder:text-[#848484] text-[#848484]"
        />
      </div>
      <div className=" w-full flex flex-col items-start gap-2">
        <h1 className=" text-base">Password</h1>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Enter"
          className=" border border-[#C1C1C1] rounded-md p-4 w-full placeholder:text-[#848484] text-[#848484]"
        />
      </div>
      <button
        onClick={loginHandler}
        className=" w-full rounded-md bg-black py-4 text-center text-base font-semibold text-white"
      >
        LOGIN
      </button>
      <div className=" h-1 w-full border-t border-t-[#C1C1C1]" />
      <h1 className=" text-base text-center">
        Don’t have an Account?{" "}
        <Link href="/auth/signup" className=" font-medium">
          SIGN UP
        </Link>
      </h1>
    </div>
  );
};

export default LoginComp;
