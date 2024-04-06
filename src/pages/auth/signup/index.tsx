import SignUpComp from "@/components/auth/signupComp";
import RootLayout from "@/components/layout/rootLayout";

const Index = () => {
  return (
    <RootLayout>
      <div className=" w-full min-h-screen flex justify-center py-10">
        <div className=" md:w-[40%] w-[80%] ">
            <SignUpComp />
        </div>
      </div>
    </RootLayout>
  );
};

export default Index;
