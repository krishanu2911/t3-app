import { generatePagination } from "@/utils/utilFunc";

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

  return (
    <div className=" flex justify-start gap-4 w-full">
      <button onClick={prevHandler}>{"<"}</button>
      {generatePagination(currentPage, totalPage).map((number, index) => {
        if (number === "...") {
          return <h1 key={index}>{number}</h1>;
        }
        return (
          <button key={index} className={`${currentPage === number? " text-black font-medium" : "text-[#ACACAC]"}`} onClick={() => pageClickHandler(number)}>{number}</button>
        );
      })}
      <button onClick={nextHandler}>{">"}</button>
    </div>
  );
};

export default PageIndicator;
