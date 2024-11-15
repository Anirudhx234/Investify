import type { ChangeEvent, KeyboardEvent } from "react";

import { useMemo, useState } from "react";
import { useLazySearchAssetsQuery } from "../api/assets";
import { FaChartPie, FaSearch } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { Link, useLocation } from "wouter";
import { RecursiveMenu } from "../components/RecursiveMenu";
import {
  convertAssetTypeToLabel,
  convertAssetTypeToRoute,
  convertSymbolToRoute,
} from "../util/convertAsset";
import { twMerge } from "../util/twMerge";
import { AiOutlineStock } from "react-icons/ai";
import { RiExchange2Fill } from "react-icons/ri";
import { TbCoinFilled } from "react-icons/tb";

const assetIcons = {
  stocks: <AiOutlineStock className="text-lg text-success" />,
  "mutual funds": <FaChartPie className="text-lg text-warning" />,
  etfs: <RiExchange2Fill className="text-lg text-info" />,
  crypto: <TbCoinFilled className="text-lg text-error" />,
};

export interface SearchItem {
  key: string;
  symbol: string;
  name: string;
}

export function AssetSearchBar() {
  const [, navigate] = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const isExpanded = searchValue.length >= 3;

  const [searchAssets, { data, isError, isFetching, error, isSuccess }] =
    useLazySearchAssetsQuery();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length >= 3) {
      searchAssets({ symbol: newValue }).unwrap();
    }
    setSearchValue(newValue);
  };

  const { searchItems, firstItem } = useMemo(() => {
    if (!data) return {};

    const searchItems: Record<string, { i: SearchItem[] }> = {};
    let firstItem: SearchItem | undefined;

    Object.entries(data).forEach(([assetType, list]) => {
      const items = {
        i: list.map((i) => ({
          key: `${convertAssetTypeToRoute(assetType)}/${convertSymbolToRoute(i.symbol)}`,
          symbol: i.symbol,
          name: i.name,
        })),
      };

      if (!firstItem && items.i.length > 0) firstItem = items.i[0];
      searchItems[convertAssetTypeToLabel(assetType)] = items;
    });

    return { searchItems, firstItem };
  }, [data]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (firstItem) navigate(`/assets/${firstItem.key}`);
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
                    <p>{error.message}</p>
                  </div>
                )}
                {isFetching && (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>
                    <p>Loading...</p>
                  </div>
                )}
                {isSuccess && (
                  <RecursiveMenu
                    menuItems={{ i: searchItems! }}
                    renderItem={(i) => (
                      <Link
                        href={`/assets/${i.key}`}
                        className={(active) => twMerge(active && "active")}
                      >
                        {`${i.symbol} (${i.name})`}
                      </Link>
                    )}
                    icons={assetIcons}
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
