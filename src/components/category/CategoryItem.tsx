import Image from "next/image";
import { CategoryItemInterface } from "./ItemsSection";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useAuthStore } from "@/store/authStore";

interface Props {
  data: CategoryItemInterface;
}

const CategoryItem: React.FC<Props> = ({ data }) => {
  const userId = useAuthStore((state) => Number(state.userLogged));
  const [selected, setSelected] = useState<boolean>(data.isSelected);
  const toggleSelectedState = () => setSelected((prev) => !prev);

  const addItemMutation = api.category.addCategoryToUser.useMutation();
  const removeItemMutation = api.category.removeCategoryFromUser.useMutation();

  useEffect(() => {
    const timer = setTimeout( () => {
      try {
        if (selected) {
           addItemMutation.mutate({ userId, categoryId: data.id });
        } else {
           removeItemMutation.mutate({ userId, categoryId: data.id });
        }
      } catch (error) {
        console.log(error);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [selected]);

  return (
    <>
      <div className=" flex justify-start items-center gap-2">
        {selected ? (
          <div
            onClick={toggleSelectedState}
            className=" w-6 h-6 flex items-center justify-center rounded-md bg-black cursor-pointer"
          >
            <Image
              src="/AwhiteTick.png"
              alt="tick mark"
              width={14}
              height={10}
            />
          </div>
        ) : (
          <div
            onClick={toggleSelectedState}
            className=" w-6 h-6 rounded-md bg-[#CCCCCC] cursor-pointer"
          ></div>
        )}
        <h1 className=" text-base">{data.name}</h1>
      </div>
    </>
  );
};

export default CategoryItem;
