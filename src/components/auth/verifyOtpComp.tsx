import Link from "next/link";
import OtpInput from "./otpInput";
import { useAuthStore } from "@/store/authStore";
import { maskEmail } from "@/utils/utilFunc";
import { api } from "@/utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const VerifyOtpComp = () => {
  const [userOtp, setUserOtp] = useState<string>("");
  const router = useRouter();
  const verifyotpMutation = api.user.verifyOtp.useMutation();
  const { email, backendOtp } = useAuthStore((state) => ({
    email: state.userEmail,
    backendOtp: state.backendOtp,
  }));

  const verifyOtpHandler = async () => {
    if (userOtp.length < 6) {
      toast.error("Please enter Valid OTP.");
      return;
    }
    try {
      if (email && userOtp.length >= 6) {
        const { message, userId } = await verifyotpMutation.mutateAsync({
          clientOtp: userOtp,
          email,
        });

        localStorage.setItem("userId", `${userId}`);
        toast.success(message);
        router.push("/");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <div className="w-full border border-[#C1C1C1] rounded-2xl md:gap-8 gap-4 md:p-10 p-4 flex flex-col">
      <h1 className=" md:text-3xl text-xl font-semibold text-center">
        Verify your email
      </h1>
      <h1 className=" text-center text-base">
        Enter the 8 digit code you have received on <br />
        <span className=" font-medium">
          {maskEmail(email || "test@gmail.com")}
        </span>
      </h1>
      <OtpInput length={6} onOTPComplete={(otp: string) => setUserOtp(otp)} />
      <h1 className=" text-sm text-red-400">
        Test Mode: Backend Otp {backendOtp}
      </h1>

      <button
        onClick={verifyOtpHandler}
        className="w-full rounded-md bg-black py-4 text-center text-base font-semibold text-white"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyOtpComp;
