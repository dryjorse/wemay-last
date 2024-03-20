import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { promotionsSliderData } from "../../../data/data";
import arrowLeftIcon from "../../../assets/images/icons/arrow-left.svg";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

const Slider: FC = () => {
  return (
    <section className="container main mt-[32px] max-w-[1377px]">
      <div className="rounded-[48px] py-[125px] h-[508px] flex items-center bg-gray lt:py-40 lt:h-auto">
        <button className="pl-[24px] h-full flex-shrink-0 slider-prev tb:pl-0">
          <img src={arrowLeftIcon} alt="arrow-left" />
        </button>
        <Swiper
          loop
          grabCursor
          speed={500}
          slidesPerView={1}
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: ".main .slider-prev",
            nextEl: ".main .slider-next",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mx-[62px] w-full lt:mx-0"
        >
          {promotionsSliderData.map((promotion) => (
            <SwiperSlide
              key={promotion.name}
              className="flex justify-between items-center lt:flex-col"
            >
              <div className="flex-[0_1_490px] lt:px-20 lt:flex-auto lt:max-w-[595px] ">
                <h3 className="text-[48px] font-bold tb:text-[24px]">
                  {promotion.name}
                </h3>
                <span className="mt-20 mb-40 block text-[20px] font-medium tb:mt-[16px] tb:text-18">
                  Покумай прямо сейчас!
                </span>
                <button className="box-secondary border-[2px] py-[14px] px-[49px] text-18 text-center tb:w-full">
                  Подробнее
                </button>
              </div>
              <div className="bmb:mt-[152px] tb:max-w-[328px]">
                <img src={promotion.image} alt="promotion-image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="pr-[24px] h-full flex-shrink-0 slider-next tb:pr-0">
          <img src={arrowLeftIcon} alt="arrow-left" className="rotate-180" />
        </button>
      </div>
    </section>
  );
};

export default Slider;
