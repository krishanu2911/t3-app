import Link from "next/link";
import { api } from "@/utils/api";
import { useState } from "react";
import { z } from "zod";
import { emailRegex } from "@/constants/regex";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";

const SignUpComp = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signUpUserMutation = api.user.signUp.useMutation();
  const setBackendOtpEmail = useAuthStore((state) => state.setBackendOtpEmail);

  const signInUser = async (name: string, email: string, password: string) => {
    try {
      const data = await signUpUserMutation.mutateAsync({
        name,
        email,
        password,
      });

      if (data.otp) {
        setBackendOtpEmail(data.otp, email);
        router.push("/auth/signup/verifyotp");
      } else {
        toast.error(`Please re-try!`);
      }
    } catch (error) {
      toast.error(`${error}`);
      // TO DO: Save the error message and show client
    }
  };

  const signHandler = () => {
    if (
      userName !== "" &&
      email !== "" &&
      password !== "" &&
      emailRegex.test(email)
    ) {
      signInUser(userName, email, password);
    } else {
      toast.error("Please fill all the detail properly.");
    }
  };

  return (
    <div className="w-full  border border-[#C1C1C1] rounded-2xl md:gap-8 gap-4 md:p-10 p-4 flex flex-col">
      <h1 className=" md:text-3xl text-xl font-semibold text-center">
        Create your account
      </h1>
      <div className=" w-full flex flex-col items-start gap-2">
        <h1 className=" text-base">Name</h1>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Enter"
          className=" border border-[#C1C1C1] rounded-md p-4 w-full placeholder:text-[#848484] text-[#848484]"
        />
      </div>
      <div className=" w-full flex flex-col items-start gap-2">
        <h1 className=" text-base">Email</h1>
        <input
          value={email}
          onChange={(e) => {
            if (emailRegex.test(e.target.value)) {
              //email error
            }
            setEmail(e.target.value);
          }}
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
        onClick={signHandler}
        className=" w-full rounded-md bg-black py-4 text-center text-base font-semibold text-white"
      >
        Create account
      </button>
      <div className=" h-1 w-full border-t border-t-[#C1C1C1]" />
      <h1 className=" text-base text-center">
        Have a account?{" "}
        <Link href="/auth/login" className=" font-medium">
          LOGIN
        </Link>
      </h1>
    </div>
  );
};

export default SignUpComp;
