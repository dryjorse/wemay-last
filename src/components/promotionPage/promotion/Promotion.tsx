import { FC, useEffect, useState } from "react";
import { IPromotion } from "../../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { customMarkerIcon } from "../../../data/data";
import Modal from "../../ui/modal/Modal";
import likeIcon from "../../../assets/images/icons/like.svg";
import likedIcon from "../../../assets/images/icons/liked.svg";
import likeGreenIcon from "../../../assets/images/icons/like-green.svg";
import timeIcon from "../../../assets/images/icons/time.svg";
import telIcon from "../../../assets/images/icons/tel.svg";
// import instagramIcon from "../../../assets/images/icons/instagram.svg";
// import facebookIcon from "../../../assets/images/icons/facebook.svg";
// import whatsappIcon from "../../../assets/images/icons/whatsapp.svg";
// import websiteIcon from "../../../assets/images/icons/website.svg";
import crossIcon from "../../../assets/images/icons/cross.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import mapService from "../../../services/mapService";
import promotionService from "../../../services/promotionService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { setErrorNotification } from "../../../store/slices/notificationSlice";
import clsx from "clsx";
import { useProfile } from "../../../hooks/useProfile";
import "swiper/css";
import companiesService from "../../../services/companiesService";

const daysFormat = {
  monday: "Пн",
  tuesday: "Вт",
  wednesday: "Ср",
  thursday: "Чт",
  friday: "Пт",
  saturday: "Сб",
  sunday: "Вс",
};

const getPercentFromNumber = (firstNumber: number, secondNumber: number) =>
  Math.floor((firstNumber / secondNumber) * 100);

const Promotion: FC<IPromotion> = ({
  id,
  title,
  images,
  old_price,
  new_price,
  likes,
  company_work_schedule,
  end_date,
  description,
  address,
  company,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [restTime, setRestTime] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const { data: profile } = useProfile();

  const { data: marker } = useQuery({
    queryKey: ["marker", id],
    queryFn: () => mapService.getByName(address),
    select: ({ data }) => data,
    enabled: !!address,
  });

  const { data: contacts } = useQuery({
    queryKey: ["contacts", company],
    queryFn: () => companiesService.getContacts(company),
    select: ({ data }) => data,
  });

  const [localLikes, setLocalLikes] = useState(likes);

  const { mutate: like } = useMutation({
    mutationFn: promotionService.like,
    onSuccess: () => {
      queryClient.prefetchQuery({ queryKey: ["liked-promotions"] });
    },
  });

  useEffect(() => {
    setCurrentImage(images[0]?.image);
  }, [images]);

  useEffect(() => {
    const date = end_date.split(" ")[0];
    const hours = end_date.split(" ")[1];
    const hour = +hours.split(":")[0].slice(1);
    const minutes = +hours.split(":")[1];
    const seconds = +hours.split(":")[2];

    let timer = setTimeout(function tick() {
      const restDate = new Date(date);
      restDate.setHours(hour);
      restDate.setMinutes(minutes);
      restDate.setSeconds(seconds);

      const restTime = +restDate - +new Date();

      if (restTime <= 0) {
        navigate("/", { replace: true });
        dispatch(setErrorNotification("Вышло время текущей акции"));
      }

      const restDays = Math.floor(restTime / 1000 / 60 / 60 / 24);
      const restHours = Math.floor(restTime / 1000 / 60 / 60) % 24;
      const restMinutes = Math.floor(restTime / 1000 / 60) % 60;
      const restSeconds = Math.floor(restTime / 1000) % 60;

      setRestTime(
        `${restDays}д ${restHours}ч ${
          (restMinutes + "").length === 1 ? "0" : ""
        }${restMinutes}:${
          (restSeconds + "").length === 1 ? "0" : ""
        }${restSeconds}`
      );
      timer = setTimeout(tick, 1000);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onClickLike = () => {
    like(id);
    setLocalLikes((prev) =>
      prev.includes(profile?.id!)
        ? prev.filter((id) => id !== profile?.id)
        : [...prev, profile?.id!]
    );
  };

  const addressCoordinates = marker?.[0]
    ? [marker[0]?.lat, marker[0].lon]
    : null;

  const workSchedule: any = company_work_schedule
    ? Object.keys(company_work_schedule).reduce((prev, day) => {
        const currDay = day.split("_")[0];
        const currFromOrTo = day.split("_")[1];
        // @ts-ignore
        const currTime = company_work_schedule[day]
          ?.split(":")
          .slice(0, 2)
          .join(":");

        return {
          ...prev,
          //@ts-ignore
          [currDay]: { ...(prev?.[currDay] || {}), [currFromOrTo]: currTime },
        };
      }, {})
    : null;

  // console.log(
  //   workSchedule,
  //   Object.keys(workSchedule)?.reduce((prev, day) => {
  //     let currTime: string;
  //     let prevArray = Object.keys(prev)

  //     return prevArray.some((time) => {
  //       let isExist: boolean;

  //       isExist = (prev[time].start === workSchedule[day].start &&
  //         prev[time].end === workSchedule[day].end) ||
  //       !workSchedule[day].start

  //       if(isExist) currTime = time

  //       return isExist
  //     })
  //       ? prevArray[prevArray.findIndex((key) => key === day)]
  //       : { ...prev, [day]: workSchedule[day] };
  //   }, {})
  // );

  return (
    <section className="container-two pt-[44px] pb-80">
      <h1 className="title">{title}</h1>
      <div className="mt-[32px] flex justify-between gap-[32px] items-start blt:flex-col blt:items-stretch">
        <div className="flex-[0_0_740px] blt:flex-auto">
          <div
            style={{ backgroundImage: `url(${currentImage})` }}
            className="rounded-[24px] w-full h-[454px] flex items-end justify-between bg-cover bg-center bg-no-repeat text-white overflow-hidden trans-def stb:h-[200px]"
          >
            {old_price ? (
              <b className="rounded-[0_16px_0_16px] p-[12px] bg-[linear-gradient(90deg,#2F80ED_0%,rgba(47,128,237,0)_100%)] text-[24px] leading-[24px]">
                -{getPercentFromNumber(new_price, old_price)}%
              </b>
            ) : (
              <div></div>
            )}
            <div className="rounded-[24px,0px,24px,0px] py-[12px] px-[24px] bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_96.11%)] flex gap-[8px] items-center">
              <img
                alt="like"
                src={localLikes.includes(profile?.id!) ? likedIcon : likeIcon}
              />
              <span>{localLikes?.length || 0}</span>
            </div>
          </div>
          <div className="mt-[24px] flex justify-between items-center tb:flex-col tb:items-start tb:gap-[24px]">
            <Swiper
              spaceBetween={21}
              slidesPerView="auto"
              className="m-0 max-w-[595px]"
            >
              {images.map((image, key) => (
                <SwiperSlide
                  key={key}
                  className="w-[135px] h-[80px] rounded-[16px] overflow-hidden"
                >
                  <button
                    className="w-full h-full"
                    onClick={() => setCurrentImage(image.image)}
                  >
                    <img
                      src={image.image}
                      alt={`promotion ${image} ${key + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
            <div></div>
            <div className="font-mulish">
              <div className="flex gap-[6px] items-center text-14 leading-[19px] text-[#4F4F4F]">
                <img src={timeIcon} alt="clock" />
                <span>До конца акции</span>
              </div>
              <span className="text-grey">{restTime}</span>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] p-[32px] bg-gray flex-[0_1_508px] font-mulish">
          {old_price && (
            <span className="relative text-[24px]">
              от {old_price} сом{" "}
              <div className="absolute top-[calc(50%+1px)] left-[-3px] w-full h-[1px] bg-black"></div>
            </span>
          )}
          <b
            className={clsx("text-[24px]", {
              "ml-[15px]": old_price,
            })}
          >
            от {new_price} сом
          </b>
          {old_price && (
            <span className="block mt-[8px] mb-[24px] text-18 leading-[23px] text-[#4F4F4F]">
              Экономия {old_price - new_price} сом
            </span>
          )}
          <div
            className={clsx(
              "flex justify-between items-center gap-[8px] blt:justify-start",
              { "mt-[24px]": !old_price }
            )}
          >
            <button
              onClick={() => setIsContactsOpen(true)}
              className="btn flex-[0_1_630px] text-center"
            >
              Связаться
            </button>
            <button
              onClick={onClickLike}
              disabled={!profile?.id}
              className="box-secondary border-green rounded-[100px] py-[7.5px] px-[24px] text-center text-14 leading-[19px] text-green disabled:pointer-events-none"
            >
              <img
                src={
                  localLikes.includes(profile?.id!) ? likedIcon : likeGreenIcon
                }
                alt="like-green"
                className="mb-[2px]"
              />
              <span>{localLikes?.length || 0}</span>
            </button>
          </div>
          <span className="my-[24px] block text-18">Контактная информация</span>
          <span className="text-grey">Телефон</span>
          {contacts?.results.map((tel) => (
            <a
              key={tel.id}
              href={`tel:${tel.value}`}
              className="mt-[8px] block text-18 font-bold leading-[23px] font-montserrat"
            >
              {tel.title}
            </a>
          ))}
          <div className="my-[21px] max-w-[255px] w-full h-[1px] bg-[#D7D7D7]"></div>
          <span className="text-grey">Часы работы</span>
          {workSchedule &&
            Object.keys(workSchedule).map(
              (key) =>
                workSchedule[key].start &&
                workSchedule[key].end && (
                  <span
                    key={key}
                    className="mt-[8px] block text-18 text-grey leading-[24px]"
                  >
                    {
                      // @ts-ignore
                      daysFormat[key]
                    }
                    : {workSchedule[key].start} - {workSchedule[key].end}
                  </span>
                )
            )}
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
          <h2 className="mb-40">Связаться</h2>
          {contacts?.results.map((tel) => (
            <a
              href={`tel:${tel.value}`}
              className="btn my-10 flex justify-center gap-[8px] items-center w-[520px]"
            >
              <img src={telIcon} alt="tel" />
              <span>{tel.title}</span>
            </a>
          ))}
          {/* <div className="flex gap-[16px] justify-center items-center">
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
          </div> */}
        </Modal>
      </div>
      <h2 className="mt-80 mb-[32px]">Описание</h2>
      <p>{description}</p>
      {marker?.[0] && (
        <>
          <h2 className="mt-80 mb-[32px]">Адреса</h2>
          <span className="text-[18px] leading-[23px]">Адрес</span>
          <span className="mt-[8px] mb-[32px] block text-[18px] leading-[23px]">
            {address}
          </span>
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
        </>
      )}
    </section>
  );
};

export default Promotion;
