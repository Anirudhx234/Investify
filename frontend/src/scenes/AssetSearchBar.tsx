import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import type { assetTypes } from "../types";

import { useMemo, useState } from "react";
import { useLazySearchAssetsQuery } from "../api/assets";
import { FaSearch } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { RecursiveMenu } from "../components/RecursiveMenu";
import {
  convertAssetTypeToLabel,
  convertAssetTypeToRoute,
  convertSymbolToRoute,
} from "../util/convertAsset";
import { assetIcons } from "../components/assetIcons";

export interface SearchItem {
  key: string;
  symbol: string;
  name: string;
  assetType: assetTypes.Type;
}

export interface AssetSearchBarStateSetters {
  setSearchValue: (arg0: string) => void;
  setIsExpanded: (arg0: boolean) => void;
}

export interface AssetSearchBarProps {
  renderItem: (
    arg0: SearchItem,
    arg1?: AssetSearchBarStateSetters | undefined,
  ) => ReactNode;

  onSelect: (
    arg0: SearchItem,
    arg1?: AssetSearchBarStateSetters | undefined,
  ) => void;
}

export function AssetSearchBar({ renderItem, onSelect }: AssetSearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchAssets, { data, isError, isFetching, error, isSuccess }] =
    useLazySearchAssetsQuery();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length >= 3) {
      searchAssets({ symbol: newValue })
        .unwrap()
        .catch(() => {});
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
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
          assetType: assetType as assetTypes.Type,
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
      if (firstItem) onSelect(firstItem, { setSearchValue, setIsExpanded });
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
                    extraArgs={{ setSearchValue, setIsExpanded }}
                    renderItem={renderItem}
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
