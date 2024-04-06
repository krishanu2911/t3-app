import { generatePagination } from "@/utils/utilFunc";
import { useState } from "react";

interface Props {
  prevHandler: () => void;
  nextHandler: () => void;
  pageClickHandler: (pgNo: number) => void;
  totalPage: number;
  currentPage: number;
}

const PageIndicator: React.FC<Props> = ({
  prevHandler,
  nextHandler,
  pageClickHandler,
  totalPage,
  currentPage,
}) => {
  const [numberPanel, setNumberPanel] = useState<(string | number)[]>([
    1,
    2,
    3,
    "...",
  ]);

  return (
    <div className=" flex justify-start gap-4 w-full">
      <button onClick={prevHandler}>{"<"}</button>
      {generatePagination(currentPage, totalPage).map((number, index) => {
        if (number === "...") {
          return <h1>{number}</h1>;
        }
        return (
          <button className={`${currentPage === number? " text-black font-medium" : "text-[#ACACAC]"}`} onClick={() => pageClickHandler(number)}>{number}</button>
        );
      })}
      <button onClick={nextHandler}>{">"}</button>
    </div>
  );
};

export default PageIndicator;
