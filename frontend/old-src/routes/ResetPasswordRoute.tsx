import { SubmitHandler, useForm } from "react-hook-form";
import useAppSelector from "../hooks/useAppSelector";
import { ResetPasswordRequest } from "../types/Auth";
import { useRef } from "react";
import { Redirect, useLocation, useSearch } from "wouter";
import { useResetPasswordMutation } from "../api/profile";
import Modal from "../components/Modal";
import FormPasswordInput from "../components/FormPasswordInput";
import FormConfirmPasswordInput from "../components/FormConfirmPasswordInput";

export default function ResetPasswordRoute() {
  const searchParams = useSearch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const form = useForm<ResetPasswordRequest>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [, setLocation] = useLocation();
  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const errorMssg = error?.message;

  if (isAuthenticated) return <Redirect to="/" />;

  const onSubmit: SubmitHandler<ResetPasswordRequest> = async (data) => {
    try {
      await resetPassword({ ...data, searchParams }).unwrap();
      form.reset();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onModalExit = () => {
    if (isSuccess) setLocation("/login");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-center font-bold ~text-2xl/3xl">Reset Password</h1>
        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="form"
          aria-disabled={isLoading}
        >
          <FormPasswordInput
            form={form}
            disabled={isLoading}
            autoComplete="new-password"
          />
          <FormConfirmPasswordInput form={form} disabled={isLoading} />

          <button className="btn btn-primary mt-4" disabled={isLoading}>
            {isLoading && <span className="loading loading-spinner"></span>}
            Submit
          </button>
        </form>
        <Modal
          ref={modalRef}
          title={isSuccess ? "Success!" : "Error"}
          onExit={onModalExit}
        >
          <p className="py-4">
            {isSuccess ? "Your password was reset!" : errorMssg}
          </p>
        </Modal>
      </div>
    </div>
  );
}
