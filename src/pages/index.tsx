import Head from "next/head";
import RootLayout from "@/components/layout/rootLayout";
import ProtectedRoute from "@/components/protectedRoute";
import Category from "@/components/category/Category";
import LogoutBtn from "@/components/auth/logoutBtn";

export default function Home() {

  return (
    <ProtectedRoute>
      <RootLayout>
        <>
          <Head>
            <title>Create T3 App</title>
          </Head>
          <div className=" relative w-full min-h-screen flex justify-center py-10">
            <div className=" md:w-[40%] w-[80%] ">
              <Category />
            </div>
            <div className=" absolute top-4 right-4">
              <LogoutBtn />
            </div>
          </div>
        </>
      </RootLayout>
    </ProtectedRoute>
  );
}
