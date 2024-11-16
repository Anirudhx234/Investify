import type { SubmitHandler } from "react-hook-form";
import type { ChangeEvent } from "react";

import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import {
  useLoggedInClientProfileQuery,
  useModifyProfileMutation,
} from "../api/clients";
import { useFormReset } from "../hooks/useFormReset";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { FormSelectInput } from "../components/FormSelectInput";
import { FormNumberInput } from "../components/FormNumberInput";
import { FormRangeInput } from "../components/FormRangeInput";
import { twMerge } from "../util/twMerge";
import { formatNumber } from "../util/formatNumber";
import { useToastForRequest } from "../hooks/useToastForRequests";

export interface ProfileFinancialFormShape {
  shortTermGoal: string;
  longTermGoal: string;
  investmentRisk: "LOW" | "MEDIUM" | "HIGH";
  userSavings: string;
  currentSavings: string;
}

export function ProfileFinancialForm() {
  const clientProfileState = useLoggedInClientProfileQuery();
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();

  const { isLoading } = useToastForRequest(
    "Modify Profile",
    modifyProfileState,
    { backupSuccessMessage: "Profile updated!" },
  );

  const form = useForm<ProfileFinancialFormShape>();

  const clientData = useMemo(
    () => ({
      shortTermGoal: clientProfileState.data?.shortTermGoal ?? "",
      longTermGoal: clientProfileState.data?.longTermGoal ?? "",
      investmentRisk: clientProfileState.data?.investmentRisk ?? "LOW",
      userSavings: `${clientProfileState.data?.userSavings ?? ""}`,
      currentSavings: `${clientProfileState.data?.currentSavings ?? ""}`,
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

    if (data.userSavings !== clientData.userSavings)
      formData.set("userSavings", data.userSavings);

    if (data.currentSavings !== clientData.currentSavings)
      formData.set("currentSavings", data.currentSavings);

    modifyProfile(formData).unwrap();
  };

  const [progress, setProgress] = useState<string | undefined>(
    clientData.currentSavings,
  );

  const savingsGoalAmnt = clientData.userSavings
    ? parseFloat(clientData.userSavings)
    : undefined;
  const progressPerc = progress ? parseFloat(progress) : undefined;

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

        <FormNumberInput
          name="userSavings"
          label="Savings goal"
          form={form}
          isBuffering={isLoading}
          min={0}
          decimal
        />

        <FormRangeInput
          name="currentSavings"
          label="Current Savings"
          form={form}
          isBuffering={isLoading}
          registerOptions={{
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setProgress(e.target.value),
          }}
          inputAttributes={{
            className: twMerge(
              "border-none outline-none focus:outline-none",
              progressPerc === 100 ? "range-success" : "range-primary",
            ),
          }}
        />

        {progressPerc !== undefined && savingsGoalAmnt !== undefined && (
          <div className="mt-2 text-center text-sm">
            ${formatNumber((progressPerc / 100) * savingsGoalAmnt)} of $
            {formatNumber(savingsGoalAmnt)} saved
          </div>
        )}

        <div>
          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </div>
      </form>
    </div>
  );
}
