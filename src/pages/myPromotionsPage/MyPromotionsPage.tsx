import { FC } from "react";
import { promotionsData } from "../../data/data";
import PromotionCatdTwo from "../../components/promotionCardTwo/PromotionCatdTwo";
import plusIcon from "../../assets/images/icons/plus.svg";
import { Link } from "react-router-dom";

const MyPromotionsPage: FC = () => {
  const onClickDelete = () => {};

  return (
    <div className="container pt-80 pb-[120px] max-w-[848px]">
      <div className="flex justify-between">
        <h2>Мои акции</h2>
        <Link
          to="/promotion-publicate"
          className="btn rounded-[24px] py-[22px] flex gap-[10px] items-center"
        >
          <img src={plusIcon} alt="plus" />
          <span>Новая акция</span>
        </Link>
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

export default MyPromotionsPage;
