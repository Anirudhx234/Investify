import type { SubmitHandler } from "react-hook-form";

import { useMemo } from "react";
import {
  useLoggedInClientProfileQuery,
  useModifyProfileMutation,
} from "../api/clients";
import useRequests from "../hooks/useRequests";
import { useForm } from "react-hook-form";
import useFormReset from "../hooks/useFormReset";
import FormSubmit from "../components/FormSubmit";
import FormNumberInput from "../components/FormNumberInput";

export interface ProfilePersonalFormShape {
  age: string;
  income: string;
}

export default function ProfilePersonalForm() {
  const clientProfileState = useLoggedInClientProfileQuery();
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();

  const requestStates = useMemo(
    () => ({
      "Modify Profile": modifyProfileState,
    }),
    [modifyProfileState],
  );

  const { isLoading } = useRequests({
    requestStates,
    successMessage: "Profile updated!",
  });

  const form = useForm<ProfilePersonalFormShape>();

  const clientData = useMemo(
    () => ({
      age: `${clientProfileState.data?.age ?? ""}`,
      income: `${clientProfileState.data?.income ?? ""}`,
    }),
    [clientProfileState.data],
  );

  useFormReset(form, clientData);

  const onModifyProfile: SubmitHandler<ProfilePersonalFormShape> = (data) => {
    const formData = new FormData();

    if (data.age !== clientData.age) formData.set("age", `${data.age}`);

    if (data.income !== clientData.income)
      formData.set("income", `${data.income}`);

    modifyProfile(formData).unwrap();
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        Personal Information
      </h1>

      <div className="divider"></div>

      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(onModifyProfile)}
        aria-label="form"
        aria-disabled={isLoading}
      >
        <FormNumberInput
          name="age"
          label="Age"
          form={form}
          isBuffering={isLoading}
          required
          min={0}
        />

        <FormNumberInput
          name="income"
          label="Income"
          form={form}
          isBuffering={isLoading}
          required
          min={0}
          decimal
        />

        <div>
          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </div>
      </form>
    </div>
  );
}
