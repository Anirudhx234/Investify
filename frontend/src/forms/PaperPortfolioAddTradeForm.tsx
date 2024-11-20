import type { SubmitHandler } from "react-hook-form";
import type { assetTypes } from "../types";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddPaperPortfolioTradeMutation } from "../api/portfolio";
import { useToastForRequest } from "../hooks/useToastForRequests";
import { AssetSearchBar } from "../scenes/AssetSearchBar";
import { FormInput } from "../components/FormInput";
import { FormNumberInput } from "../components/FormNumberInput";
import { FormSelectInput } from "../components/FormSelectInput";
import { FormSubmit } from "../components/FormSubmit";

export interface SelectedAssetShape {
  symbol: string;
  name: string;
  assetType: assetTypes.Type;
}

export interface PaperPortfolioAddTradeFormShape {
  asset: string;
  quantity: number;
  type: "BUY" | "SELL";
}

export function PaperPortfolioAddTradeForm({ id }: { id: string }) {
  const [selectedAsset, setSelectedAsset] = useState<SelectedAssetShape | null>(
    null,
  );
  const form = useForm<PaperPortfolioAddTradeFormShape>();

  const [addTrade, addTradeState] = useAddPaperPortfolioTradeMutation();
  const { isLoading } = useToastForRequest("Add Trade", addTradeState, {
    backupSuccessMessage: "Trade added!",
  });

  const onSubmit: SubmitHandler<PaperPortfolioAddTradeFormShape> = (data) => {
    addTrade({ ...data, asset: selectedAsset!, portfolioId: id })
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

          <FormSelectInput
            name="type"
            label="Type"
            form={form}
            isBuffering={isLoading}
            required
            options={[
              { label: "Buy", value: "BUY" },
              { label: "Sell", value: "SELL" },
            ]}
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
