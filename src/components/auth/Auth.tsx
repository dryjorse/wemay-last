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
      contentStyle="  pt-20 px-40 pb-[32px] w-[600px]
       blt:pt-[16px] blt:pr-[36px] blt:pb-[28px] blt:pl-[36px] blt:w-[600px]
lt:pt-[14px] lt:pr-[28px] lt:pb-[24px] lt:pl-[28px] lt:w-[500px]
tb:pt-[12px] tb:pr-[24px] tb:pb-[20px] tb:pl-[24px] tb:w-[400px]
stb:pt-[10px] stb:pr-[20px] stb:pb-[16px] stb:pl-[20px] stb:w-[300px]
bmb:pt-[8px] bmb:pr-[16px] bmb:pb-[12px] bmb:pl-[16px] bmb:w-[250px]
amb:pt-[6px] amb:pr-[12px] amb:pb-[8px] amb:pl-[12px] amb:w-[200px]
smb:pt-[5px] smb:pr-[10px] smb:pb-[6px] smb:pl-[10px] smb:w-[180px] ont-mulish"
      
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
