import { FC } from "react";
import companyIcon from "../../assets/images/term/shoro.svg";
import Promotions from "../../components/promotions/Promotions";

const CompanyPage: FC = () => {
  return (
    <>
      <section className="container pt-80 text-[rgba(51,51,51,1)]">
        <h1 className="title">Компания Шоро</h1>
        <div className="my-[64px] flex justify-between items-center">
          <img src={companyIcon} alt="company-icon" />
          <p className="text-18 leading-[23px]">
            «Шоро» — кыргызска компания, которая занимается производством
            традиционных кыргызских напитков, а также газированных и
            негазированных напитков. По состоянию на 2018 год «Шоро» входил в
            число 50 крупнейших киргизских компаний. К 2019 году «Шоро» занимал
            30 % кыргызского рынка безалкогольных напитков.{" "}
          </p>
        </div>
      </section>
      <section>
        <Promotions style="pt-0" />
      </section>
    </>
  );
};

export default CompanyPage;
