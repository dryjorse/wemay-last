import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesData, promotionsData, textLimit } from "../../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { RootState, useAppDispatch } from "../../store/store";
import { setCategories } from "../../store/slices/filterSlice";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { IUser } from "../../types/types";
import Burger from "../burger/Burger";
import clsx from "clsx";
import Auth from "../auth/Auth";
import Modal from "../ui/modal/Modal";
import Dropdown from "../ui/dropdown/Dropdown";
import profileService from "../../services/profileService";
import promotionsIcon from "../../assets/images/icons/promotion-ctg.svg";
import finishSoonIcon from "../../assets/images/icons/finish-ctg.svg";
import freeIcon from "../../assets/images/icons/free-ctg.svg";
import burgerIcon from "../../assets/images/icons/burger.svg";
import logoIcon from "../../assets/images/icons/logo.svg";
import searchIcon from "../../assets/images/icons/search.svg";
import avaIcon from "../../assets/images/term/ava.svg";
import personIcon from "../../assets/images/icons/person.svg";
import smallArrowDownIcon from "../../assets/images/icons/small-arrow-down.svg";
import arrowLeftIcon from "../../assets/images/icons/arrow-left.svg";
import profileMenuIcon from "../../assets/images/icons/profile-menu.svg";
import heartIcon from "../../assets/images/icons/heart-black.svg";
import starIcon from "../../assets/images/icons/star-black.svg";
import settingsIcon from "../../assets/images/icons/settings.svg";
import exitIcon from "../../assets/images/icons/exit.svg";
import "swiper/css";

interface IProfileDropdownProps {
  head: ReactNode;
  profile: IUser;
}

const ProfileDropdown: FC<IProfileDropdownProps> = ({ head, profile }) => {
  return (
    <Dropdown
      headClassName="flex gap-[11px] items-center"
      bodyClassName="top-[50px] right-0 rounded-[12px] p-[16px] w-[230px] bg-white font-mulish"
      head={head}
    >
      {profile ? (
        <>
          <img src={profile.image} alt="ava" />
          <h3 className="mt-[12px] mb-[6px] text-[rgba(51,51,51,1)] font-bold">
            {profile.fullname}
          </h3>
          <a
            href={`mailto:${profile.email}`}
            className="text-[12px] leading-[20px]"
          >
            {profile.email}
          </a>
          <Link
            to="/liked-promotions"
            className="mt-40 flex gap-[12px] items-center"
          >
            <img src={heartIcon} alt="heart" className="opacity-60" />
            <span>Любимые акции</span>
            <span>4</span>
          </Link>
          <Link
            to="/favourites"
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img src={starIcon} alt="heart" className="opacity-60" />
            <span>Избранное</span>
            <span>4</span>
          </Link>
          <Link
            to="/profile"
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img src={settingsIcon} alt="heart" />
            <span>Настройки</span>
          </Link>
          <button className="mt-[24px] flex gap-[12px] items-center">
            <img src={exitIcon} alt="heart" />
            <span>Выход</span>
          </button>
        </>
      ) : (
        <div></div>
      )}
    </Dropdown>
  );
};

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.filter.categories);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isSeaarchFocus, setIsSearchFocus] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
    select: ({ data }) => data,
    // enabled: !!localStorage.getItem("token"),
  });

  return (
    <>
      <header className="bg-gray">
        <div className="bg-gray relative z-[51]">
          <div className="py-20 flex gap-[24px] justify-center lt:hidden">
            <button className="box-secondary border-[#9B51E0] py-[8px] px-[12px] flex items-center gap-[8px] text-[#9B51E0] text-14 font-semibold">
              <img src={promotionsIcon} alt="promotion" />
              <span>Акции дня</span>
            </button>
            <button className="box-secondary border-[#B84040] py-[8px] px-[12px] flex items-center gap-[8px] text-[#B84040] text-14 font-semibold">
              <img src={finishSoonIcon} alt="finish-soon" />
              <span>Скоро заканчивается</span>
            </button>
            <button className="box-secondary border-[#00B856] py-[8px] px-[12px] flex items-center gap-[8px] text-[#00B856] text-14 font-semibold">
              <img src={freeIcon} alt="free" />
              <span>Бесплатно</span>
            </button>
          </div>
          <div className="h-[1px] bg-[#DDD] lt:hidden"></div>
          <div className="hidden container pt-[22px] pb-[18px] justify-between items-center lt:flex">
            <button onClick={() => setIsBurgerOpen(true)}>
              <img src={burgerIcon} alt="burger-menu" />
            </button>
            <Link to="/" className="pt-[5px]">
              <img src={logoIcon} alt="logo" />
            </Link>
            {profile ? (
              <ProfileDropdown
                profile={profile}
                head={<img src={profileMenuIcon} alt="three-points" />}
              />
            ) : (
              <Dropdown
                bodyClassName="right-0 rounded-[24px] p-10 bg-white"
                head={<img src={profileMenuIcon} alt="three-points" />}
              >
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="box-secondary pr-[49px] flex gap-[8px] items-center"
                >
                  <img src={personIcon} alt="person" />
                  <span>Войти</span>
                </button>
              </Dropdown>
            )}
          </div>
          <div className="relative container py-30 flex justify-between gap-[20px] items-center lt:justify-center lt:pt-[16px]">
            <div className="flex gap-[24px] items-center lt:hidden">
              <button onClick={() => setIsBurgerOpen(true)}>
                <img src={burgerIcon} alt="burger-menu" />
              </button>
              <Link to="/" className="pt-[5px]">
                <img src={logoIcon} alt="logo" />
              </Link>
            </div>
            <div className="relative flex-[0_1_578px] z-[30]">
              <div className="box-secondary flex items-center gap-[8px] ">
                <img src={searchIcon} alt="search" />
                <input
                  type="text"
                  className="w-full leading-[20px] placeholder:text-black "
                  placeholder="Поиск акций"
                  onFocus={() => setIsSearchFocus(true)}
                  onBlur={() => setIsSearchFocus(false)}
                />
              </div>
              <div
                className={clsx(
                  "absolute left-[-16px] top-[-20px] rounded-[24px] px-[16px] pt-[95px] pb-[32px] w-[calc(100%+34px)] h-[287px] bg-[rgba(243,243,243,1)] z-[-1] opacity-0 pointer-events-none trans-def",
                  { "opacity-100 pointer-events-auto": isSeaarchFocus }
                )}
              >
                <div className="overflow-y-scroll h-full [&>:not(:last-child)]:mb-[32px]">
                  {promotionsData.map((promotion) => (
                    <Link
                      key={promotion.name}
                      to={`/promotion${promotion.link}`}
                      className="block hover:text-green"
                    >
                      {promotion.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Modal
              isOpen={isSeaarchFocus}
              close={() => setIsSearchFocus(false)}
              modalStyle="z-[20]"
            />
            {profile ? (
              <div className="lt:hidden">
                <ProfileDropdown
                  profile={profile}
                  head={
                    <>
                      <span>{textLimit(profile?.fullname || "User", 14)}</span>
                      <img src={profile.image} alt="avatar" />
                    </>
                  }
                />
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="box-secondary flex gap-[8px] items-center lt:hidden"
              >
                <img src={personIcon} alt="person" />
                <span>Войти</span>
              </button>
            )}
          </div>
        </div>
        <div className="h-[1px] bg-white"></div>
        <nav className="py-20 container max-w-[1400px] flex justify-between items-center categories">
          <button className="px-10 h-full slider-prev group flex-shrink-0">
            <img
              src={arrowLeftIcon}
              alt="arrow-left"
              className="trans-def group-disabled:opacity-50"
            />
          </button>
          <Swiper
            grabCursor
            slidesPerView={1}
            spaceBetween={24}
            modules={[Navigation]}
            navigation={{
              prevEl: ".categories .slider-prev",
              nextEl: ".categories .slider-next",
            }}
            breakpoints={{ 425: { slidesPerView: "auto" } }}
          >
            {categoriesData.map((category) => (
              <SwiperSlide key={category.name} className="w-fit">
                <Link
                  to="/promotions"
                  key={category.name}
                  onClick={() =>
                    dispatch(
                      setCategories(
                        categories.includes(category.name)
                          ? []
                          : [category.name]
                      )
                    )
                  }
                  className={clsx(
                    "group flex flex-col items-center trans-def hover:text-green",
                    { "text-green": categories.includes(category.name) }
                  )}
                >
                  <div
                    style={{ maskImage: `url(${category.icon})` }}
                    className={clsx(
                      "w-[16px] h-[16px] bg-[#4F4F4F] opacity-50 trans-def group-hover:bg-green",
                      { "bg-green": categories.includes(category.name) }
                    )}
                  ></div>
                  {/* <span>{category.name}</span> */}
                  <div className="flex gap-[9px] items-center">
                    <span className="whitespace-nowrap">{category.name}</span>
                    <div
                      style={{ maskImage: `url(${smallArrowDownIcon})` }}
                      className={clsx(
                        "w-[8px] h-[4px] bg-[#333333] group-hover:bg-green",
                        { "bg-green": categories.includes(category.name) }
                      )}
                    ></div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="px-10 h-full slider-next group flex-shrink-0">
            <img
              src={arrowLeftIcon}
              alt="arrow-right"
              className="rotate-180 trans-def group-disabled:opacity-50"
            />
          </button>
        </nav>
        <Burger
          isOpen={isBurgerOpen}
          close={() => setIsBurgerOpen(false)}
          authOpen={() => setIsAuthOpen(true)}
        />
      </header>
      <Auth
        isOpen={isAuthOpen}
        close={() => setIsAuthOpen(false)}
        type="login"
      />
    </>
  );
};

export default Header;
