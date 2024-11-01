import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLazyAssetsSearchQuery } from "../api/assets";
import { MdErrorOutline } from "react-icons/md";
import LinksMenu from "../components/LinksMenu";
import assetsIcons from "../components/assetsIcons";
import useAppSelector from "../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/searchSlice";
import { useLocation } from "wouter";

export default function SearchBar() {
  const storeSearchValue = useAppSelector((state) => state.search.searchValue);
  const dispatch = useDispatch();
  const [, navigate] = useLocation();
  const [searchValue, setSearchValue] = useState(storeSearchValue);
  const [trigger, { data, isError, error, isFetching }] =
    useLazyAssetsSearchQuery();
  const isExpanded = searchValue.length >= 3;

  const errorMssg = error?.message;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length >= 3) {
      trigger({ symbol: newValue });
    }

    setSearchValue(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchValue.length >= 3 && data) {
        dispatch(setSearch(searchValue));

        let firstLink: string | null = null;
        Object.entries(data).forEach(([, item]) => {
          if (firstLink) return;
          if (item.items.length > 0) {
            firstLink = item.items[0].link;
          }
        });

        if (firstLink) navigate(firstLink);
      }
    } else {
      dispatch(setSearch(""));
    }
  };

  return (
    <div className="flex ~w-80/[50rem]">
      <label className="relative mx-3 w-full">
        <FaSearch className="pointer-events-none absolute z-10 my-4 ms-4 stroke-current text-base-content opacity-60" />
        <div
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="search-listbox"
          aria-expanded={isExpanded}
          id="search-container"
          className="dropdown relative w-full"
        >
          <form>
            <label className="hidden" id="search-label" htmlFor="search-input">
              Search
            </label>
            <input
              name="search"
              id="search-input"
              type="search"
              placeholder="Search..."
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="search-listbox"
              aria-labelledby="search-label"
              className="input input-bordered w-full ps-10"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {isExpanded && (
              <div className="dropdown-content z-1 max-h-[30rem] w-full overflow-y-auto rounded-box bg-base-200 p-4 shadow">
                {isError && (
                  <div className="flex items-center gap-2 text-error">
                    <MdErrorOutline />
                    <p>{errorMssg}</p>
                  </div>
                )}
                {isFetching && (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>
                    <p>Loading...</p>
                  </div>
                )}
                {data && (
                  <LinksMenu
                    menuItems={{ items: data }}
                    icons={assetsIcons}
                    className="menu w-full"
                  />
                )}
              </div>
            )}
          </form>
        </div>
      </label>
    </div>
  );
}
