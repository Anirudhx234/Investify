import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { Link, useLocation } from "wouter";
import FormEmailInput from "../components/FormEmailInput";
import FormInput from "../components/FormInput";
import FormPasswordInput from "../components/FormPasswordInput";
import FormConfirmPasswordInput from "../components/FormConfirmPasswordInput";
import { useSignUpMutation } from "../api/auth";
import useRequests from "../hooks/useRequests";
import FormSubmit from "../components/FormSubmit";

export interface SignUpFormShape {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const [, navigate] = useLocation();
  const form = useForm<SignUpFormShape>();
  const [signUp, signUpState] = useSignUpMutation();

  const { isLoading } = useRequests({
    requests: { "Sign Up": signUpState },
    successMssg: "Verification email sent!",
  });

  const onSubmit: SubmitHandler<SignUpFormShape> = (data) => {
    signUp(data)
      .unwrap()
      .then(() => navigate("/login"));
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
        <FormEmailInput
          name="email"
          label="Email"
          form={form}
          isBuffering={isLoading}
          required
        />

        <FormInput
          name="username"
          label="Username"
          form={form}
          isBuffering={isLoading}
          required
          inputAttributes={{ autoComplete: "username" }}
        />

        <FormPasswordInput
          name="password"
          label="Password"
          form={form}
          isBuffering={isLoading}
          required
        />

        <FormConfirmPasswordInput
          name="confirmPassword"
          label="Confirm Password"
          form={form}
          isBuffering={isLoading}
          required
        />

        <FormSubmit className="btn-primary" isBuffering={isLoading} />
      </form>
    </div>
  );
}
