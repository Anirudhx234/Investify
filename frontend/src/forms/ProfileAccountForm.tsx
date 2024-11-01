import { useParams } from "wouter";
import {
  useClientProfileQuery,
  useModifyEmailMutation,
  useModifyProfileMutation,
} from "../api/clients";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormEmailInput from "../components/FormEmailInput";
import FormPasswordInput from "../components/FormPasswordInput";
import Modal from "../components/Modal";

export default function ProfileAccountForm() {
  const params = useParams() as { id: string };
  const clientProfileState = useClientProfileQuery({ id: params.id });
  const [modifyEmail, modifyEmailState] = useModifyEmailMutation();
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const emailForm = useForm<{ email: string }>();
  const passwordForm = useForm<{ password: string }>();

  useEffect(() => {
    if (clientProfileState.data) {
      emailForm.reset({ email: clientProfileState.data.email });
      passwordForm.reset({ password: "" });
    }
  }, [emailForm, passwordForm, clientProfileState]);

  const isLoggedInUser = params.id === "me";

  const isBuffering =
    clientProfileState.isFetching ||
    modifyEmailState.isLoading ||
    modifyProfileState.isLoading;

  const isError = modifyEmailState.isError || modifyProfileState.isError;

  const errorMssg =
    modifyEmailState.error?.message ||
    modifyProfileState.error?.message ||
    "An error occurred";

  const onModifyEmail: SubmitHandler<{ email: string }> = async (formData) => {
    const oldEmail = clientProfileState.data!.email;

    try {
      await modifyEmail({ id: params.id, newEmail: formData.email }).unwrap();
    } catch {
      /* empty */
    }

    emailForm.reset({ email: oldEmail });
    modalRef.current?.showModal();
  };

  const onModifyPassword: SubmitHandler<{ password: string }> = async (
    formData,
  ) => {
    const body = new FormData();
    body.set("password", formData.password);

    try {
      await modifyProfile({
        id: params.id,
        formData: body,
      }).unwrap();
    } catch {
      /* empty */
    }

    passwordForm.reset({ password: "" });
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
        className="flex w-full flex-col gap-4"
        onSubmit={emailForm.handleSubmit(onModifyEmail)}
        aria-label="form"
        aria-disabled={isBuffering || !isLoggedInUser}
      >
        <FormEmailInput
          form={emailForm}
          disabled={isBuffering || !isLoggedInUser}
          required
        />
        {isLoggedInUser && (
          <div>
            <button className="btn btn-primary" disabled={isBuffering}>
              {isBuffering && <span className="loading loading-spinner"></span>}
              Change
            </button>
          </div>
        )}
      </form>
      {isLoggedInUser && (
        <form
          className="mt-8 flex w-full flex-col gap-4"
          onSubmit={passwordForm.handleSubmit(onModifyPassword)}
          aria-label="form"
          aria-disabled={isBuffering}
        >
          <FormPasswordInput
            form={passwordForm}
            autoComplete="new-password"
            disabled={isBuffering}
          />

          <div>
            <button className="btn btn-primary" disabled={isBuffering}>
              {isBuffering && <span className="loading loading-spinner"></span>}
              Change
            </button>
          </div>
        </form>
      )}
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
