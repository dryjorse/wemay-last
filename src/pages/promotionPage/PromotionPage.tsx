import { FC } from "react";
import { useParams } from "react-router-dom";
import { textLimit } from "../../data/data";
import Promotion from "../../components/promotionPage/promotion/Promotion";
import Reviews from "../../components/promotionPage/reviews/Reviews";
import PopularPromotions from "../../components/promotionPage/popularPromotions/PopularPromotions";
import { useQuery } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import { useClearCategory } from "../../hooks/useClearCategory";

const PromotionPage: FC = () => {
  useClearCategory();
  const { id } = useParams();
  const { data: promotion } = useQuery({
    queryKey: ["promotions", id],
    queryFn: () => promotionService.getById(+(id || 0)),
    select: ({ data }) => data,
  });

  if (!promotion) return <div></div>;

  return (
    <>
      <div className="container-two pt-[52px] flex gap-[12px] items-center text-[14px]">
        <span>Главная</span>{" "}
        {promotion.category_name && (
          <>
            <span>{">"}</span> <span>{promotion.category_name}</span>
          </>
        )}
        <span>{">"}</span> <span>{textLimit(promotion?.title, 21)}</span>
      </div>
      <Promotion {...promotion} />
      <Reviews promotionId={+(id || 0)} />
      <PopularPromotions promotionId={+(id || 0)} />
    </>
  );
};

export default PromotionPage;
