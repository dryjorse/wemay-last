import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import searchIcon from "../../assets/images/icons/search.svg";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import { useClickOutside } from "../../hooks/useClickOutside";
import Loading from "../ui/loading/Loading";
import { debounce } from "@mui/material";

interface Props {
  isSearchFocus: boolean;
  setIsSearchFocus: Dispatch<SetStateAction<boolean>>;
}

const Search: FC<Props> = ({ isSearchFocus, setIsSearchFocus }) => {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["promotions-search"],
    queryFn: () => promotionService.getAll({ search }),
    select: ({ data }) => data,
    enabled: false,
  });

  useClickOutside([searchRef], () => setIsSearchFocus(false));

  const onSearchRequest = useCallback(
    debounce(() => {
      refetch();
    }, 250),
    []
  );

  const onChangeSearch = (value: string) => {
    setSearch(value);
    onSearchRequest();
  };

  return (
    <div ref={searchRef} className="relative flex-[0_1_578px] z-[30]">
      <div className="box-secondary flex items-center gap-[8px] ">
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          value={search}
          placeholder="Поиск акций"
          onFocus={() => setIsSearchFocus(true)}
          className="w-full leading-[20px] placeholder:text-black"
          onChange={({ target: { value } }) => onChangeSearch(value)}
        />
      </div>
      <div
        className={clsx(
          "absolute left-[-16px] top-[-20px] rounded-[24px] px-[16px] pt-[95px] pb-[32px] w-[calc(100%+34px)] h-[287px] bg-[rgba(243,243,243,1)] z-[-1] opacity-0 pointer-events-none trans-def",
          { "opacity-100 pointer-events-auto": isSearchFocus }
        )}
      >
        <div className="overflow-y-scroll h-full [&>:not(:last-child)]:mb-[32px]">
          {isLoading ? (
            <Loading />
          ) : (
            data?.results?.map((promotion) => (
              <Link
                key={promotion.title}
                onClick={() => setIsSearchFocus(false)}
                to={`/promotion/${promotion.id}`}
                className="block hover:text-green"
              >
                {promotion.title}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
