import { FC } from "react";
import aboutImage from "../../assets/images/about.jpg";
import instagramIcon from "../../assets/images/icons/instagram.svg";
import telegramIcon from "../../assets/images/icons/telegram.svg";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import vkIcon from "../../assets/images/icons/vk.svg";
import facebookIcon from "../../assets/images/icons/facebook.svg";
import { useClearCategory } from "../../hooks/useClearCategory";

const AboutPage: FC = () => {
  useClearCategory();

  return (
    <section>
      <div
        style={{ backgroundImage: `url(${aboutImage})` }}
        className="relative bg-center bg-no-repeat bg-cover h-[324px] flex justify-center items-center   before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,_#000000_100%)]"
      >
        <h1 className="title text-white z-10">О нас</h1>
      </div>
      <div className="container pt-60 pb-[140px] max-w-[950px] text-[rgba(51,51,51,1)] text-18">
        <h2>Наш сервис самый лучший</h2>
        <p className="my-[32px] leading-[23px]">
          Значимость этих проблем настолько очевидна, что сложившаяся структура
          организации требуют от нас анализа дальнейших направлений развития. С
          другой стороны рамки и место обучения кадров позволяет выполнять
          важные задания по разработке новых предложений.
        </p>
        <h2 className="mb-[32px] text-[24px]">Контакты</h2>
        <a href="mailto:sampletext@gmail.com">sampletext@gmail.com</a>
        <h2 className="mt-[32px] mb-[24px] text-[24px]">Соцсети</h2>
        <div className="flex gap-[16px]">
          <a href="">
            <img src={instagramIcon} alt="instagram" />
          </a>
          <a href="">
            <img src={telegramIcon} alt="telegram" />
          </a>
          <a href="">
            <img src={whatsappIcon} alt="whatsapp" />
          </a>
          <a href="">
            <img src={vkIcon} alt="vk" />
          </a>
          <a href="">
            <img src={facebookIcon} alt="facebook" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
