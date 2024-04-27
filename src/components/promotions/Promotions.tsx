import { FC, useState } from "react";
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

interface IPromotions {
  isPagination?: boolean;
  style?: string;
}

const Promotions: FC<IPromotions> = ({ isPagination = false, style = "" }) => {
  const {data} = useQuery({queryKey: ['promotions'], queryFn: () => promotionService.getAll(), select: ({data}) => data})
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isTabler: boolean = useMatchMedia("(max-width: 768px)");

  return (
    <>
      <Map isOpen={isMapOpen} close={() => setIsMapOpen(false)} />
      <section className={clsx("container py-80", style)}>
        <div className="flex justify-between items-end tb:items-center">
          <h2>Все акции</h2>
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
        <div className="mt-40 mb-80 grid grid-cols-2 justify-between gap-x-[20px] gap-y-[80px] lt:grid-cols-1 lt:justify-center stb:gap-y-[40px]">
          {data?.results?.map((promotion, key) => (
            <PromotionCard key={key} {...promotion} />
          ))}
        </div>
        <button className="btn block mx-auto ">Показать ещё</button>
        {isPagination && (
          <Pagination
            page={page}
            count={30}
            limit={6}
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
