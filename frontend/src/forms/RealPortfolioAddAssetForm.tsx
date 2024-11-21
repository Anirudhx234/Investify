import type { assetTypes } from "../types";
import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useAddRealPortfolioAssetMutation } from "../api/portfolio";
import { useToastForRequest } from "../hooks/useToastForRequests";
import { useState } from "react";
import { FormSubmit } from "../components/FormSubmit";
import { FormNumberInput } from "../components/FormNumberInput";
import { FormInput } from "../components/FormInput";
import { AssetSearchBar } from "../scenes/AssetSearchBar";

export interface SelectedAssetShape {
  symbol: string;
  name: string;
  assetType: assetTypes.Type;
}

export interface RealPortfolioAddAssetFormShape {
  asset: string;
  quantity: number;
  averageCost: number;
}

export function RealPortfolioAddAssetForm({ id }: { id: string }) {
  const [selectedAsset, setSelectedAsset] = useState<SelectedAssetShape | null>(
    null,
  );
  const form = useForm<RealPortfolioAddAssetFormShape>();

  const [addAsset, addAssetState] = useAddRealPortfolioAssetMutation();
  const { isLoading } = useToastForRequest("Add Asset", addAssetState, {
    backupSuccessMessage: "Asset added!",
    onSuccess: form.reset,
  });

  const onSubmit: SubmitHandler<RealPortfolioAddAssetFormShape> = (data) => {
    addAsset({ ...data, asset: selectedAsset!, portfolioId: id })
      .unwrap()
      .catch(() => {});
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-8">
      <AssetSearchBar
        onSelect={(i) => setSelectedAsset(i)}
        renderItem={(i, setters) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedAsset(i);
              setters?.setIsExpanded(false);
              setters?.setSearchValue(i.symbol);
              form.setValue("asset", `${i.symbol} (${i.name})`);
            }}
          >
            {i.symbol} ({i.name})
          </button>
        )}
      />

      <div className="flex w-full max-w-lg flex-col gap-4 ~text-sm/base">
        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="form"
          aria-disabled={isLoading}
        >
          <FormInput
            name="asset"
            label="Asset"
            form={form}
            required
            inputAttributes={{
              disabled: true,
            }}
          />

          <FormNumberInput
            name="averageCost"
            label="Average Cost"
            form={form}
            isBuffering={isLoading}
            required
            decimal
          />

          <FormNumberInput
            name="quantity"
            label="Quantity"
            form={form}
            isBuffering={isLoading}
            required
          />

          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </form>
      </div>
    </div>
  );
}
