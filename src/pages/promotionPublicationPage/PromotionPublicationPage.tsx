import { FC, useState } from "react";
import { promotionsTypeData } from "../../data/data";
import { useForm } from "react-hook-form";
import { IPromotionFields } from "../../types/types";
import Radiobox from "../../components/ui/radiobox/Radiobox";
import Contacts from "../../components/promotionPublicationPage/contacts/Contacts";
import Categories from "../../components/promotionPublicationPage/categories/Categories";
import Input from "../../components/ui/input/Input";
import Schedule from "../../components/promotionPublicationPage/schedule/Schedule";
import clsx from "clsx";
import Addreses from "../../components/promotionPublicationPage/addreses/Addreses";

const PromotionPublicationPage: FC = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useForm<IPromotionFields>({ mode: "all" });
  const [categories, setCategories] = useState<string[]>([]);
  const [isIndicateOldPrice, setIsIndicateOldPrice] = useState(false);
  const [contacts, setContacts] = useState([""]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // watch((value) => console.log(value));

  return (
    <div className="container pt-80 pb-[120px] max-w-[1064px]">
      <h2>Опубликовать акцию</h2>
      <form
        id="publicate-promotion-form"
        onSubmit={(e) => e.preventDefault()}
        className="pl-[16px] *:mt-40"
      >
        <div>
          <h3 className="mb-[8px] title-3">Заголовок</h3>
          <Input
            {...register("title", {
              required: "Заголовок не должен быть пустым!",
            })}
            placeholder="Введите заголовок"
            error={errors.title}
          />
        </div>
        <label
          htmlFor="promotion-publication-image"
          className="box-btn !mt-20 block w-fit text-green"
        >
          Добавить фото
          <input
            {...register("image")}
            id="promotion-publication-image"
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
          />
        </label>
        <div>
          <h3 className="mb-[8px] title-3">Описание</h3>
          <div
            className={clsx("box-input h-[240px] has-[:focus]:border-green", {
              "border-red": errors.description,
            })}
          >
            <textarea
              cols={30}
              rows={9}
              placeholder="Введите описание"
              className="w-full h-full outline-none scroll-small"
              {...register("description", {
                required: "Описание не должен быть пустым!",
              })}
            ></textarea>
          </div>
          <span className="block mt-[5px] text-red">
            {errors.description?.message}
          </span>
        </div>
        <div>
          <h3 className="mb-[8px] title-3">
            Название компании (Не обязательно)
          </h3>
          <Input
            {...register("companyName")}
            placeholder="Введите название компании"
            error={errors.companyName}
          />
        </div>
        <button
          onClick={() => setIsScheduleOpen(true)}
          className="mt-20 box-btn text-green"
        >
          Добавить график работы
        </button>
        <Categories categories={categories} setCategories={setCategories} />
        <div>
          <h3 className="mb-[8px] title-3">Тип акции</h3>
          {promotionsTypeData.map((type) => (
            <Radiobox
              id={type.value}
              key={type.value}
              name="promotion-type"
              className="mt-[16px]"
            >
              <span>{type.name}</span>
            </Radiobox>
          ))}
        </div>
        <div>
          <h3 className="mb-[8px] title-3">Цена</h3>
          <Input
            {...register("price", {
              required: "Цена не должна быть пустым!",
            })}
            error={errors.price}
            type="number"
            placeholder="Напишите цену"
          />
          {isIndicateOldPrice && (
            <Input
              {...register("oldPrice", {
                required: "Цена не должна быть пустым!",
              })}
              error={errors.oldPrice}
              type="number"
              inputClassName="mt-[8px]"
              placeholder="Напишите старую цену"
            />
          )}
          <Radiobox
            isCheckbox
            className="mt-[16px]"
            id="indicate-old-price"
            name="indicate-radio"
            checked={isIndicateOldPrice}
            onChange={() => setIsIndicateOldPrice((prev) => !prev)}
          >
            <span>Указать старую цену (перечеркнуто)</span>
          </Radiobox>
        </div>
        <Contacts contacts={contacts} setContacts={setContacts} />
        <Addreses />
      </form>
      <Schedule
        isOpen={isScheduleOpen}
        close={() => setIsScheduleOpen(false)}
      />
    </div>
  );
};

export default PromotionPublicationPage;
