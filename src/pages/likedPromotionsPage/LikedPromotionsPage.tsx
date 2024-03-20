import { FC } from "react";
import { promotionsData } from "../../data/data";
import PromotionCatdTwo from "../../components/promotionCardTwo/PromotionCatdTwo";
import heartIcon from "../../assets/images/icons/heart.svg";

const LikedPromotionsPage: FC = () => {
  const onClickDelete = () => {};

  return (
    <div className="container pt-80 pb-[120px] max-w-[848px]">
      <div className="pl-[9px] flex gap-[16px] items-center">
        <img src={heartIcon} alt="star-green" />
        <h2>Любимые акции {promotionsData.length}</h2>
      </div>
      <div className="mt-[32px] [&>:not(:last-child)]:mb-40">
        {promotionsData.map((promotion) => (
          <PromotionCatdTwo
            key={promotion.name}
            onClickDelete={onClickDelete}
            {...promotion}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedPromotionsPage;
