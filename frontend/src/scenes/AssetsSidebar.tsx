import { FaSearch } from "react-icons/fa";
import LinksMenu from "../components/LinksMenu";
import useAppSelector from "../hooks/useAppSelector";
import { useAssetsSetQuery } from "../api/assets";
import assetsIcons from "../components/assetsIcons";

export default function AssetsSidebar() {
  const storeSearchValue = useAppSelector((state) => state.search.searchValue);

  return (
    <>
      <LinksMenu
        className="menu w-full"
        menuItems={{ items: [{ link: "/", label: "search" }] }}
        icons={{ "/": <FaSearch /> }}
      />
      <div className="h-8"></div>
      {storeSearchValue && (
        <AssetsSidebarSearchResults searchValue={storeSearchValue} />
      )}
    </>
  );
}

function AssetsSidebarSearchResults({ searchValue }: { searchValue: string }) {
  const { data } = useAssetsSetQuery({ symbol: searchValue });

  if (!data) {
    return <></>;
  }

  return (
    <>
      <p className="text-xs">
        Searching for "<span className="text-info">{searchValue}</span>"...
      </p>
      <LinksMenu
        className="menu w-full"
        menuItems={{ items: data }}
        icons={assetsIcons}
      />
    </>
  );
}
