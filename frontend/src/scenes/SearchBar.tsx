import { Fragment, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAssetsListQuery } from "../api/assets";
import { Link, useLocation } from "wouter";
import buildUrl from "../utils/buildUrl";

function SearchListBox({ searchValue }: { searchValue: string }) {
  const [location] = useLocation();
  const { data } = useAssetsListQuery();

  return (
    <ul className="menu dropdown-content z-[1] max-h-[30rem] w-full overflow-y-auto rounded-box bg-base-100 p-4 shadow">
      {data &&
        Object.entries(data)
          .filter(([key]) => key.includes(location))
          .map(([assetType, assets]) => (
            <Fragment key={assetType}>
              <li className="my-2 capitalize">{assetType}</li>
              {assets
                .filter(
                  (asset) =>
                    asset.symbol.includes(searchValue) ||
                    asset.name.includes(searchValue),
                )
                .map((asset) => {
                  const label = `${asset.symbol} (${asset.name})`;
                  return (
                    <li key={label}>
                      <Link
                        href={buildUrl(
                          "/asset-page",
                          asset as unknown as Record<string, unknown>,
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
            </Fragment>
          ))}
    </ul>
  );
}

export default function SearchBar() {
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
          <SearchListBox searchValue={searchValue} />
        </div>
      </label>
    </div>
  );
}
