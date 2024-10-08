import type { SignUpRequest } from "../types/Auth";
import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import FormConfirmPassword from "../components/FormConfirmPasswordInput";
import FormEmailInput from "../components/FormEmailInput";
import FormPasswordInput from "../components/FormPasswordInput";
import FormTextInput from "../components/FormTextInput";
import { useSignupMutation } from "../api/auth";
import { useRef } from "react";
import Modal from "../components/Modal";
import useAppSelector from "../hooks/useAppSelector";
import { selectProfileData, setProfileData } from "../features/profileSlice";
import { Redirect } from "wouter";
import useAppDispatch from "../hooks/useAppDispatch";

/* account creation form */
export default function CreateAccountForm() {
  const profileData = useAppSelector(selectProfileData);
  const dispatch = useAppDispatch();
  const form = useForm<SignUpRequest>();
  const [signup, { isLoading, isSuccess, error }] = useSignupMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

  if (profileData) return <Redirect to="/" />;

  const usernameRegisterInputProps = form.register("username", {
    required: "Username is required",
  });

  const errorMssg = error?.message ?? "An error occurred";

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    try {
      await signup(data).unwrap();
      form.reset();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onModalExit = () => {};

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        Create your account
      </h1>
      <p className="text-center">Welcome to Investify!</p>
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
          registerInputProps={usernameRegisterInputProps}
          errors={form.formState.errors}
          autoComplete="username"
          disabled={isLoading}
        />

        <FormPasswordInput
          form={form}
          autoComplete="new-password"
          disabled={isLoading}
        />
        <FormConfirmPassword form={form} disabled={isLoading} />

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
        <p className="py-4">{isSuccess ? "Account created!" : errorMssg}</p>
      </Modal>
    </div>
  );
}
