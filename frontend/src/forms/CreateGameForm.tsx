import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useCreateGameMutation } from "../api/game";
import { useToastForRequest } from "../hooks/useToastForRequests";
import { useLocation } from "wouter";
import { FormSubmit } from "../components/FormSubmit";
import { FormInput } from "../components/FormInput";
import { FormNumberInput } from "../components/FormNumberInput";
import { FormDateTimeInput } from "../components/FormDateTimeInput";
import { FormSelectInput } from "../components/FormSelectInput";

export interface CreateGameFormShape {
  name: string;
  startTime: string;
  endTime: string;
  buyingPower: number;
  type: "PUBLIC" | "PRIVATE";
}

export function CreateGameForm() {
  const [, navigate] = useLocation();
  const form = useForm<CreateGameFormShape>();
  const [createGame, createGameState] = useCreateGameMutation();

  const { isLoading } = useToastForRequest("Create Game", createGameState, {
    backupSuccessMessage: "Game created!",
    onSuccess: () => {
      if (createGameState.data) navigate(`/${createGameState.data.id}`);
    },
  });

  const onSubmit: SubmitHandler<CreateGameFormShape> = (data) => {
    createGame({
      name: data.name,
      buyingPower: data.buyingPower,
      startTime: data.startTime,
      endTime: data.endTime,
      type: data.type,
    })
      .unwrap()
      .catch(() => {});
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-lg">
        <div className="flex w-full flex-col gap-4 ~text-sm/base">
          <h1 className="text-center font-bold ~text-2xl/3xl">Create Game</h1>

          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
            aria-label="form"
            aria-disabled={isLoading}
          >
            <FormInput
              name="name"
              label="Name"
              form={form}
              isBuffering={isLoading}
              required
              inputAttributes={{ autoComplete: "off" }}
            />

            <FormNumberInput
              name="buyingPower"
              label="Buying Power"
              form={form}
              isBuffering={isLoading}
              required
              decimal
            />

            <FormDateTimeInput
              name="startTime"
              label="Start Time"
              form={form}
              isBuffering={isLoading}
              required
            />

            <FormDateTimeInput
              name="endTime"
              label="End Time"
              form={form}
              isBuffering={isLoading}
              required
              registerOptions={{
                validate: (value) => {
                  if (form.watch("startTime") >= value) {
                    return "End time must be after Start time";
                  }
                },
              }}
            />

            <FormSelectInput
              name="type"
              label="Type"
              form={form}
              required
              isBuffering={isLoading}
              options={[
                { label: "Public", value: "PUBLIC" },
                { label: "Private", value: "PRIVATE" },
              ]}
            />

            <FormSubmit className="btn-primary" isBuffering={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
}
