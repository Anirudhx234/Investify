import { Link } from "wouter";
import { Fragment } from "react/jsx-runtime";
import buildUrl from "../utils/buildUrl";
import Assets from "../types/Asset";

export interface AssetsListBoxProps {
  data: Assets.Set;
  searchValue?: string;
  assetType?: Assets.AssetType;
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
                  <li key={label}>
                    <Link
                      href={buildUrl(
                        "/asset-page",
                        dataAsset as unknown as Record<string, unknown>,
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
