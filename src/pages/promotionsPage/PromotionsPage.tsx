import { FC, useEffect, useState } from "react";
import Promotions from "../../components/promotions/Promotions";
import Slider from "../../components/promotionPage/sliderPromotion/Slider";
import Companies from "../../components/promotionPage/companiesPromotion/Companies";
import { useCompanies } from "../../hooks/useCompanies";
import { useQuery } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const PromotionsPage: FC = () => {
  // Using custom hook for companies
  const { data: companiesData, isLoading: isLoadingCompanies } = useCompanies();
  const { categories } = useSelector((state: RootState) => state.filter);
  
  const [category, setCategory] = useState(null);

  // Using useQuery for promotions data
  const { data: promotionsData, isLoading: isLoadingPromotions } = useQuery({
    queryKey: ["promotions"],
    queryFn: () => promotionService.getAll(),
    select: ({ data }) => data,
  });

  // Set category based on selected categories
  useEffect(() => {
    const matchingCategory = companiesData?.results.find(company =>
      company.category === categories[0]
    );
    if (matchingCategory) {
      setCategory(matchingCategory);
    }
  }, [categories, companiesData]);

  // Filter companies based on selected categories
  const filteredCompanies = companiesData?.results.filter(company =>
    categories.includes(company.category)
  );

  // Get the filtered company names
  const filteredCompanyNames = filteredCompanies?.map(company => company.name);

  // Filter promotions based on filtered company names
  const filteredPromotions = promotionsData?.results.filter(promotion =>
    filteredCompanyNames.includes(promotion.company_name)
  );

  return (
    <div>
      <Slider data={filteredPromotions || []} isLoading={isLoadingPromotions} />
      <Companies data={filteredCompanies} isLoading={isLoadingCompanies} />
      <Promotions isPagination={true} data={filteredPromotions || []} />
    </div>
  );
};

export default PromotionsPage;
