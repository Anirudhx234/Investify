import type { SubmitHandler } from "react-hook-form";

import {
  useLoggedInClientProfileQuery,
  useModifyEmailMutation,
  useModifyProfileMutation,
} from "../api/clients";
import { useForm } from "react-hook-form";
import { useFormReset } from "../hooks/useFormReset";
import { useMemo } from "react";
import { FormEmailInput } from "../components/FormEmailInput";
import { FormSubmit } from "../components/FormSubmit";
import { FormPasswordInput } from "../components/FormPasswordInput";
import { useToastForRequests } from "../hooks/useToastForRequests";

export function ProfileAccountForm() {
  const clientProfileState = useLoggedInClientProfileQuery();
  const [modifyEmail, modifyEmailState] = useModifyEmailMutation();
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();

  const { isLoading } = useToastForRequests(
    [
      {
        label: "Modify Email",
        state: modifyEmailState,
      },
      {
        label: "Modify Profile",
        state: modifyProfileState,
      },
    ],
    { backupSuccessMessage: "Change request sent!" },
  );

  const emailForm = useForm<{ email: string }>();
  const passwordForm = useForm<{ password: string }>();

  const clientData = useMemo(
    () =>
      clientProfileState.data
        ? { ...clientProfileState.data, password: "" }
        : undefined,
    [clientProfileState.data],
  );

  useFormReset(emailForm, clientData);
  useFormReset(passwordForm, clientData);

  const onModifyEmail: SubmitHandler<{ email: string }> = (data) => {
    const oldEmail = clientProfileState.data!.email;
    modifyEmail({ newEmail: data.email })
      .unwrap()
      .then(() => {
        emailForm.reset({ email: oldEmail });
      });
  };

  const onModifyPassword: SubmitHandler<{ password: string }> = (data) => {
    const body = new FormData();
    body.set("password", data.password);
    modifyProfile(body)
      .unwrap()
      .then(() => {
        passwordForm.reset({ password: "" });
      });
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        Account Information
      </h1>

      <div className="divider"></div>

      <form
        className="flex flex-col"
        onSubmit={emailForm.handleSubmit(onModifyEmail)}
        aria-label="form"
        aria-disabled={isLoading}
      >
        <FormEmailInput
          name="email"
          label="Email"
          form={emailForm}
          isBuffering={isLoading}
          required
        />

        <div>
          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </div>
      </form>

      <form
        className="mt-4 flex flex-col"
        onSubmit={passwordForm.handleSubmit(onModifyPassword)}
        aria-label="form"
        aria-disabled={isLoading}
      >
        <FormPasswordInput
          name="password"
          label="Password"
          form={passwordForm}
          isBuffering={isLoading}
          required
        />

        <div>
          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </div>
      </form>
    </div>
  );
}
