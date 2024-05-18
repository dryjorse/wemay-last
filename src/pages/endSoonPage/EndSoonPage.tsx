import { FC } from "react";
import Promotions from "../../components/promotions/Promotions";

const EndSoonPage: FC = () => {
  return (
    <Promotions
      isPagination
      title="Скоро заканчивается"
      promotionsType="endSoon"
    />
  );
};

export default EndSoonPage;
