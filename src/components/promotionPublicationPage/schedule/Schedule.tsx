import { ChangeEvent, FC, useEffect, useState } from "react";
import { initialScheduleTime, weekDays } from "../../../data/data";
import Modal from "../../ui/modal/Modal";
import Checkbox from "../../ui/checkbox/Checkbox";
import Accordeon from "../../ui/accordeon/Accordeon";
import arrowDownIcon from "../../../assets/images/icons/arrow-down.svg";
import timeDelimiterIcon from "../../../assets/images/icons/time-delimiter.svg";
import clsx from "clsx";
import Input from "../../ui/input/Input";
import clockIcon from "../../../assets/images/icons/clock.svg";

interface IScheduleProps {
  isOpen: boolean;
  close: () => void;
}

interface ITimeProps {
  fromValue: string;
  toValue: string;
  onChangeFrom: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTo: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Time: FC<ITimeProps> = ({
  fromValue,
  toValue,
  onChangeFrom,
  onChangeTo,
}) => {
  return (
    <div className={"flex justify-between gap-[14px] *:flex-auto"}>
      <div>
        <h5 className="mb-[8px] text-18 font-bold text-[rgba(79,79,79,1)]">
          С
        </h5>
        <Input
          icon={clockIcon}
          value={fromValue}
          onChange={onChangeFrom}
          inputClassName="bg-white"
        />
      </div>
      <div>
        <h5 className="mb-[8px] text-18 font-bold text-[rgba(79,79,79,1)]">
          до
        </h5>
        <Input
          icon={clockIcon}
          value={toValue}
          onChange={onChangeTo}
          inputClassName="bg-white"
        />
      </div>
    </div>
  );
};

const Schedule: FC<IScheduleProps> = ({ isOpen, close }) => {
  const [schedule, setSchedule] = useState(weekDays);
  const [scheduleTime, setScheduleTime] = useState(initialScheduleTime);

  useEffect(() => {
    setSchedule((prev) =>
      prev.map((day) => ({
        ...day,
        time: { from: scheduleTime.from, to: scheduleTime.to },
      }))
    );
  }, [scheduleTime]);

  const handleIsDayActive = (index: number) => {
    const customSchedule = [...schedule];
    customSchedule[index].isActive = !customSchedule[index].isActive;

    setSchedule(customSchedule);
  };

  const handleOnChangeTime = (value: string, fromOrTo: "from" | "to") => {
    value.length <= 5 &&
      setScheduleTime((prev) => ({ ...prev, [fromOrTo]: value }));
  };

  const handleOnChangeConcreteTime = (
    value: string,
    index: number,
    fromOrTo: "from" | "to"
  ) => {
    const customSchedule = [...schedule];
    if (value.length <= 5) customSchedule[index].time[fromOrTo] = value;

    setSchedule(customSchedule);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        close={close}
        modalStyle="!m-0 z-[53]"
        contentStyle="pt-20 pl-40 pr-20 pb-[32px] max-w-[600px] bg-[rgba(243,243,243,1)]"
      >
        <h3 className="title text-[rgba(23,23,23,1)]">
          Добавить график работы
        </h3>
        <h4 className="mt-40 text-18 font-bold text-[rgba(79,79,79,1)]">
          Дни работы
        </h4>
        <ul className="pr-20 max-h-[386px] overflow-y-scroll overflow-x-hidden scroll-small">
          {schedule.map(({ day, isActive, time }, index) => (
            <li key={day} className="mt-[17px]">
              <Accordeon
                isActive={isActive}
                arrowIcon={arrowDownIcon}
                buttonStyle="gap-[20px]"
                bodyStyle="my-[24px]"
                arrowIconStyle={clsx("trans-def", { "opacity-30": !isActive })}
                button={
                  <div className="flex-auto flex justify-between items-center">
                    <Checkbox
                      name={day}
                      checked={isActive}
                      onChange={() => handleIsDayActive(index)}
                    />
                    <div
                      className={clsx(
                        "flex gap-[10px] items-center trans-def",
                        {
                          "opacity-0": !isActive,
                        }
                      )}
                    >
                      <span>{time.from}</span>
                      <img src={timeDelimiterIcon} alt="time-delimiter" />
                      <span>{time.to}</span>
                    </div>
                  </div>
                }
              >
                <Time
                  fromValue={time.from}
                  toValue={time.to}
                  onChangeFrom={(e) =>
                    handleOnChangeConcreteTime(e.target.value, index, "from")
                  }
                  onChangeTo={(e) =>
                    handleOnChangeConcreteTime(e.target.value, index, "to")
                  }
                />
              </Accordeon>
            </li>
          ))}
        </ul>
        <div className="mt-[56px] mb-[48px] pr-20">
          <h4 className=" mb-10 text-18 font-bold text-[rgba(79,79,79,1)]">
            Время работы
          </h4>
          <Time
            fromValue={scheduleTime.from}
            toValue={scheduleTime.to}
            onChangeFrom={(e) => handleOnChangeTime(e.target.value, "from")}
            onChangeTo={(e) => handleOnChangeTime(e.target.value, "to")}
          />
        </div>
        <div className="flex gap-[16px] items-center text-18 *:font-bold">
          <button
            onClick={close}
            className="box-secondary border-2 rounded-[24px] py-20 px-[86px] text-green "
          >
            Отмена
          </button>
          <button className="btn rounded-[24px] py-[22px] px-[79px]">
            Добавить
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Schedule;
