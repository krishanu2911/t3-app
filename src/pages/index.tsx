import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

export default function Home() {
  const signUpUserMutation = api.user.signUp.useMutation();

  const signInUser = async (name: string , email: string, password: string) => {
    try {
      const data = await signUpUserMutation.mutateAsync({name , email , password});
      console.log(data)

    } catch (error) {
      console.log(error)
      // TO DO: Save the error message and show client
    }
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
      </Head>
      <main className=" w-screen border-2 border-red-500 min-h-screen">
        
      </main>
    </>
  );
}
