import { FC, useState } from "react";
import { IPromotion } from "../../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { customMarkerIcon } from "../../../data/data";
import Modal from "../../ui/modal/Modal";
import likeIcon from "../../../assets/images/icons/like.svg";
import likeGreenIcon from "../../../assets/images/icons/like-green.svg";
import timeIcon from "../../../assets/images/icons/time.svg";
import telIcon from "../../../assets/images/icons/tel.svg";
import instagramIcon from "../../../assets/images/icons/instagram.svg";
import facebookIcon from "../../../assets/images/icons/facebook.svg";
import whatsappIcon from "../../../assets/images/icons/whatsapp.svg";
import websiteIcon from "../../../assets/images/icons/website.svg";
import crossIcon from "../../../assets/images/icons/cross.svg";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import mapService from "../../../services/mapService";

const Promotion: FC<IPromotion> = ({
  id,
  title,
  image,
  old_price,
  new_price,
  likes,
  contacts,
  workTime,
  discount,
  end_date,
  description,
  address,
}) => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  // const [currentImage, setCurrentImage] = useState(image);
  console.log(workTime)

  const { data: marker } = useQuery({
    queryKey: ["marker", id],
    queryFn: () => mapService.getByName(address),
    select: ({ data }) => data,
  });

  const addressCoordinates = marker?.[0]
    ? [marker[0]?.lat, marker[0].lon]
    : null;

  return (
    <section className="container-two pt-[44px] pb-80">
      <h1 className="title">{title}</h1>
      <div className="mt-[32px] flex justify-between gap-[32px] items-start blt:flex-col blt:items-stretch">
        <div className="flex-[0_0_740px] blt:flex-auto">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="rounded-[24px] w-full h-[454px] flex items-end justify-between bg-cover bg-center bg-no-repeat text-white overflow-hidden trans-def stb:h-[200px]"
          >
            <b className="rounded-[0_16px_0_16px] p-[12px] bg-[linear-gradient(90deg,#2F80ED_0%,rgba(47,128,237,0)_100%)] text-[24px] leading-[24px]">
              -{discount}%
            </b>
            <div className="rounded-[24px,0px,24px,0px] py-[12px] px-[24px] bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_96.11%)] flex gap-[8px] items-center">
              <img src={likeIcon} alt="like" />
              <span>{likes?.length || 0}</span>
            </div>
          </div>
          <div className="mt-[24px] flex justify-between items-center tb:flex-col tb:items-start tb:gap-[24px]">
            {/* <Swiper
              spaceBetween={21}
              slidesPerView="auto"
              className="m-0 max-w-[595px]"
            >
              {images.map((image, key) => (
                <SwiperSlide
                  key={image + key}
                  className="w-[135px] h-[80px] rounded-[16px] overflow-hidden"
                >
                  <button
                    className="w-full h-full"
                    onClick={() => setCurrentImage(image)}
                  >
                    <img
                      src={image}
                      alt={`promotion ${image} ${key + 1}`}
                      className="w-full h-full"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper> */}
            <div></div>
            <div className="font-mulish">
              <div className="flex gap-[6px] items-center text-14 leading-[19px] text-[#4F4F4F]">
                <img src={timeIcon} alt="clock" />
                <span>До конца акции</span>
              </div>
              <span className="text-grey">{end_date}</span>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] p-[32px] bg-gray flex-[0_1_508px] font-mulish">
          <span className="relative text-[24px]">
            от {new_price} сом{" "}
            <div className="absolute top-[calc(50%+1px)] left-[-3px] w-full h-[1px] bg-black"></div>
          </span>
          <b className="ml-[15px] text-[24px]">от {old_price} сом</b>
          <span className="block mt-[8px] mb-[24px] text-18 leading-[23px] text-[#4F4F4F]">
            Экономия {old_price} сом
          </span>
          <div className="flex justify-between items-center gap-[8px] blt:justify-start">
            <button
              onClick={() => setIsContactsOpen(true)}
              className="btn flex-[0_1_630px] text-center"
            >
              Связаться
            </button>
            <button className="box-secondary border-green rounded-[100px] py-[7.5px] px-[24px] text-center text-14 leading-[19px] text-green">
              <img src={likeGreenIcon} alt="like-green" className="mb-[2px]" />
              <span>{likes?.length || 0}</span>
            </button>
          </div>
          <span className="my-[24px] block text-18">Контактная информация</span>
          <span className="text-grey">Телефон</span>
          <a
            key={contacts}
            href={`tel:${contacts}`}
            className="mt-[8px] block text-18 font-bold leading-[23px] font-montserrat"
          >
            {contacts}
          </a>
          {/* {contacts.map((tel) => (
            
          ))} */}
          <div className="my-[21px] max-w-[255px] w-full h-[1px] bg-[#D7D7D7]"></div>
          <span className="text-grey">Часы работы</span>
          <span className="mt-[8px] block text-18 text-grey leading-[24px]">
            {workTime}
          </span>
        </div>
        <Modal
          isOpen={isContactsOpen}
          close={() => setIsContactsOpen(false)}
          modalStyle="z-[60]"
          contentStyle="pt-20 px-40 pb-[32px] relative text-[20px] leading-[24px]"
        >
          <button
            onClick={() => setIsContactsOpen(false)}
            className="absolute top-[-56px] right-0 p-[16px]"
          >
            <img src={crossIcon} alt="cross" />
          </button>
          <h2>Связаться</h2>
          {/* <a
            href={`tel:${contacts[0]}`}
            className="btn my-40 flex justify-center gap-[8px] items-center w-[520px]"
          >
            <img src={telIcon} alt="tel" />
            <span>{contacts[0]}</span>
          </a> */}
          <div className="flex gap-[16px] justify-center items-center">
            <a href="">
              <img src={instagramIcon} alt="instagram" />
            </a>
            <a href="">
              <img src={facebookIcon} alt="facebook" />
            </a>
            <a href="">
              <img src={whatsappIcon} alt="whatsapp" />
            </a>
            <a href="">
              <img src={websiteIcon} alt="web-site" />
            </a>
          </div>
        </Modal>
      </div>

      <h2 className="mt-80 mb-[32px]">Описание</h2>
      <p>{description}</p>
      <h2 className="mt-80 mb-[32px]">Адреса</h2>
      <span className="text-[18px] leading-[23px]">Адрес</span>
      <span className="mt-[8px] mb-[32px] block text-[18px] leading-[23px]">
        {address}
      </span>
      {marker?.[0] && (
        <MapContainer
          // @ts-ignore
          center={addressCoordinates}
          className="rounded-[24px] max-w-[848px] w-full h-[374px]"
          zoom={16}
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            // @ts-ignore
            position={addressCoordinates}
            icon={customMarkerIcon()}
          ></Marker>
        </MapContainer>
      )}
    </section>
  );
};

export default Promotion;
