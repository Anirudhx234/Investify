import {
  useClientProfileQuery,
  useModifyProfileMutation,
} from "../api/clients";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Clients from "../types/Clients";
import Modal from "../components/Modal";
import FormNumberInput from "../components/FormNumberInput";

export default function ProfilePersonalForm() {
  const clientProfileState = useClientProfileQuery({});
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const personalForm = useForm<Clients.ModifyProfilePersonalForm>();

  useEffect(() => {
    if (clientProfileState.data) {
      personalForm.reset({
        age: clientProfileState.data.age,
        income: clientProfileState.data.income,
      });
    }
  }, [personalForm, clientProfileState.data]);

  const isBuffering =
    clientProfileState.isFetching || modifyProfileState.isLoading;

  const isError = modifyProfileState.isError;
  const errorMssg = modifyProfileState.error?.message ?? "An error occurred";

  const onModifyProfile: SubmitHandler<
    Clients.ModifyProfilePersonalForm
  > = async (data) => {
    const formData = new FormData();

    if (data.age !== clientProfileState.data?.age)
      formData.set("age", `${data.age}`);

    if (data.income !== clientProfileState.data?.income)
      formData.set("income", `${data.income}`);

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
      <h1 className="text-lg font-semibold">
        Client ID: {clientProfileState.data?.id}
      </h1>
      <div className="divider"></div>

      <form
        className="flex w-full flex-col"
        onSubmit={personalForm.handleSubmit(onModifyProfile)}
        aria-label="form"
        aria-disabled={isBuffering}
      >
        <FormNumberInput
          name="age"
          labelText="Age"
          form={personalForm}
          disabled={isBuffering}
          min={0}
        />

        <FormNumberInput
          name="income"
          labelText="Income"
          form={personalForm}
          disabled={isBuffering}
          min={0}
          decimal
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
