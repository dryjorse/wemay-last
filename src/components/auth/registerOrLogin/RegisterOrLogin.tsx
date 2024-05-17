import { Dispatch, FC, SetStateAction, useState } from "react";
import passwordEyeIcon from "../../../assets/images/icons/password-eye.svg";
import passwordEyeDisabledIcon from "../../../assets/images/icons/password-eye-disabled.svg";
import checkMark from "../../../assets/images/icons/check-mark.svg";
import googleIcon from "../../../assets/images/icons/google.svg";
import facebookIcon from "../../../assets/images/icons/f.svg";
import Input from "../../ui/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthType, IAuthFields } from "../../../types/types";
import { useAuth } from "../../../hooks/useAuth";

interface Props {
  authType: "login" | "register";
  setAuthType: Dispatch<SetStateAction<AuthType>>;
}

const RegisterOrLogin: FC<Props> = ({ authType, setAuthType }) => {
  const {
    register: registerInp,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<IAuthFields>({ mode: "all" });
  const [isPaswordHidden, setIsPasswordHidden] = useState(true);
  const { mutate: auth, isPending } = useAuth(
    authType,
    getValues("isRemember"),
    () => {
      setError("email", {
        message: "Пользователь с таким email уже существует!",
      });
    }
  );

  const toggleAuthType = () => {
    setAuthType((prev) => (prev === "login" ? "register" : "login"));
  };

  const authFunc: SubmitHandler<IAuthFields> = (data) => {
    auth(data);
  };

  return (
    <>
    <h2 className="
  font-montserrat 
  text-4xl 
  blt:text-3xl 
  lt:text-2xl 
  tb:text-xl 
  stb:text-lg 
  bmb:text-base 
  amb:text-sm 
  smb:text-xs
">
  {authType === "login" ? "Войти" : "Зарегистрироваться"}
</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="  mt-[56px] 
  mb-[32px] 
  blt:mt-[48px] blt:mb-[24px] 
  lt:mt-[40px] lt:mb-[20px] 
  tb:mt-[32px] tb:mb-[16px] 
  stb:mt-[24px] stb:mb-[12px] 
  bmb:mt-[16px] bmb:mb-[8px] 
  amb:mt-[12px] amb:mb-[6px] 
  smb:mt-[8px] smb:mb-[4px]">
          <span className="  text-14 text-[rgba(83,83,84,1)] 
    blt:text-base blt:text-[rgba(83,83,84,1)] 
    lt:text-sm lt:text-[rgba(83,83,84,1)] 
    tb:text-xs tb:text-[rgba(83,83,84,1)] 
    stb:text-xs stb:text-[rgba(83,83,84,1)] 
    bmb:text-xs bmb:text-[rgba(83,83,84,1)] 
    amb:text-xs amb:text-[rgba(83,83,84,1)] 
    smb:text-xs smb:text-[rgba(83,83,84,1)]">
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
        </div>
        <div>
          <span className="  text-14 text-[rgba(83,83,84,1)] 
    blt:text-base blt:text-[rgba(83,83,84,1)] 
    lt:text-sm lt:text-[rgba(83,83,84,1)] 
    tb:text-xs tb:text-[rgba(83,83,84,1)] 
    stb:text-xs stb:text-[rgba(83,83,84,1)] 
    bmb:text-xs bmb:text-[rgba(83,83,84,1)] 
    amb:text-xs amb:text-[rgba(83,83,84,1)] 
    smb:text-xs smb:text-[rgba(83,83,84,1)]">
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
          <span className=" mt-[12px] mb-[32px] 
  blt:mt-[16px] blt:mb-[24px] 
  lt:mt-[14px] lt:mb-[28px] 
  tb:mt-[12px] tb:mb-[24px] 
  stb:mt-[10px] stb:mb-[20px] 
  bmb:mt-[8px] bmb:mb-[16px] 
  amb:mt-[6px] amb:mb-[12px] 
  smb:mt-[4px] smb:mb-[8px] block text-end   text-14 text-[rgba(83,83,84,1)] 
    blt:text-base blt:text-[rgba(83,83,84,1)] 
    lt:text-sm lt:text-[rgba(83,83,84,1)] 
    tb:text-xs tb:text-[rgba(83,83,84,1)] 
    stb:text-xs stb:text-[rgba(83,83,84,1)] 
    bmb:text-xs bmb:text-[rgba(83,83,84,1)] 
    amb:text-xs amb:text-[rgba(83,83,84,1)] 
    smb:text-xs smb:text-[rgba(83,83,84,1)]">
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
              <span className="  text-14 text-[rgba(83,83,84,1)] 
    blt:text-base blt:text-[rgba(83,83,84,1)] 
    lt:text-sm lt:text-[rgba(83,83,84,1)] 
    tb:text-xs tb:text-[rgba(83,83,84,1)] 
    stb:text-xs stb:text-[rgba(83,83,84,1)] 
    bmb:text-xs bmb:text-[rgba(83,83,84,1)] 
    amb:text-xs amb:text-[rgba(83,83,84,1)] 
    smb:text-xs smb:text-[rgba(83,83,84,1)] leading-[19px]">
                Запомнить меня
              </span>
            </label>
            {authType === "login" && (
              <button
                onClick={() => setAuthType("forgot-password")}
                className="text-blue  text-14  
    blt:text-base blt:text-blue
    lt:text-sm lt:text-blue
    tb:text-xs tb:text-blue
    stb:text-xs stb:text-blue
    bmb:text-xs bmb:text-blue 
    amb:text-xs amb:text-blue
    smb:text-xs smb:text-blue leading-[19px]"
              >
                Забыли пароль?
              </button>
            )}
          </div>
         <button
  onClick={handleSubmit(authFunc)}
  disabled={isPending || !isValid}
  className="
    btn my-[32px] py-[22px] w-full 
    blt:py-[20px] blt:my-[30px] 
    lt:py-[18px] lt:my-[28px] 
    tb:py-[16px] tb:my-[26px] 
    stb:py-[14px] stb:my-[24px] 
    bmb:py-[12px] bmb:my-[22px] 
    amb:py-[10px] amb:my-[20px] 
    smb:py-[8px] smb:my-[18px]
  "
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
          <div className="mt-[32px] flex justify-between items-center gap-2">
    <button className="
    text-[16px] blt:text-[14px] lt:text-[12px] tb:text-[10px] stb:text-[8px] bmb:text-[6px] amb:text-[5px] smb:text-[4px]
  rounded-[24px] border border-[rgba(0,0,0,0.12)] 
  py-[17px] pl-[38px] pr-[25px] 
  flex gap-[9px] items-center 
  text-[rgba(51,51,51,1)] 
  blt:py-[16px] blt:pl-[36px] blt:pr-[24px] 
  lt:py-[13px] lt:pl-[30px] lt:pr-[18px] 
  tb:py-[10px] tb:pl-[24px] tb:pr-[12px] 
  stb:py-[7px] stb:pl-[18px] stb:pr-[8px] 
  bmb:py-[6px] bmb:pl-[12px] bmb:pr-[6px] 
  amb:py-[5px] amb:pl-[8px] amb:pr-[4px] 
  smb:py-[4px] smb:pl-[4px] smb:pr-[2px]
">
  <img src={googleIcon} alt="google" />
  <span>Войти через Google</span>
</button>

            <button className=" text-[16px] blt:text-[14px] lt:text-[12px] tb:text-[10px] stb:text-[8px] bmb:text-[6px] amb:text-[5px] smb:text-[4px] rounded-[24px] border border-[rgba(0,0,0,0.12)] py-[17px] pl-[38px] pr-[25px] flex gap-[9px] items-center text-[rgba(51,51,51,1)]  

  blt:py-[16px] blt:pl-[36px] blt:pr-[24px] 
  lt:py-[13px] lt:pl-[30px] lt:pr-[18px] 
  tb:py-[10px] tb:pl-[24px] tb:pr-[12px] 
  stb:py-[7px] stb:pl-[18px] stb:pr-[8px] 
  bmb:py-[6px] bmb:pl-[12px] bmb:pr-[6px] 
  amb:py-[5px] amb:pl-[8px] amb:pr-[4px] 
  smb:py-[4px] smb:pl-[4px] smb:pr-[2px]
">
              <div className="rounded-[30px] w-[30px] h-[30px] flex justify-center items-center bg-[linear-gradient(0deg,#0062E0_2.92%,#19AFFF_100%)]">
                <img src={facebookIcon} alt="facebook" />
              </div>
              <span>Войти через Facebook</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterOrLogin;
