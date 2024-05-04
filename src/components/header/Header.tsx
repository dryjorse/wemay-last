import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { textLimit } from "../../data/data";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "../../types/types";
import Burger from "../burger/Burger";
import Auth from "../auth/Auth";
import Modal from "../ui/modal/Modal";
import Dropdown from "../ui/dropdown/Dropdown";
import profileService from "../../services/profileService";
import promotionsIcon from "../../assets/images/icons/promotion-ctg.svg";
import finishSoonIcon from "../../assets/images/icons/finish-ctg.svg";
import freeIcon from "../../assets/images/icons/free-ctg.svg";
import burgerIcon from "../../assets/images/icons/burger.svg";
import logoIcon from "../../assets/images/icons/logo.svg";
import personIcon from "../../assets/images/icons/person.svg";
import profileMenuIcon from "../../assets/images/icons/profile-menu.svg";
import heartIcon from "../../assets/images/icons/heart-black.svg";
import starIcon from "../../assets/images/icons/star-black.svg";
import announcementIcon from "../../assets/images/icons/announcement.svg";
import settingsIcon from "../../assets/images/icons/settings.svg";
import exitIcon from "../../assets/images/icons/exit.svg";
import Categories from "../categories/Categories";
import Search from "../search/Search";
import avaIcon from "../../assets/images/icons/ava.svg";
import Loading from "../ui/loading/Loading";
import { deleteTokens } from "../../common/api.helpers";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { setIsAuth } from "../../store/slices/authSlice";
import { useProfile } from "../../hooks/useProfile";
import "swiper/css";

interface IProfileDropdownProps {
  head: ReactNode;
  profile: IUser;
}

const ProfileDropdown: FC<IProfileDropdownProps> = ({ head, profile }) => {
  const dispatch = useAppDispatch();
  const { mutate: logout } = useMutation({
    mutationFn: profileService.logout,
    onSuccess: () => {
      dispatch(setIsAuth(false));
      deleteTokens();
    },
  });

  return (
    <Dropdown
      headClassName="flex gap-[11px] items-center"
      bodyClassName="top-[50px] right-0 rounded-[12px] p-[16px] w-[230px] bg-white font-mulish"
      head={head}
    >
      {profile ? (
        <>
          <img
            alt="ava"
            src={profile.image || avaIcon}
            className="w-[40px] h-[40px]"
          />
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
            to="/my-promotions"
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img
              src={announcementIcon}
              alt="announcement"
              className="opacity-60"
            />
            <span>Мои акции</span>
            <span>0</span>
          </Link>
          <Link
            to="/profile"
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img src={settingsIcon} alt="heart" />
            <span>Настройки</span>
          </Link>
          <button
            onClick={() => logout()}
            className="mt-[24px] flex gap-[12px] items-center"
          >
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
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { data: profile, isLoading: isProfileLoading } = useProfile();

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
            {isAuth ? (
              <ProfileDropdown
                profile={profile!}
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
            <Search
              isSearchFocus={isSearchFocus}
              setIsSearchFocus={setIsSearchFocus}
            />
            <Modal
              isOpen={isSearchFocus}
              close={() => setIsSearchFocus(false)}
              modalStyle="z-[20]"
            />
            {isProfileLoading ? (
              <div className="relative">
                <Loading />
              </div>
            ) : isAuth && profile ? (
              <div className="lt:hidden">
                <ProfileDropdown
                  profile={profile}
                  head={
                    <>
                      <span>{textLimit(profile?.fullname || "User", 14)}</span>
                      <img
                        alt="avatar"
                        src={profile.image || avaIcon}
                        className="w-[40px] h-[40px]"
                      />
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
        <Categories />
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
