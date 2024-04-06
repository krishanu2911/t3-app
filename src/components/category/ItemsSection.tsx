import CategoryItem from "./CategoryItem";

export interface CategoryItemInterface {
  id: number;
  name: string;
  isSelected: boolean;
}

interface Props {
  data: CategoryItemInterface[];
}

const ItemsSection: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <CategoryItem key={item.id} data={item} />
      ))}
    </>
  );
};

export default ItemsSection;
