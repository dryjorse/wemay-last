import { FC } from "react";
import { ICompany } from "../../types/types";
import { Link } from "react-router-dom";

const CompanyCard: FC<ICompany> = ({
  link,
  logo,
  promotionsCount,
  maxDiscounts,
}) => {
  return (
    <Link
      to={link}
      className="block rounded-[24px] border border-gray px-[12px] pb-40 w-[205px] h-[280px] trans-def hover:shadow-[0px_4px_13px_0px_#00000026]"
    >
      <div className="mb-[8px]">
        <img src={logo} alt="company-logo" />
      </div>
      <span className="mb-[16px] block text-[20px] leading-[24px] font-medium text-[#828282]">
        Акций: <b className="text-black">{promotionsCount}</b>
      </span>
      <span className="mb-[16px] block text-[20px] leading-[24px] font-medium text-[#828282]">
        Скидки: до <b className="text-black">{maxDiscounts}%</b>
      </span>
    </Link>
  );
};

export default CompanyCard;
