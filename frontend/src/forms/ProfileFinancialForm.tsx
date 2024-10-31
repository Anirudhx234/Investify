import {
  useClientProfileQuery,
  useModifyProfileMutation,
} from "../api/clients";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Clients from "../types/Clients";
import Modal from "../components/Modal";
import FormTextInput from "../components/FormTextInput";
import FormSelectInput from "../components/FormSelectInput";
import { InvestmentRisk } from "../enums/InvestmentRisk";

export default function ProfileFinancialForm() {
  const clientProfileState = useClientProfileQuery({});
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const financialForm = useForm<Clients.ModifyProfileFinancialForm>();

  useEffect(() => {
    if (clientProfileState.data) {
      financialForm.reset({
        shortTermGoal: clientProfileState.data.shortTermGoal ?? "",
        longTermGoal: clientProfileState.data.longTermGoal ?? "",
        investmentRisk:
          clientProfileState.data.investmentRisk ?? InvestmentRisk.LOW,
      });
    }
  }, [financialForm, clientProfileState]);

  const isBuffering =
    clientProfileState.isFetching || modifyProfileState.isLoading;

  const isError = modifyProfileState.isError;
  const errorMssg = modifyProfileState.error?.message ?? "An error occurred";

  const onModifyProfile: SubmitHandler<
    Clients.ModifyProfileFinancialForm
  > = async (data) => {
    const formData = new FormData();

    if (data.shortTermGoal !== clientProfileState.data?.shortTermGoal) {
      formData.set("shortTermGoal", `${data.shortTermGoal}`);
    }

    if (data.longTermGoal !== clientProfileState.data?.longTermGoal) {
      formData.set("longTermGoal", `${data.longTermGoal}`);
    }

    if (data.investmentRisk !== clientProfileState.data?.investmentRisk) {
      formData.set("investmentRisk", `${data.investmentRisk}`);
    }

    console.log(data.investmentRisk, clientProfileState.data?.investmentRisk);

    try {
      await modifyProfile({ formData }).unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onModalExit = () => {
    modalRef.current?.close();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-semibold">FINANCIAL GOALS</h1>
      <br />
      Client ID: {clientProfileState.data?.id}
      <div className="divider"></div>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={financialForm.handleSubmit(onModifyProfile)}
        aria-label="form"
        aria-disabled={isBuffering}
      >
        <FormTextInput
          name="shortTermGoal"
          labelText="What is your short-term goal?"
          form={financialForm}
          disabled={isBuffering}
        />

        <FormTextInput
          name="longTermGoal"
          labelText="What is your long-term goal?"
          form={financialForm}
          disabled={isBuffering}
        />

        <FormSelectInput
          name="investmentRisk"
          labelText="How risky are you willing to be with your investments?"
          form={financialForm}
          options={[
            { value: InvestmentRisk.LOW, label: "Low" },
            { value: InvestmentRisk.MEDIUM, label: "Medium" },
            { value: InvestmentRisk.HIGH, label: "High" },
          ]}
          disabled={isBuffering}
        />

        <div>
          <button className="btn btn-primary" disabled={isBuffering}>
            {isBuffering && <span className="loading loading-spinner"></span>}
            Change
          </button>
        </div>
      </form>
      <Modal
        ref={modalRef}
        onExit={onModalExit}
        title={!isError ? "Success!" : "Error"}
      >
        <p className="py-4">{!isError ? "Change request sent!" : errorMssg}</p>
      </Modal>
    </div>
  );
}
