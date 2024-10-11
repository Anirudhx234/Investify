import { SubmitHandler, useForm } from "react-hook-form";
import useAppSelector from "../hooks/useAppSelector";
import { useRef } from "react";
import { Redirect, useLocation } from "wouter";
import FormEmailInput from "../components/FormEmailInput";
import { useForgotPasswordMutation } from "../api/auth";
import Modal from "../components/Modal";

export default function ForgotPasswordRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const form = useForm<{ email: string }>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [, setLocation] = useLocation();
  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const errorMssg = error?.message;

  if (isAuthenticated) return <Redirect to="/" />;

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
      await forgotPassword(data).unwrap();
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
        <h1 className="text-center font-bold ~text-2xl/3xl">Forgot Password</h1>
        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="form"
          aria-disabled={isLoading}
        >
          <FormEmailInput form={form} disabled={isLoading} required />
        </form>
        <Modal
          ref={modalRef}
          title={isSuccess ? "Success!" : "Error"}
          onExit={onModalExit}
        >
          <p className="py-4">
            {isSuccess
              ? "We've sent you an email. Please click on the link to reset your password!"
              : errorMssg}
          </p>
        </Modal>
      </div>
    </div>
  );
}
