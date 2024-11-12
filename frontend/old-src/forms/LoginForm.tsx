import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import useAppDispatch from "../hooks/useAppDispatch";
import Auth from "../types/Auth";
import { useRef } from "react";
import { useLoginMutation } from "../api/auth";
import { setClientId } from "../features/clientSlice";
import { Link } from "wouter";
import FormEmailInput from "../components/FormEmailInput";
import FormPasswordInput from "../components/FormPasswordInput";
import Modal from "../components/Modal";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const form = useForm<Auth.LoginRequest>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

  const errorMssg = error?.message;

  const onSubmit: SubmitHandler<Auth.LoginRequest> = async (formData) => {
    try {
      await login(formData).unwrap();
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
        Log into your account
      </h1>

      <p className="text-center">Welcome back!</p>

      <Link href="/sign-up" className="link link-primary text-center">
        Sign up instead?
      </Link>

      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="form"
        aria-disabled={isLoading}
      >
        <FormEmailInput form={form} disabled={isLoading} required />

        <FormPasswordInput
          form={form}
          autoComplete="current-password"
          disabled={isLoading}
        />

        <Link href="/forgot-password" className="link link-primary text-center my-2">
          Forgot Password?
        </Link>

        <button className="btn btn-secondary mt-4" disabled={isLoading}>
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
          {isSuccess ? "Successfully logged in!" : errorMssg}
        </p>
      </Modal>
    </div>
  );
}
