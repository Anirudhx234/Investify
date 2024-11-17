import type { portfolioTypes } from "../types";
import type { SubmitHandler } from "react-hook-form";

import {
  useDeleteRealPortfolioAssetMutation,
  useGetPortfolioQuery,
  useModifyRealPortfolioAssetMutation,
} from "../api/portfolio";
import { useForm } from "react-hook-form";
import { useFormReset } from "../hooks/useFormReset";
import { FormNumberInput } from "./FormNumberInput";
import { useMemo } from "react";
import { useToastForRequests } from "../hooks/useToastForRequests";
import { convertAssetTypeToLabel } from "../util/convertAsset";

export interface RealPortfolioTableProps {
  id: string;
}

export function RealPortfolioTable({ id }: RealPortfolioTableProps) {
  const { data, isLoading } = useGetPortfolioQuery({ id });

  return (
    <table className="table-zebra-zebra">
      <thead>
        <tr>
          <th className="w-1/6 py-2">Symbol</th>
          <th className="w-1/6 py-2">Type</th>
          <th className="w-1/6 py-2">Average Cost</th>
          <th className="w-1/6 py-2">Current Price</th>
          <th className="w-1/6 py-2">Quantity</th>
          <th className="w-1/6 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {data?.portfolioAssets.map((portfolioAsset, idx) => (
          <RealPortfolioTableRow
            key={portfolioAsset.id}
            portfolioId={id}
            i={idx + 1}
            {...portfolioAsset}
            isLoading={isLoading}
          />
        ))}
        {!data?.portfolioAssets.length && (
          <tr>
            <td colSpan={6} className="pb-4 pt-2 text-center italic">
              No assets yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export interface RealPortfolioAssetFormShape {
  averageCost: number;
  currentPrice: number;
  quantity: number;
}

export function RealPortfolioTableRow({
  portfolioId,
  asset,
  isLoading,
  ...props
}: portfolioTypes.PortfolioAsset & {
  portfolioId: string;
  i: number;
  isLoading: boolean;
}) {
  const form = useForm<RealPortfolioAssetFormShape>();

  const [modifyAsset, modifyAssetState] = useModifyRealPortfolioAssetMutation();
  const [deleteAsset, deleteAssetState] = useDeleteRealPortfolioAssetMutation();

  useToastForRequests(
    [
      { label: "Save Asset", state: modifyAssetState },
      { label: "Delete Asset", state: deleteAssetState },
    ],
    { backupSuccessMessage: "Portfolio updated!" },
  );

  const formFields = useMemo(
    () => ({
      averageCost: props.averageCost,
      currentPrice: props.currentPrice,
      quantity: props.quantity,
    }),
    [props.averageCost, props.currentPrice, props.quantity],
  );

  useFormReset(form, formFields);

  const onModifyAsset: SubmitHandler<RealPortfolioAssetFormShape> = (data) => {
    modifyAsset({ ...data, assetId: asset.id, portfolioId }).unwrap();
  };

  const onDeleteAsset = () => {
    deleteAsset({ assetId: asset.id, portfolioId }).unwrap();
  };

  return (
    <tr role="form">
      <th>{asset.symbol}</th>
      <td className="text-center capitalize">
        {convertAssetTypeToLabel(asset.type)}
      </td>

      <td className="px-2 pt-4">
        <FormNumberInput
          name="averageCost"
          form={form}
          required
          isBuffering={isLoading}
          decimal
        />
      </td>

      <td className="px-2 pt-4">
        <FormNumberInput
          name="currentPrice"
          form={form}
          required
          isBuffering={isLoading}
          decimal
        />
      </td>

      <td className="px-2 pt-4">
        <FormNumberInput
          name="quantity"
          form={form}
          required
          isBuffering={isLoading}
        />
      </td>

      <td className="flex flex-wrap items-center gap-2 px-2 pt-4">
        <button
          className="btn btn-primary flex-1"
          onClick={form.handleSubmit(onModifyAsset)}
        >
          Save
        </button>
        <button className="btn btn-error flex-1" onClick={onDeleteAsset}>
          Delete
        </button>
      </td>
    </tr>
  );
}
