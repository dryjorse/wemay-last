import { FC, useEffect, useState } from "react";
import Modal from "../ui/modal/Modal";
import { AuthType } from "../../types/types";
import RegisterOrLogin from "./registerOrLogin/RegisterOrLogin";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ForgotPassword from "./forgotPassword/ForgotPassword";

interface IAuthProps {
  isOpen: boolean;
  close: () => void;
  type?: AuthType;
}

const Auth: FC<IAuthProps> = ({ isOpen, close, type = "register" }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [authType, setAuthType] = useState<AuthType>(type);

  useEffect(() => {
    isAuth && close();
  }, [isAuth]);

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      modalStyle="z-[60]"
      contentStyle="pt-20 px-40 pb-[32px] max-w-[600px] w-full font-mulish"
    >
      {authType === "login" || authType === "register" ? (
        <RegisterOrLogin authType={authType} setAuthType={setAuthType} />
      ) : (
        authType === "forgot-password" && <ForgotPassword />
      )}
    </Modal>
  );
};

export default Auth;
