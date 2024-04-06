import { create } from "zustand";

interface userInterface {
  id: number;
  email: string;
  name?: string;
}

interface UserAuthStoreInterface {
  userEmail: string | null;
  backendOtp: string | null;
  userLogged: string | null;
  setUserLogged: (userId: string) => void;
  setBackendOtpEmail: (otp: string, email: string) => void;
}

export const useAuthStore = create<UserAuthStoreInterface>((set, get) => ({
  userEmail: null,
  backendOtp: null,
  userLogged: null,
  setUserLogged: (userId: string) => {
    set((state) => ({
      ...state,
      userLogged: userId,
    }));
  },
  setBackendOtpEmail: (otp: string, email: string) => {
    set((state) => ({
      ...state,
      backendOtp: otp,
      userEmail: email,
    }));
  },
}));
