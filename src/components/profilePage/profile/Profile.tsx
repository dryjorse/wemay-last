import { ChangeEvent, FC, useState } from "react";
import avaImage from "../../../assets/images/term/ava.png";
import Input from "../../ui/input/Input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import profileService from "../../../services/profileService";

const Profile: FC = () => {
  const queryClient = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    // queryFn: () => profileService.getProfile(),
    // select: ({ data }) => data,
    // enabled: !!localStorage.getItem("token"),
  });
  const [currentAva, setCurrentAva] = useState(avaImage);
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    typeof fileReader.result === "string" && setCurrentAva(fileReader.result);
  };

  // console.log(profile)

  const onChangeAva = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mb-40 flex gap-[40px] items-center">
        <img
          alt="ava"
          src={currentAva}
          className="w-[100px] h-[100px] rounded-[50%]"
        />
        <div>
          <div className="mb-[8px] flex gap-[16px]">
            <label
              htmlFor="profile-ava"
              className="btn rounded-[24px] py-[12px] px-[24px] text-18 leading-[23px] cursor-pointer"
            >
              Загрузить новое фото
              <input
                id="profile-ava"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={onChangeAva}
              />
            </label>
            <button className="btn border border-green rounded-[24px] py-[12px] px-[24px] bg-transparent text-green">
              Удалить
            </button>
          </div>
          <span className="pl-[16px] text-14 text-[rgba(79,79,79,1)]">
            JPG, GIF or PNG. Max size of 800K
          </span>
        </div>
      </div>
      <div className="mt-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Имя
        </h2>
        <Input inputClassName="max-w-[700px]" />
      </div>
      <div className="mt-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Логин
        </h2>
        <Input inputClassName="max-w-[700px]" />
      </div>
      <div className="mt-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Почта
        </h2>
        <Input inputClassName="max-w-[700px]" />
      </div>
      <button className="btn mt-40">Сохранить</button>
    </>
  );
};

export default Profile;
