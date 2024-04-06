import { create } from "zustand";

interface userInterface {
  id: number;
  email: string;
  name?: string;
}

interface UserAuthStoreInterface {
  userEmail: string | null;
  backendOtp: string | null;
  setBackendOtpEmail: (otp: string , email: string) => void;
}

export const useAuthStore = create<UserAuthStoreInterface>((set, get) => ({
  userEmail: null,
  backendOtp: null,
  setBackendOtpEmail: (otp: string, email: string) => {
    set((state) => ({
      ...state,
      backendOtp: otp,
      userEmail: email
    }));
  },
}));


