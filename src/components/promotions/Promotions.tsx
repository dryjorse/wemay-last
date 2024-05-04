import { FC, useEffect, useState } from "react";
// @ts-ignore
import useMatchMedia from "use-match-media";
import geoIcon from "../../assets/images/icons/geo.svg";
import filterIcon from "../../assets/images/icons/filter.svg";
import PromotionCard from "../promotionCard/PromotionCard";
import arrowLeftIcon from "../../assets/images/icons/green-arrow-left.svg";
import arrowRightIcon from "../../assets/images/icons/green-arrow-right.svg";
import Filter from "../filter/Filter";
import Pagination from "../ui/pagination/Pagination";
import Map from "../map/Map";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import Loading from "../ui/loading/Loading";

const typesSlug: { [key: string]: string } = {
  Скидка: "Discount",
  Бонус: "Bonus",
  Сертификат: "Certificate",
  Розыгрыш: "Draw",
};

interface IPromotions {
  isPagination?: boolean;
  title?: string;
  style?: string;
  companyName?: string;
  categoryName?: string;
  type?: string;
  discount?: string;
}

const Promotions: FC<IPromotions> = ({
  isPagination = false,
  title = "Все акции",
  style = "",
  companyName = "",
  categoryName = "",
  type = "",
  discount = "",
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isTabler: boolean = useMatchMedia("(max-width: 768px)");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["promotions"],
    queryFn: () =>
      promotionService.getAll({
        page,
        page_size: limit,
        company__name: companyName,
        category__title: categoryName,
        type: typesSlug[type],
        ...(+discount ? { discount } : {}),
      }),
    select: ({ data }) => data,
  });

  useEffect(() => {
    refetch();
  }, [page, limit, categoryName, companyName, type, discount]);

  const showMore = () => {
    setLimit((prev) => prev * 2);
  };

  return (
    <>
      <Map isOpen={isMapOpen} close={() => setIsMapOpen(false)} />
      <section className={clsx("container py-80", style)}>
        <div className="flex justify-between items-end tb:items-center">
          <h2>{title}</h2>
          <div className="flex gap-[16px] items-center">
            <button
              onClick={() => setIsMapOpen(true)}
              className="box-secondary rounded-[8px] border-[#DDDDDF] py-10 px-[12px] flex gap-[8px] items-center text-[#333333] tb:p-0 tb:w-[48px] tb:h-[43px] tb:justify-center"
            >
              <img src={geoIcon} alt="geo" />
              <span className="tb:hidden">Акции на карте</span>
            </button>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="box-secondary rounded-[8px] border-[#DDDDDF] py-10 px-[12px] flex gap-[8px] items-center text-[#333333] tb:p-0 tb:w-[48px] tb:h-[43px] tb:justify-center"
            >
              <span className="tb:hidden">Фильтр и сортировка</span>
              <img src={filterIcon} alt="filter" />
            </button>
          </div>
        </div>
        <div className="relative mt-40 mb-80 grid grid-cols-2 justify-between gap-x-[20px] gap-y-[80px] lt:grid-cols-1 lt:justify-center stb:gap-y-[40px]">
          {isLoading ? (
            <Loading />
          ) : !data?.results.length ? (
            <div className="absolute top-0 left-0 right-0 bottom-0 text-center">
              <span>Не найдено акций</span>
            </div>
          ) : (
            data?.results?.map((promotion) => (
              <PromotionCard key={promotion.id} {...promotion} />
            ))
          )}
        </div>
        {page * limit < (data?.count || 0) && (
          <button onClick={showMore} className="btn block mx-auto">
            Показать ещё
          </button>
        )}
        {isPagination && (
          <Pagination
            page={page}
            count={data?.count || 0}
            limit={limit}
            setPage={setPage}
            pagesViewLimit={isTabler ? 4 : 5}
            reactWhenNumber={1}
            leftBtnIcon={arrowLeftIcon}
            rightBtnIcon={arrowRightIcon}
            wrapperStyle="mt-20 gap-[28px] justify-center tb:gap-[18px]"
            paginationStyle="gap-[8px]"
            navBtnsStyle="disabled:opacity-50 hover:brightness-50"
            pageBtnStyle="block rounded-[24px] w-[56px] h-[56px] text-center trans-def"
            activePageBtnStyle="bg-green text-white"
            nearestPageBtnStyle="bg-gray"
          />
        )}
      </section>
      <Filter isOpen={isFilterOpen} close={() => setIsFilterOpen(false)} />
    </>
  );
};

export default Promotions;
