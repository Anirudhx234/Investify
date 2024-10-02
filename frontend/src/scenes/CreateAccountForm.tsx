import type CreateAccountAttributes from "../types/CreateAccountAttributes";
import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import FormConfirmPassword from "../components/FormConfirmPasswordInput";
import FormEmailInput from "../components/FormEmailInput";
import FormPasswordInput from "../components/FormPasswordInput";
import FormTextInput from "../components/FormTextInput";

/* account creation form */
export default function CreateAccountForm() {
  const form = useForm<CreateAccountAttributes>();

  const usernameRegisterInputProps = form.register("username", {
    required: "Username is required",
  });

  const onSubmit: SubmitHandler<CreateAccountAttributes> = () => {};

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
      >
        <FormEmailInput form={form} required />

        <FormTextInput
          name="username"
          labelText="Username"
          registerInputProps={usernameRegisterInputProps}
          errors={form.formState.errors}
        />

        <FormPasswordInput form={form} />
        <FormConfirmPassword form={form} />

        <button className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
}
