import { FC } from "react";
import Input from "../../ui/input/Input";

const Password: FC = () => {
  return (
    <>
      <div>
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Старый пароль
        </h2>
        <Input inputClassName="max-w-[700px]" />
      </div>
      <div className="my-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Новый пароль
        </h2>
        <Input inputClassName="max-w-[700px]" />
      </div>
      <button className="btn">Сохранить</button>
    </>
  );
};

export default Password;
