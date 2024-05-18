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
   <Link to={`/promotion${link}`} className="flex flex-col gap-[24px] blt:flex-row">
  <div
    style={{ backgroundImage: `url(${image})` }}
    className="rounded-[24px] h-[200px] flex justify-between items-end bg-no-repeat bg-cover bg-center text-white 
      smb:flex-[0_0_140px] smb:h-[100px] 
      amb:flex-[0_0_160px] amb:h-[120px]
      bmb:flex-[0_0_180px] bmb:h-[140px]
      stb:flex-[0_0_200px] stb:h-[160px]
      tb:flex-[0_0_300px] tb:h-[180px]
      lt:flex-[0_0_350px] lt:h-[200px]
      blt:flex-[0_0_414px] blt:h-[200px]"
  >
    <span className="rounded-[0px_24px_0px_24px] py-[12px] pl-[12px] pr-[33px] bg-[linear-gradient(90deg,#2F80ED_0%,rgba(47,128,237,0)_100%)] font-bold text-sm
      smb:text-xs
      amb:text-sm
      bmb:text-sm
      stb:text-base
      tb:text-lg
      lt:text-lg
      blt:text-lg">
      -{discountPercentage}%
    </span>
    <button className="rounded-[24px_0px_24px_0px] py-[15px] px-[24px] flex gap-[8px] items-center bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_96.11%)] font-medium text-sm
      smb:text-xs smb:py-[8px] smb:px-[16px]
      amb:text-sm amb:py-[10px] amb:px-[18px]
      bmb:text-sm bmb:py-[12px] bmb:px-[20px]
      stb:text-base stb:py-[14px] stb:px-[22px]
      tb:text-lg tb:py-[15px] tb:px-[24px]
      lt:text-lg lt:py-[15px] lt:px-[24px]
      blt:text-lg blt:py-[15px] blt:px-[24px]">
      <img src={likeIcon} alt="like" />
      <span>{likes}</span>
    </button>
  </div>
  <div className="flex-auto flex flex-col">
    <h3 className="text-grey font-semibold text-base
      smb:text-xs
      amb:text-sm
      bmb:text-sm
      stb:text-base
      tb:text-lg
      lt:text-lg
      blt:text-lg">
      {name}
    </h3>
    <div className="mt-[16px] mb-auto flex gap-[12px] text-[20px] font-bold
      smb:text-xs
      amb:text-sm
      bmb:text-sm
      stb:text-base
      tb:text-lg
      lt:text-lg
      blt:text-lg">
      <span className="text-[rgba(130,130,130,1)] line-through">
        от {initPrice} сом
      </span>
      <span>от {price} сом</span>
    </div>
    <button
      onClick={deleteFunc}
      className="box-secondary py-[14px] px-[47px] border-[2px] w-fit self-end text-green font-bold text-base
        smb:text-xs smb:py-[8px] smb:px-[20px]
        amb:text-sm amb:py-[10px] amb:px-[25px]
        bmb:text-sm bmb:py-[12px] bmb:px-[30px]
        stb:text-base stb:py-[14px] stb:px-[35px]
        tb:text-lg tb:py-[14px] tb:px-[40px]
        lt:text-lg lt:py-[14px] lt:px-[47px]
        blt:text-lg blt:py-[14px] blt:px-[47px]">
      Удалить
    </button>
  </div>
</Link>

  );
};

export default PromotionCatdTwo;
