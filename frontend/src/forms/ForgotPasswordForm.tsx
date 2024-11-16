import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../api/auth";
import { useLocation } from "wouter";
import { FormEmailInput } from "../components/FormEmailInput";
import { FormSubmit } from "../components/FormSubmit";
import { useToastForRequest } from "../hooks/useToastForRequests";

export interface ForgotPasswordFormShape {
  email: string;
}

export function ForgotPasswordForm() {
  const [, navigate] = useLocation();
  const form = useForm<ForgotPasswordFormShape>();
  const [forgotPassword, forgotPasswordState] = useForgotPasswordMutation();

  const { isLoading } = useToastForRequest(
    "Forgot Password",
    forgotPasswordState,
    {
      onSuccess: () => navigate("/login"),
      backupSuccessMessage: "Reset email sent!",
    },
  );

  const onSubmit: SubmitHandler<ForgotPasswordFormShape> = (data) => {
    forgotPassword(data).unwrap();
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">Forgot Password</h1>

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

        <FormSubmit className="btn-primary" isBuffering={isLoading} />
      </form>
    </div>
  );
}
