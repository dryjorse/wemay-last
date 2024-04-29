import { FC } from "react";
import { IPromotionCard } from "../../types/types";
import { Link } from "react-router-dom";
import starIcon from "../../assets/images/icons/star.svg";
import likeIcon from "../../assets/images/icons/like.svg";

interface IPromotionCardProps extends IPromotionCard {
  disabled?: boolean;
}

const PromotionCard: FC<IPromotionCardProps> = ({
  id,
  title,
  old_price,
  new_price,
  discount,
  likes,
  image,
  disabled = false,
}) => {
  return (
    <Link
      to={`/promotion/${id}`}
      className="block max-w-[540px] lt:max-w-[768px]"
      onClick={(e) => disabled && e.preventDefault()}
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="rounded-[24px] pt-[16px] w-full h-[260px] bg-cover bg-no-repeat bg-center text-white lt:h-[370px] tb:h-[300px] stb:h-[260px] smb:h-[200px]"
      >
        <div className="h-full flex flex-col justify-between">
          <button className="pr-[16px] self-end">
            <img src={starIcon} alt="star" />
          </button>
          <div className="flex justify-between">
            <span className="rounded-[0_24px_0_24px] p-[12px] bg-[linear-gradient(90deg,#2F80ED_0%,rgba(47,128,237,0)_100%)] text-[24px] font-bold">
              -{discount}%
            </span>
            <div className="rounded-[24px_0_24px_0] py-[12px] px-[24px] bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_96.11%)] flex gap-[8px] items-center">
              <img src={likeIcon} alt="like" />
              <span className="font-medium">{likes}</span>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-[24px] mb-[16px] font-semibold stb:font-normal">{title}</h3>
      <div className="flex gap-[8px] items-center text-[20px] leading-[24px] stb:text-18">
        <span className="relative font-medium text-[#828282]">
          от {old_price} сом{" "}
          <div className="absolute top-[calc(50%)] left-0 right-0 h-[1px] bg-[#828282]"></div>
        </span>
        <b>от {new_price} сом</b>
      </div>
    </Link>
  );
};

export default PromotionCard;
