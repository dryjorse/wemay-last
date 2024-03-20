import { FC, PropsWithChildren, useState } from "react";
import smallArrowBottomIcon from "../../assets/images/icons/small-arrow-bottom.svg";
import clsx from "clsx";

interface ISelectProps {
  className?: string;
}

const Select: FC<PropsWithChildren<ISelectProps>> = ({
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx("relative", className)}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="box-input flex justify-between items-center"
      >
        <span>Выбрать</span>
        <img
          src={smallArrowBottomIcon}
          alt="arrow-bottom"
          className={clsx("trans-def", { "rotate-180": isOpen })}
        />
      </button>
      <div className={clsx({ hidden: !isOpen })}>{children}</div>
    </div>
  );
};

export default Select;
