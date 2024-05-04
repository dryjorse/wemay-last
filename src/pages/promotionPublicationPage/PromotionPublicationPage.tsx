import { FC, memo, useState } from "react";
import { promotionsTypeData } from "../../data/data";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPromotionFields, ImageFile } from "../../types/types";
import Radiobox from "../../components/ui/radiobox/Radiobox";
import Contacts from "../../components/promotionPublicationPage/contacts/Contacts";
import Categories from "../../components/promotionPublicationPage/categories/Categories";
import Input from "../../components/ui/input/Input";
import Schedule from "../../components/promotionPublicationPage/schedule/Schedule";
import clsx from "clsx";
import Addreses from "../../components/promotionPublicationPage/addreses/Addreses";
import Modal from "../../components/ui/modal/Modal";
import PromotionCard from "../../components/promotionCard/PromotionCard";
import { useMutation } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import Images from "../../components/promotionPublicationPage/images/Images";

const getPercentFromNumber = (firstNumber: number, secondNumber: number) =>
  Math.floor((firstNumber / secondNumber) * 100);

const PromotionPublicationPage: FC = memo(() => {
  const {
    register,
    formState: { errors, isValid },
    setValue,
    watch,
    handleSubmit,
  } = useForm<IPromotionFields>({ mode: "all" });
  const [images, setImages] = useState<ImageFile[] | null>(null);
  const [categories, setCategories] = useState<number[]>([]);
  const [isIndicateOldPrice, setIsIndicateOldPrice] = useState(false);
  const [contacts, setContacts] = useState([""]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { mutate: publicate } = useMutation({
    mutationFn: promotionService.create,
  });

  const setAddress = (value: string) => {
    setValue("address", value);
  };

  const onClickPublicate: SubmitHandler<IPromotionFields> = ({
    title,
    description,
    price,
    oldPrice,
    endDate,
    address,
  }) => {
    const form = new FormData();

    form.append("title", title);
    form.append("description", description);
    form.append("new_price", price + "");
    form.append("end_date", endDate);
    form.append("company", "1");
    images?.forEach((image, key) => {
      form.append(`upload_images[${key}]`, image);
    });

    oldPrice && form.append("old_price", oldPrice + "");
    address && form.append("old_price", address);

    publicate({
      title,
      description,
      company: 1,
      new_price: price,
      end_date: endDate,
      ...(oldPrice ? { old_price: oldPrice } : {}),
      ...(address ? { address } : {}),
    });
  };

  return (
    <>
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
          <Images images={images} setImages={setImages} />
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
          <div>
            <h3 className="mb-[8px] title-3">Дата окончания</h3>
            <Input
              type="date"
              error={errors.endDate}
              {...register("endDate", {
                required: "Дата окончания не должна быть пустым!",
              })}
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
          <Addreses address={watch("address")} setAddress={setAddress} />
        </form>
        <Schedule
          isOpen={isScheduleOpen}
          close={() => setIsScheduleOpen(false)}
        />
        <div className="mt-[87px] flex gap-[16px]">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="box-btn py-[22px] flex-grow text-center"
          >
            Предпросмотр
          </button>
          <button
            disabled={!isValid}
            onClick={handleSubmit(onClickPublicate)}
            className="btn rounded-[24px] py-[22px] flex-grow text-center"
          >
            Опубликовать
          </button>
        </div>
      </div>
      <Modal
        contentStyle="p-20 bg-white w-full max-w-[580px]"
        isOpen={isPreviewOpen}
        close={() => setIsPreviewOpen(false)}
      >
        <PromotionCard
          id={1}
          disabled
          title={watch("title")}
          new_price={watch("price")}
          old_price={watch("oldPrice")}
          image={images?.[0]?.imageUrl || ""}
          discount={
            watch("oldPrice")
              ? getPercentFromNumber(watch("price"), watch("oldPrice"))
              : 0
          }
          likes={[]}
        />
      </Modal>
    </>
  );
});

export default PromotionPublicationPage;
