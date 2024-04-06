import LoginComp from "@/components/auth/loginComp";
import RootLayout from "@/components/layout/rootLayout";

const Index = () => {
  return (
    <RootLayout>
      <div className=" w-full min-h-screen flex justify-center py-10">
        <div className=" md:w-[40%] w-[80%] ">
            <LoginComp />
        </div>
      </div>
    </RootLayout>
  );
};

export default Index