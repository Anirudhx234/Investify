import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useCreatePortfolioMutation } from "../api/portfolio";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { FormNumberInput } from "../components/FormNumberInput";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function AddPortfolioForm() {
  const [createPortfolio, createPortfolioState] = useCreatePortfolioMutation();

  const realForm = useForm<{ name: string }>();
  const paperForm = useForm<{ name: string; buyingPower: number }>();

  const { isLoading } = useToastForRequest("Create Portfolio", createPortfolioState, {
    backupSuccessMessage: "Created portfolio!",
  });

  const onRealSubmit: SubmitHandler<{ name: string }> = (data) => {
    createPortfolio({ ...data })
      .unwrap()
      .then(() => realForm.reset());
  };

  const onPaperSubmit: SubmitHandler<{ name: string; buyingPower: number }> = (
    data,
  ) => {
    createPortfolio({ ...data })
      .unwrap()
      .then(() => paperForm.reset());
  };

  return (
    <div className="flex w-full flex-col items-center ~gap-8/16">
      <div className="flex w-full max-w-lg flex-col gap-4 ~text-sm/base">
        <h2 className="text-center font-bold ~text-lg/xl">
          Add Real Portfolio
        </h2>

        <form
          className="flex flex-col"
          onSubmit={realForm.handleSubmit(onRealSubmit)}
          aria-label="form"
          aria-disabled={isLoading}
        >
          <FormInput
            name="name"
            label="Name"
            form={realForm}
            isBuffering={isLoading}
            required
            inputAttributes={{ autoComplete: "name" }}
          />

          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </form>
      </div>

      <div className="flex w-full max-w-lg flex-col gap-4 ~text-sm/base">
        <h2 className="text-center font-bold ~text-lg/xl">
          Add Paper Portfolio
        </h2>

        <form
          className="flex flex-col"
          onSubmit={paperForm.handleSubmit(onPaperSubmit)}
          aria-label="form"
          aria-disabled={isLoading}
        >
          <FormInput
            name="name"
            label="Name"
            form={paperForm}
            isBuffering={isLoading}
            required
            inputAttributes={{ autoComplete: "name" }}
          />

          <FormNumberInput
            name="buyingPower"
            label="Buying Power"
            form={paperForm}
            isBuffering={isLoading}
            required
            min={0}
          />

          <FormSubmit className="btn-secondary" isBuffering={isLoading} />
        </form>
      </div>
    </div>
  );
}
