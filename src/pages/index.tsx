import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

export default function Home() {
  const signUpUserMutation = api.user.signUp.useMutation();
  const loginMutation = api.user.login.useMutation();

  const signInUser = async (name: string , email: string, password: string) => {
    try {
      const data = await signUpUserMutation.mutateAsync({name , email , password});
      console.log(data)

    } catch (error) {
      console.log(error)
      // TO DO: Save the error message and show client
    }
  }

  const loginInUser = async () => {
    try {
      const data = await loginMutation.mutateAsync({email: "test1@gmail.com" , password: "test1@1234"});
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
      </Head>
      <main className=" w-screen border-2 border-red-500 min-h-screen">
        <button onClick={() => signInUser("test1","test1@gmail.com", "test1@1234")}>SignUp</button>
        <button onClick={loginInUser}>Login</button>
      </main>
    </>
  );
}
