import { FC } from "react";
import starGreenIcon from "../../assets/images/icons/star-green.svg";
import { promotionsData } from "../../data/data";
import PromotionCatdTwo from "../../components/promotionCardTwo/PromotionCatdTwo";

const FavouritesPage: FC = () => {
  const onClickDelete = () => {};

  return (
    <div className="container pt-80 pb-[120px] max-w-[848px]">
      <div className="pl-[9px] flex gap-[16px] items-center">
        <img src={starGreenIcon} alt="star-green" />
        <h2>Избранное {promotionsData.length}</h2>
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

export default FavouritesPage;
