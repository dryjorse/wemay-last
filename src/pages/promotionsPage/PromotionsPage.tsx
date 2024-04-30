import { FC } from "react";
import Promotions from "../../components/promotions/Promotions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const PromotionsPage: FC = () => {
  const { categories, promotionTypes, discountPercentage } = useSelector(
    (state: RootState) => state.filter
  );

  return (
    <Promotions
      isPagination={true}
      categoryName={categories[0]}
      type={promotionTypes[0]}
      discount={discountPercentage + ""}
    />
  );
};

export default PromotionsPage;
