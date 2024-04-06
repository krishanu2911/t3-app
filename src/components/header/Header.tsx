import Image from "next/image";

const Header = () => {
  return (
    <div className=" flex flex-col w-full">
      <div className=" flex items-center justify-end gap-5 px-10 py-3">
        <h1 className=" text-[#333333] text-xs">Help</h1>
        <h1 className=" text-[#333333] text-xs">Orders and Returns</h1>
        <h1 className=" text-[#333333] text-xs">Hi, John</h1>
      </div>
      <div className=" flex items-center justify-between md:px-10 px-4 md:py-4 py-2">
        <h1 className=" md:text-3xl font-bold text-base">ECOMMERCE</h1>
        <div className=" gap-8 lg:flex hidden">
          <h1 className=" text-base font-semibold">Categories</h1>
          <h1 className=" text-base font-semibold">Sales</h1>
          <h1 className=" text-base font-semibold">Clearance</h1>
          <h1 className=" text-base font-semibold">New stock</h1>
          <h1 className=" text-base font-semibold">Trending</h1>
        </div>
        <div className=" flex items-center gap-8">
          <Image
            src="/Asearch.png"
            alt="search icon"
            className="md:w-5 w-3"
            width={20}
            height={20}
          />
          <Image
            src="/Acart.png"
            alt="search icon"
            className="md:w-5 w-3"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className=" w-full md:py-2 py-1 bg-[#F4F4F4] flex items-center justify-center">
        <div className=" flex items-center justify-center gap-6">
          <Image src="/Aarrow.png" alt="arrow icon" width={6} height={11} />
          <h1 className=" md:text-sm text-xs font-medium">
            Get 10% off on business sign up
          </h1>
          <Image
            src="/Aarrow.png"
            alt="arrow icon"
            width={6}
            height={11}
            className=" rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
