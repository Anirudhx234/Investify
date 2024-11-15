import { useForm, type SubmitHandler } from "react-hook-form";

import { useMemo } from "react";
import {
  useLoggedInClientProfileQuery,
  useModifyProfileMutation,
} from "../api/clients";
import { useRequests } from "../hooks/useRequests";
import { useFormReset } from "../hooks/useFormReset";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { FormSelectInput } from "../components/FormSelectInput";

export interface ProfileFinancialFormShape {
  shortTermGoal: string;
  longTermGoal: string;
  investmentRisk: "LOW" | "MEDIUM" | "HIGH";
}

export function ProfileFinancialForm() {
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

  const form = useForm<ProfileFinancialFormShape>();

  const clientData = useMemo(
    () => ({
      shortTermGoal: clientProfileState.data?.shortTermGoal ?? "",
      longTermGoal: clientProfileState.data?.longTermGoal ?? "",
      investmentRisk: clientProfileState.data?.investmentRisk ?? "LOW",
    }),
    [clientProfileState.data],
  );

  useFormReset(form, clientData);

  const onModifyProfile: SubmitHandler<ProfileFinancialFormShape> = (data) => {
    const formData = new FormData();

    if (data.shortTermGoal !== clientData.shortTermGoal)
      formData.set("shortTermGoal", data.shortTermGoal);

    if (data.longTermGoal !== clientData.longTermGoal)
      formData.set("longTermGoal", data.longTermGoal);

    if (data.investmentRisk !== clientData.investmentRisk)
      formData.set("investmentRisk", data.investmentRisk);

    modifyProfile(formData).unwrap();
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">Financial Goals</h1>

      <div className="divider"></div>

      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(onModifyProfile)}
        aria-label="form"
        aria-disabled={isLoading}
      >
        <FormInput
          name="shortTermGoal"
          label="Short Term Goals"
          form={form}
          isBuffering={isLoading}
        />

        <FormInput
          name="longTermGoal"
          label="Long Term Goals"
          form={form}
          isBuffering={isLoading}
        />

        <FormSelectInput
          name="investmentRisk"
          label="Investment Risk"
          form={form}
          options={[
            {
              value: "LOW",
              label: "Low",
            },
            {
              value: "MEDIUM",
              label: "Medium",
            },
            {
              value: "HIGH",
              label: "High",
            },
          ]}
          isBuffering={isLoading}
        />

        <div>
          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </div>
      </form>
    </div>
  );
}
