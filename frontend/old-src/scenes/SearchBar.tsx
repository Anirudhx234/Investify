import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AssetsListBox from "../components/AssetsListBox";
import { useAssetSetQuery } from "../api/assets";
import { useLocation } from "wouter";
import routeToAssetType from "../utils/routeToAssetType";

export default function SearchBar() {
  const [location] = useLocation();
  const { data } = useAssetSetQuery();
  const [searchValue, setSearchValue] = useState("");
  const isExpanded = searchValue !== "";

  return (
    <div className="flex ~w-60/[60rem]">
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
          </form>
          {data && (
            <AssetsListBox
              data={data}
              assetType={routeToAssetType(location)}
              searchValue={searchValue}
              className="menu dropdown-content z-[1] max-h-[30rem] w-full overflow-y-auto rounded-box bg-base-100 p-4 shadow"
            />
          )}
        </div>
      </label>
    </div>
  );
}
