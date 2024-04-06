interface Props {
  currentPage: number;
  setPageNumber: () => void;
  totalPage: number;
}

const PageIndicator: React.FC<Props> = ({
  currentPage,
  setPageNumber,
  totalPage,
}) => {
  return <div></div>;
};

export default PageIndicator;
