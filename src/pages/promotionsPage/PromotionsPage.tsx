import React, { FC } from "react";
import Promotions from "../../components/promotions/Promotions";
import Slider from "../../components/promotionPage/sliderPromotion/Slider";
import Companies from "../../components/promotionPage/companiesPromotion/Companies";
import { useCompanies } from "../../hooks/useCompanies";
import { useQuery } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import { useSelector } from "react-redux";
const PromotionsPage: FC = () => {
  // Using custom hook for companies
  const { data: companiesData, isLoading: isLoadingCompanies } = useCompanies();
const { categories} = useSelector((state: RootState) => state.filter);
console.log(categories);

  // Using useQuery for promotions data
  const { data: promotionsData, isLoading: isLoadingPromotions } = useQuery({
    queryKey: ["promotions"],
    queryFn: () => promotionService.getAll(),
    select: ({ data }) => data,
  });
  

  return (
    <div>
      <Slider data={promotionsData?.results} isLoading={isLoadingPromotions} />
      <Companies data={companiesData?.results} isLoading={isLoadingCompanies} />
      <Promotions isPagination={true} />
    </div>
  );
};

export default PromotionsPage;
