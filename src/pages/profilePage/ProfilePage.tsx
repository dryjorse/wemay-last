import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { profileRoutes } from "../../routes/routes";
import Navigation from "../../components/profilePage/navigation/Navigation";
import ava from "../../assets/images/term/ava.png";

const ProfilePage: FC = () => {
  return (
    <div className="pt-40 pb-100 bg-gray text-almost-black font-mulish">
      <div className="container-two">
        <section className="rounded-[16px] py-[32px] px-40 bg-white2 flex gap-[16px]">
          <img
            src={ava}
            alt="ava"
            className="w-[64px] h-[64px] rounded-[50%]"
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-[24px] font-bold font-montserrat">
              Данияр Асанов
            </h1>
            <a href="mailto:Samplesample@gmail.сom">Samplesample@gmail.сom</a>
          </div>
        </section>
        <div className="mt-20 flex gap-[13px] lt:flex-col">
          <Navigation />
          <section className="rounded-[16px] pt-40 pb-[75px] px-40 flex-auto bg-white2">
            <Routes>
              {profileRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
