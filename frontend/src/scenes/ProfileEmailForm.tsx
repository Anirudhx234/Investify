import { SubmitHandler, useForm } from "react-hook-form";
import { useModifyEmailMutation, useProfileDataQuery } from "../api/profile";
import { ProfileForm } from "../types/Profile";
import { useEffect, useRef } from "react";
import FormEmailInput from "../components/FormEmailInput";
import Modal from "../components/Modal";

type ModifyEmailForm = Pick<ProfileForm, "email">;

export default function ProfileEmailForm() {
  const { data, isFetching } = useProfileDataQuery();
  const form = useForm<ModifyEmailForm>();
  const [updateEmail, { isLoading, isSuccess, error }] =
    useModifyEmailMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

  const errorMssg = error?.message;
  const isBuffering = isFetching || isLoading;

  const onSubmit: SubmitHandler<ModifyEmailForm> = async (data) => {
    try {
      await updateEmail(data).unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  useEffect(() => {
    if (data) form.reset(data);
  }, [data, form]);

  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-label="form"
      aria-disabled={isBuffering}
    >
      <FormEmailInput form={form} disabled={isBuffering} required />

      <div className="flex justify-center">
        <button
          className="btn btn-primary btn-wide mt-4"
          disabled={isBuffering}
        >
          {isBuffering && <span className="loading loading-spinner"></span>}
          Request Email Change
        </button>
      </div>

      <Modal ref={modalRef} title={isSuccess ? "Success!" : "Error"}>
        <p className="py-4">
          {isSuccess
            ? "We've sent you an email on your new email address. Click the verification link to update your email!"
            : errorMssg}
        </p>
      </Modal>
    </form>
  );
}
