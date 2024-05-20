import clsx from "clsx";
import { ChangeEvent, Dispatch, FC } from "react";
import crossIcon from "../../../assets/images/icons/cross.svg";
// import Input from "../../ui/input/Input";

interface IContactsProps {
  contacts: string[];
  setContacts: Dispatch<React.SetStateAction<string[]>>;
}

const Contacts: FC<IContactsProps> = ({ contacts, setContacts }) => {
  const onChangeContact = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    let newContacts = [...contacts];
    newContacts[index] = value;
    setContacts(newContacts);
  };

  return (
    <div>
      <h3 className="mb-[8px] title-3">Контакты</h3>
      {contacts.map((contact, index) => (
        <div key={index} className="relative">
          <input
            type="text"
            value={contact}
            className={clsx("box-input mb-[16px]", {
              "pr-[30px]": !!index,
            })}
            placeholder="Напишите контакт"
            onChange={(event) => onChangeContact(event, index)}
          />
          {!!index && (
            <button
              onClick={() =>
                setContacts((prev) => [
                  ...prev.slice(0, index),
                  ...prev.slice(index + 1),
                ])
              }
              className="absolute top-[calc(50%-14px)] right-[16px]"
            >
              <img src={crossIcon} alt="cross" className="w-[14px] h-[14px]" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Contacts;
