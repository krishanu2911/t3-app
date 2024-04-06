import Head from "next/head";
import RootLayout from "@/components/layout/rootLayout";
import ProtectedRoute from "@/components/protectedRoute";
import Category from "@/components/category/Category";

export default function Home() {

  return (
    <ProtectedRoute>
      <RootLayout>
        <>
          <Head>
            <title>Create T3 App</title>
          </Head>
          <div className=" w-full min-h-screen flex justify-center py-10">
            <div className=" md:w-[40%] w-[80%] ">
              <Category />
            </div>
          </div>
        </>
      </RootLayout>
    </ProtectedRoute>
  );
}
