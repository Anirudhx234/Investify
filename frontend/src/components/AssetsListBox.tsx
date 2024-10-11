import { Link } from "wouter";
import { Fragment } from "react/jsx-runtime";
import buildUrl from "../utils/buildUrl";
import Asset from "../types/Asset";
import assetTypeToLogo from "../utils/assetTypeToLogo";

export interface AssetsListBoxProps {
  data: Asset.Set;
  searchValue?: string;
  assetType?: Asset.Type;
  className?: string;
}

export default function AssetsListBox({
  data,
  searchValue,
  assetType,
  className,
}: AssetsListBoxProps) {
  return (
    <ul className={className}>
      {Object.entries(data)
        .filter(([dataAssetType]) => dataAssetType.includes(assetType ?? ""))
        .map(([dataAssetType, dataAssets]) => (
          <Fragment key={dataAssetType}>
            {!assetType && <li className="my-2 capitalize">{dataAssetType}</li>}
            {dataAssets
              .filter(
                (dataAsset) =>
                  dataAsset.symbol.includes(searchValue ?? "") ||
                  dataAsset.name.includes(searchValue ?? ""),
              )
              .map((dataAsset) => {
                const label = `${dataAsset.symbol} (${dataAsset.name})`;
                return (
                  <li key={label} className="flex items-center gap-1">
                    {assetTypeToLogo(dataAssetType as Asset.Type)}
                    <Link
                      href={buildUrl("/asset-page", {
                        type: dataAssetType,
                        name: dataAsset.name,
                        symbol: dataAsset.symbol,
                      } as unknown as Record<string, unknown>)}
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
