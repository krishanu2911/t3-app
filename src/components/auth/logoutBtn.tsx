import { useRouter } from "next/router";

const LogoutBtn = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    localStorage.removeItem("userId");
    await router.push("/auth/login");
  };
  return (
    <button onClick={logoutHandler} className=" text-base font-medium">
      Logout
    </button>
  );
};

export default LogoutBtn;
