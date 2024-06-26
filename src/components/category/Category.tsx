import { useAuthStore } from "@/store/authStore";
import { api } from "@/utils/api";
import { useState } from "react";
import LoadingItem from "./LoadingItem";
import ItemsSection from "./ItemsSection";
import PageIndicator from "./PageIndicator";

const Category = () => {
  const userId = useAuthStore((state) => Number(state.userLogged));

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading } = api.category.getPaginatedCategories.useQuery({
    userId,
    pageSize: 6,
    page: currentPage,
  });

  const prevHandler = () => {
    if (currentPage < 1) {
      setCurrentPage((prev) => --prev);
    }
  };

  const nextHandler = () => {
    if (data?.totalPages && currentPage < data?.totalPages) {
      setCurrentPage((prev) => ++prev);
    }
  };

  const pageClickHandler = (pgNo: number) => {
    setCurrentPage(pgNo);
  };

  return (
    <div className="w-full  border border-[#C1C1C1] rounded-2xl md:gap-8 gap-4 md:p-10 p-4 flex flex-col">
      <h1 className=" md:text-3xl text-xl font-semibold text-center">
        Please mark your interests!
      </h1>
      <h1 className=" md:text-base text-sm text-center">
        We will keep you notified.
      </h1>

      <div className=" flex flex-col items-start gap-7">
        <h1 className=" font-medium md:text-xl text-base">
          My Save interests!
        </h1>
        {isLoading ? (
          <LoadingItem />
        ) : (
          <ItemsSection data={data?.items ?? []} />
        )}
        <PageIndicator
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          pageClickHandler={pageClickHandler}
          totalPage={data?.totalPages ?? 0}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Category;
