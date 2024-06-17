import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import clsx from "clsx";
import searchIcon from "../../assets/images/icons/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import { useClickOutside } from "../../hooks/useClickOutside";
import Loading from "../ui/loading/Loading";

interface Props {
  isSearchFocus: boolean;
  setIsSearchFocus: Dispatch<SetStateAction<boolean>>;
}

const Search: FC<Props> = ({ isSearchFocus, setIsSearchFocus }) => {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["promotions-search"],
    queryFn: () => promotionService.getAll({ search }),
    select: ({ data }) => data,
    enabled: false,
  });

  useClickOutside([searchRef], () => setIsSearchFocus(false));

  const handleSearch = useCallback(() => {
    refetch().then(({ data }) => {
      const results = data?.results;
      if (results?.length === 0) {
        navigate("/not-found");
        setSearch(""); // Clear search input
        setIsSearchFocus(false); // Close search dropdown
      }
    });
  }, [refetch, navigate, setIsSearchFocus]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const onChangeSearch = (value: string) => {
    setSearch(value);
  };

  const handleClickSuggestion = (promotionId: string) => {
    navigate(`/promotion/${promotionId}`);
    setSearch(""); // Clear search input
    setIsSearchFocus(false); // Close search dropdown
  };

  return (
    <div ref={searchRef} className="relative flex-[0_1_578px] z-[30]">
      <div className="box-secondary flex items-center gap-[8px]">
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          value={search}
          placeholder={isSearchFocus ? "" : "Поиск акций"}
          onFocus={() => setIsSearchFocus(true)}
          className="w-full leading-[20px] placeholder:text-black"
          onChange={({ target: { value } }) => onChangeSearch(value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Искать
        </button>
      </div>
      <div
        className={clsx(
          "absolute left-[-16px] top-[-20px] rounded-[24px] px-[16px] pt-[93px] pb-[32px] w-[calc(100%+34px)] h-[287px] bg-[rgba(243,243,243,1)] z-[-1] opacity-0 pointer-events-none trans-def",
          { "opacity-100 pointer-events-auto": isSearchFocus }
        )}
      >
        <div className="overflow-hidden flex justify-start p-[30px] text-[16px]  font-bold items-start h-full [&>:not(:last-child)]:mb-[24px]">
          {isLoading ? (
            <Loading />
          ) : (
            data?.results?.map((promotion) => (
              <Link
                key={promotion.title}
                onClick={() => {
                  handleClickSuggestion(promotion.id);
                  setIsSearchFocus(false);
                }}
                to={`/promotion/${promotion.id}`}
                className="block hover:text-green"
              >
                {promotion.title}
              </Link>
            ))
          )}
          {data?.results?.length === 0 && (
            <div className="text-gray-600 mt-2">Нет результатов</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
