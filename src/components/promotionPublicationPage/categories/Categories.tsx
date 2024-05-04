import { Dispatch, FC } from "react";
import checkedIcon from "../../../assets/images/icons/checked.svg";
import checkedWrapperIcon from "../../../assets/images/icons/checked-wrapper.svg";
import Select from "../../select/Select";
import Accordeon from "../../ui/accordeon/Accordeon";
import { useQuery } from "@tanstack/react-query";
import categoryService from "../../../services/categoryService";

interface ICategoriesProps {
  categories: number[];
  setCategories: Dispatch<React.SetStateAction<number[]>>;
}

const Categories: FC<ICategoriesProps> = ({ categories, setCategories }) => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    select: ({ data }) => data,
  });

  const handleCategory = (id: number) => {
    // categories.includes(category)
    //   ? setCategories((prev) => prev.filter((cat) => cat !== category))
    //   : setCategories((prev) => [...prev, category]);

    categories.includes(id) ? setCategories([]) : setCategories([id]);
  };

  return (
    <div>
      <h3 className="mb-[8px] title-3">Выберите категорию</h3>
      <Select className="max-w-[508px]">
        <div className="py-[17px] px-[24px] bg-white">
          {data?.results?.map((category) => (
            <div key={category.title} className="mt-20 flex gap-[8px]">
              <label
                htmlFor={`category-${category.title}-filter`}
                className="relative border border-[#6C6C6C] rounded-[4px] mt-[5px] w-[16px] h-[16px] flex justify-center items-center trans-def cursor-pointer has-[:checked]:border-0 has-[:checked]:bg-green"
              >
                <input
                  id={`category-${category.title}-filter`}
                  type="checkbox"
                  className="peer hidden"
                  checked={categories.includes(category.id)}
                  onChange={() => handleCategory(category.id)}
                  form="publicate-promotion-form"
                />
                <img
                  src={checkedIcon}
                  alt="checked"
                  className="absolute opacity-0 trans-def bg-white peer-checked:opacity-100"
                />
                <img
                  src={checkedWrapperIcon}
                  alt="checked"
                  className="absolute top-0 left-0 opacity-0 trans-def peer-checked:opacity-100"
                />
              </label>
              <div className="flex gap-[8px] items-center font-mulish">
                <div
                  style={{ maskImage: `url(${category.icon})` }}
                  className="w-[16px] h-[16px] bg-[#4F4F4F] opacity-50"
                ></div>
                <span>{category.title}</span>
              </div>
              {/* <Accordeon
                style="flex-auto"
                bodyStyle="pl-[26px]"
                button={
                  <div className="flex gap-[8px] items-center font-mulish">
                    <div
                      style={{ maskImage: `url(${category.icon})` }}
                      className="w-[16px] h-[16px] bg-[#4F4F4F] opacity-50"
                    ></div>
                    <span>{category.name}</span>
                  </div>
                }
              >
                {category.subCategories.map((subCategory) => (
              <Checkbox
                style="mt-20"
                key={subCategory.name}
                name={subCategory.name}
                checked={categories.includes(category.name)}
                onChange={() => handleCategory(category.name)}
              />
            ))}
              </Accordeon> */}
            </div>
          ))}
        </div>
      </Select>
    </div>
  );
};

export default Categories;
