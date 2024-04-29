import { FC, useState } from "react";
import Modal from "../ui/modal/Modal";
import authService from "../../services/authService";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFields } from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import passwordEyeIcon from "../../assets/images/icons/password-eye.svg";
import passwordEyeDisabledIcon from "../../assets/images/icons/password-eye-disabled.svg";
import checkMark from "../../assets/images/icons/check-mark.svg";
import googleIcon from "../../assets/images/icons/google.svg";
import facebookIcon from "../../assets/images/icons/f.svg";
import Input from "../ui/input/Input";
import { saveTokens } from "../../common/api.helpers";

interface IAuthProps {
  isOpen: boolean;
  close: () => void;
  type?: "login" | "register";
}

const Auth: FC<IAuthProps> = ({ isOpen, close, type = "register" }) => {
  const queryClient = useQueryClient();
  const {
    register: registerInp,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IAuthFields>({ mode: "all" });
  const [authType, setAuthType] = useState<"register" | "login">("register");
  const [isPaswordHidden, setIsPasswordHidden] = useState(true);
  const {
    mutate: auth,
    data,
    error,
  } = useMutation({
    mutationFn: authService[authType],
    onSuccess: ({ data }) => {
      saveTokens(data.tokens.access, data.tokens.refresh);
      queryClient.prefetchQuery({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      error.response.data.email[0] === "user with this email already exists." &&
        setError("email", {
          message: "Пользователь с таким email уже существует!",
        });
    },
  });

  const toggleAuthType = () => {
    setAuthType((prev) => (prev === "login" ? "register" : "login"));
  };

  const authFunc: SubmitHandler<IAuthFields> = (data) => {
    // dispatch(register(data));
    auth(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      modalStyle="z-[60]"
      contentStyle="pt-20 px-40 pb-[32px] max-w-[600px] w-full font-mulish"
    >
      <h2 className="font-montserrat">
        {authType === "login" ? "Войти" : "Зарегистрироваться"}
      </h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-[56px] mb-[32px]">
          <span className="text-14 text-[rgba(83,83,84,1)]">
            Введите Email<span className="text-red">*</span>
          </span>
          <Input
            type="email"
            error={errors.email}
            {...registerInp("email", {
              required: "Email не должен быть пустым!",
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: "Некорректный Email!",
              },
            })}
          />
          {/* <input className={inputStyle("", !!errors.email)} /> */}
        </div>
        <div>
          <span className="text-14 text-[rgba(83,83,84,1)]">
            Введите пароль<span className="text-red">*</span>
          </span>
          <div className="relative flex items-center">
            <Input
              error={errors.password}
              type={isPaswordHidden ? "password" : "text"}
              className="w-full"
              isErrorRespond={false}
              {...registerInp("password", {
                required: "Пароль не может быть пустым!",
                minLength: {
                  value: 4,
                  message: "Пароль не должен быть меньше 4 символов",
                },
                maxLength: {
                  value: 22,
                  message: "Пароль не должен быть больше 22 символов",
                },
              })}
            />
            <button
              className="absolute right-[12px]"
              onClick={() => setIsPasswordHidden((prev) => !prev)}
            >
              <img
                src={
                  isPaswordHidden ? passwordEyeDisabledIcon : passwordEyeIcon
                }
                alt="password-eye"
              />
            </button>
          </div>
          {errors.password && (
            <span className="block mt-[5px] text-red">
              {errors.password.message}
            </span>
          )}
          <span className="mt-[12px] mb-[32px] block text-end text-14">
            <span className="text-red">*</span> - обязательное поле
          </span>
          <div className="flex justify-between">
            <label
              htmlFor="remember-me"
              className="flex gap-[8px] items-center cursor-pointer"
            >
              <input
                id="remember-me"
                type="checkbox"
                className="peer group hidden"
                {...registerInp("isRemember")}
              />
              <div className="outline outline-1 outline-[rgba(221,221,223,1)] rounded-[4px] pb-[3px] flex justify-center items-end w-[16px] h-[16px] bg-[#F9F9F9] trans-def peer-checked:bg-blue peer-checked:outline-0 peer-checked:*:opacity-100">
                <img
                  src={checkMark}
                  alt="check-mark"
                  className="opacity-0 group-checked:opacity-100"
                />
              </div>
              <span className="text-14 text-[rgba(108,108,108,1)] leading-[19px]">
                Запомнить меня
              </span>
            </label>
            {authType === "login" && (
              <button className="text-blue text-14 leading-[19px]">
                Забыли пароль?
              </button>
            )}
          </div>
          <button
            onClick={handleSubmit(authFunc)}
            className="btn my-[32px] py-[22px] w-full"
          >
            {authType === "login" ? "Войти" : "Создать аккаунт"}
          </button>
          <span className="block text-center text-14 leading-[19px] text-[rgba(51,51,51,1)]">
            {authType === "login" ? "Ещё нет аккаунта?" : "Есть аккаунт?"}{" "}
            <button
              type="submit"
              className="text-blue"
              onClick={toggleAuthType}
            >
              {authType === "login" ? "Зарегистрируйтесь" : "Войдите"}
            </button>
          </span>
          <div className="mt-[32px] flex justify-between">
            <button className="rounded-[24px] border border-[rgba(0,0,0,0.12)] py-[17px] pl-[38px] pr-[25px] flex gap-[9px] items-center text-[rgba(51,51,51,1)]">
              <img src={googleIcon} alt="google" />
              <span>Войти через Google</span>
            </button>
            <button className="rounded-[24px] border border-[rgba(0,0,0,0.12)] py-[15px] pl-[26px] pr-[13px] flex gap-[9px] items-center text-[rgba(51,51,51,1)]">
              <div className="rounded-[30px] w-[30px] h-[30px] flex justify-center items-center bg-[linear-gradient(0deg,#0062E0_2.92%,#19AFFF_100%)]">
                <img src={facebookIcon} alt="facebook" />
              </div>
              <span>Войти через Facebook</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Auth;
