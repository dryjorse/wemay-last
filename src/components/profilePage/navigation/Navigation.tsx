import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { profileLinks } from "../../../data/data";
import clsx from "clsx";
import Modal from "../../ui/modal/Modal";
import Dropdown from "../../ui/dropdown/Dropdown";

const Navigation: FC = () => {
  const [isExitOpen, setIsExitOpen] = useState(false);

  return (
    <>
      <nav className="rounded-[16px] p-[32px] min-h-[665px] bg-white2 text-18 leading-[23px] [&>:not(:last-child)]:mb-[8px] lt:min-h-fit">
        <div className="lt:hidden">
          {profileLinks.map(({ link, label, isEnd }) => (
            <NavLink
              to={link}
              key={link}
              end={isEnd}
              className={({ isActive }) =>
                clsx(
                  " border-green py-[8px] px-[12px] block w-[244px] trans-def",
                  {
                    "border-b": isActive,
                  }
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => setIsExitOpen(true)}
            className="py-[8px] px-[12px]"
          >
            Выход
          </button>
        </div>
        <Dropdown head={<div className="">Изменить профиль</div>} className="hidden lt:block" />
      </nav>
      <Modal
        isOpen={isExitOpen}
        close={() => setIsExitOpen(false)}
        modalStyle="z-[53]"
        contentStyle="py-20 px-40"
      >
        <h2 className="title">Выйти</h2>
        <span className="block my-40 text-center text-18">
          Вы действительно хотите выйти?
        </span>
        <div className="flex gap-[16px]">
          <button
            onClick={() => setIsExitOpen(false)}
            className="box-secondary border-[2px] rounded-[24px] py-[22px] w-[252px] text-center text-18 font-bold font-montserrat text-green"
          >
            Отмена
          </button>
          <button className="btn rounded-[24px] py-[22px] w-[252px]">
            Выйти
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Navigation;
