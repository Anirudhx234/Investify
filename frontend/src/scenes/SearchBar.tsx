import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAssetsSetQuery } from "../api/assets";
import { MdErrorOutline } from "react-icons/md";
import LinksMenu from "../components/LinksMenu";
import assetsIcons from "../components/assetsIcons";

export default function SearchBar() {
  const { data, isLoading, isError, error, isSuccess } = useAssetsSetQuery();
  const [searchValue, setSearchValue] = useState("");
  const isExpanded = searchValue !== "";

  const errorMssg = error?.message;

  const filteredData = { stocks: { items: ["/ABC", "/DEF"] } };

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
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {isExpanded && (
              <div className="dropdown-content z-1 max-h-[30rem] w-full overflow-y-auto rounded-box bg-base-200 p-4 shadow">
                {isError && (
                  <div className="flex items-center gap-2 text-error">
                    <MdErrorOutline />
                    <p>{errorMssg}</p>
                  </div>
                )}
                {isLoading && (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>
                    <p>Loading...</p>
                  </div>
                )}
                {isSuccess && (
                  <LinksMenu
                    menuItems={{ items: filteredData }}
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
