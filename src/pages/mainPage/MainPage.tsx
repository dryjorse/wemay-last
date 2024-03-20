import { FC } from "react";
import Slider from "../../components/mainPage/slider/Slider";
import Companies from "../../components/mainPage/companies/Companies";
import Promotions from "../../components/promotions/Promotions";

const MainPage: FC = () => {
  return (
    <>
      <Slider />
      <Companies />
      <Promotions />
    </>
  );
};

export default MainPage;
