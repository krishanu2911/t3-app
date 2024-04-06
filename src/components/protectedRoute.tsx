import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

interface Props {
  children: ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, setUserLogged } = useAuthStore((state) => ({
    user: state.userLogged,
    setUserLogged: state.setUserLogged,
  }));
  const router = useRouter();
  const navigateToLogin = async () => {
    await router.replace("/auth/login");
  }

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (!user) {
      navigateToLogin();
    } else {
      setUserLogged(user);
    }
  }, [router, setUserLogged]);

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
