import { SubmitHandler, useForm } from "react-hook-form";
import useAppSelector from "../hooks/useAppSelector";
import { LoginRequest } from "../types/Auth";
import { useLoginMutation } from "../api/auth";
import { useRef } from "react";
import { Link, Redirect, useLocation } from "wouter";
import FormEmailInput from "../components/FormEmailInput";
import FormPasswordInput from "../components/FormPasswordInput";
import Modal from "../components/Modal";
import useAppDispatch from "../hooks/useAppDispatch";
import { setAuth } from "../features/authSlice";

export default function LoginForm() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const form = useForm<LoginRequest>();
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

  if (isAuthenticated) return <Redirect to="/" />;

  const errorMssg = error?.message ?? "An error occurred";

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      await login(data).unwrap();
      form.reset();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onModalExit = () => {
    if (isSuccess) {
      dispatch(setAuth(true));
      setLocation("/");
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        Log into your account
      </h1>
      <p className="text-center">Welcome back!</p>
      <Link href="/create-account" className="link link-primary text-center">
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

        <Link href="/forgot-password" className="link link-accent text-center">
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
