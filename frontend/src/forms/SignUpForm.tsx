import type Auth from "../types/Auth";
import type { SubmitHandler } from "react-hook-form";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../api/auth";
import { Link } from "wouter";
import FormEmailInput from "../components/FormEmailInput";
import FormTextInput from "../components/FormTextInput";
import FormPasswordInput from "../components/FormPasswordInput";
import FormConfirmPasswordInput from "../components/FormConfirmPasswordInput";
import Modal from "../components/Modal";
import useAppDispatch from "../hooks/useAppDispatch";
import { setClientId } from "../features/clientSlice";

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const form = useForm<Auth.SignUpRequest>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [signUp, { data, isLoading, isSuccess, error }] = useSignUpMutation();

  const errorMssg = error?.message;

  const onSubmit: SubmitHandler<Auth.SignUpRequest> = async (formData) => {
    try {
      await signUp(formData).unwrap();
      form.reset();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onModalExit = () => {
    modalRef.current?.close();
    if (isSuccess) dispatch(setClientId(data.id));
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        Create your account
      </h1>

      <p className="text-center">Welcome to Investify!</p>

      <Link href="/login" className="link link-secondary text-center">
        Login instead?
      </Link>

      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="form"
        aria-disabled={isLoading}
      >
        <FormEmailInput form={form} disabled={isLoading} required />

        <FormTextInput
          name="username"
          labelText="Username"
          form={form}
          autoComplete="username"
          disabled={isLoading}
          required
        />

        <FormPasswordInput
          form={form}
          autoComplete="new-password"
          disabled={isLoading}
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
          {isSuccess
            ? "We've sent you an email. Click the verification link to activate your account!"
            : errorMssg}
        </p>
      </Modal>
    </div>
  );
}
