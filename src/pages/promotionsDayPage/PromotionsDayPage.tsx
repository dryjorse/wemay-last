import { FC } from "react";
import Promotions from "../../components/promotions/Promotions";

const PromotionsDayPage: FC = () => {
  return <Promotions isPagination title="Акции дня" promotionsType="daily" />;
};

export default PromotionsDayPage;
