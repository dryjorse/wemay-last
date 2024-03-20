import { FC, MouseEvent } from "react";
import { IPromotionCard } from "../../types/types";
import likeIcon from "../../assets/images/icons/like.svg";
import { Link } from "react-router-dom";

interface IPromotionCardTwoProps extends IPromotionCard {
  onClickDelete: () => void;
}

const PromotionCatdTwo: FC<IPromotionCardTwoProps> = ({
  image,
  discountPercentage,
  likes,
  name,
  initPrice,
  price,
  link,
  onClickDelete,
}) => {
  const deleteFunc = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickDelete();
  };

  return (
    <Link to={`/promotion${link}`} className="flex gap-[24px]">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="rounded-[24px] flex-[0_0_414px] h-[200px] flex justify-between items-end bg-no-repeat bg-cover bg-center text-white"
      >
        <span className="rounded-[0px_24px_0px_24px] py-[12px] pl-[12px] pr-[33px] bg-[linear-gradient(90deg,#2F80ED_0%,rgba(47,128,237,0)_100%)] font-bold">
          -{discountPercentage}%
        </span>
        <button className="rounded-[24px_0px_24px_0px] py-[15px] px-[24px] flex gap-[8px] items-center bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_96.11%)] font-medium">
          <img src={likeIcon} alt="like" />
          <span>{likes}</span>
        </button>
      </div>
      <div className="flex-auto flex flex-col">
        <h3 className="text-grey font-semibold">{name}</h3>
        <div className="mt-[16px] mb-auto flex gap-[12px] text-[20px] font-bold">
          <span className="text-[rgba(130,130,130,1)] line-through">
            от {initPrice} сом
          </span>
          <span>от {price} сом</span>
        </div>
        <button
          onClick={deleteFunc}
          className="box-secondary py-[14px] px-[47px] border-[2px] w-fit self-end text-green font-bold"
        >
          Удалить
        </button>
      </div>
    </Link>
  );
};

export default PromotionCatdTwo;
