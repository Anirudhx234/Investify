import { ChangeEvent, useRef, useState } from "react";
import { useLazyAssetsListQuery } from "../api/assets";
import { SubmitHandler, useForm } from "react-hook-form";
import Portfolio from "../types/Portfolio";
import { MdErrorOutline } from "react-icons/md";
import FormTextInput from "../components/FormTextInput";
import FormNumberInput from "../components/FormNumberInput";
import Modal from "../components/Modal";
import { useAddPortfolioAssetMutation } from "../api/portfolio";

export default function PortfolioAssetForm() {
  const [searchValue, setSearchValue] = useState("");
  const [trigger, assetListState] = useLazyAssetsListQuery();
  const [addAsset, addAssetState] = useAddPortfolioAssetMutation();

  const isBuffering = addAssetState.isLoading || assetListState.isFetching;

  const isError = addAssetState.isError || assetListState.isError;

  const errorMssg =
    addAssetState.error?.message ||
    assetListState.error?.message ||
    "An error occurred";

  const form = useForm<Portfolio.AddPortfolioAssetRequest>();
  const modalRef = useRef<HTMLDialogElement>(null);

  const isExpanded = searchValue.length >= 3;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length >= 3) {
      trigger({ symbol: newValue });
    }

    setSearchValue(newValue);
  };

  const onModalExit = () => {
    form.reset();
    modalRef.current?.close();
  };

  const onAddAsset: SubmitHandler<Portfolio.AddPortfolioAssetRequest> = async (
    formData,
  ) => {
    try {
      await addAsset(formData).unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  return (
    <>
      <form
        className="w-full"
        onSubmit={form.handleSubmit(onAddAsset)}
        aria-label="form"
        aria-disabled={isBuffering}
      >
        <div
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="search-listbox"
          aria-expanded={isExpanded}
          id="search-container"
          className="dropdown relative w-full"
        >
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
            className="input input-bordered w-full"
            value={searchValue}
            onChange={handleSearchChange}
          />
          {isExpanded && (
            <div className="dropdown-content z-1 max-h-[30rem] w-full overflow-y-auto rounded-box bg-base-200 p-4 shadow">
              {isError && (
                <div className="flex items-center gap-2 text-error">
                  <MdErrorOutline />
                  <p>{errorMssg}</p>
                </div>
              )}
              {isBuffering && (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner"></span>
                  <p>Loading...</p>
                </div>
              )}
              {assetListState.data && (
                <ul className="menu w-full">
                  {assetListState.data.map((item) => (
                    <li key={`/${item.type}/${item.symbol}`}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          form.reset({ assetType: item.type, ...item })
                        }}
                      >
                        {item.type} - {item.symbol}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="divider"></div>

        <FormTextInput
          name="assetType"
          labelText="Asset Type"
          form={form}
          disabled={true}
          required
        />

        <FormTextInput
          name="symbol"
          labelText="Asset Symbol"
          form={form}
          disabled={true}
          required
        />

        <FormTextInput
          name="name"
          labelText="Asset Name"
          form={form}
          disabled={true}
          required
        />

        <FormNumberInput
          name="initialPrice"
          labelText="Cost Price"
          form={form}
          disabled={isBuffering}
          min={0}
          decimal
          required
        />

        <FormNumberInput
          name="quantity"
          labelText="Quantity"
          form={form}
          disabled={isBuffering}
          min={0}
          decimal
          required
        />

        <div className="mt-2 flex w-full justify-center">
          <button className="btn btn-primary" disabled={isBuffering} type="submit">
            {isBuffering && <span className="loading loading-spinner"></span>}
            Add Asset
          </button>
        </div>
      </form>
      <Modal
        ref={modalRef}
        onExit={onModalExit}
        title={!isError ? "Success!" : "Error"}
      >
        <p className="py-4">{!isError ? "Asset added!" : errorMssg}</p>
      </Modal>
    </>
  );
}
