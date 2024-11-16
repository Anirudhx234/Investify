import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useLocation, useSearch } from "wouter";
import { useResetPasswordMutation } from "../api/auth";
import { FormSubmit } from "../components/FormSubmit";
import { FormPasswordInput } from "../components/FormPasswordInput";
import { FormConfirmPasswordInput } from "../components/FormConfirmPasswordInput";
import { useToastForRequest } from "../hooks/useToastForRequests";

export interface ResetPasswordFormShape {
  password: string;
  confirmPassword: string;
}

export function ResetPasswordForm() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const form = useForm<ResetPasswordFormShape>();
  const [resetPassword, resetPasswordState] = useResetPasswordMutation();

  const { isLoading } = useToastForRequest(
    "Reset Password",
    resetPasswordState,
    {
      onSuccess: () => navigate("/login"),
      backupSuccessMessage: "Password reset!",
    },
  );

  const onSubmit: SubmitHandler<ResetPasswordFormShape> = (data) => {
    resetPassword({ ...data, search }).unwrap();
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">Reset Password</h1>

      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="form"
        aria-disabled={isLoading}
      >
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
