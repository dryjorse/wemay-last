import { FC } from "react";
import Input from "../../ui/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFields } from "../../../types/types";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/authService";

const ForgotPassword: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<IAuthFields, "email">>({ mode: "all" });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.forgotPassword,
  });

  const forgotPassword: SubmitHandler<Pick<IAuthFields, "email">> = ({
    email,
  }) => {
    mutate(email);
  };

  return (
    <>
      <h2 className="font-montserrat">Забыли пароль</h2>
      <span className="mt-[56px] mb-[32px] block text-center">
        Мы отправим вам инструкцию, как сбросить свой пароль
      </span>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <span className="text-14 text-[rgba(83,83,84,1)]">
            Введите Email<span className="text-red">*</span>
          </span>
          <Input
            type="email"
            error={errors.email}
            {...register("email", {
              required: "Email не должен быть пустым!",
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: "Некорректный Email!",
              },
            })}
          />
        </div>
        <button
          onClick={handleSubmit(forgotPassword)}
          disabled={isPending || !isValid}
          className="btn my-[32px] py-[22px] w-full"
        >Отправить</button>
      </form>
    </>
  );
};

export default ForgotPassword;
