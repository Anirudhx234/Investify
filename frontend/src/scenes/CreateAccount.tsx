import type CreateAccountAttributes from "../types/CreateAccountAttributes";
import { useForm } from "react-hook-form";
import emailRegex from "../utils/emailRegex";
import passwordStrengthCheck from "../utils/passwordStrengthCheck";
import FormTextInput from "../components/FormTextInput";

/* account creation form */
export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateAccountAttributes>();

  const emailRegister = register("email", {
    required: "Email is required",
    pattern: { value: emailRegex, message: "Invalid email address" },
  });

  const usernameRegister = register("username", {
    required: "Username is required",
  });

  const passwordRegister = register("password", {
    required: "Password is required",
    validate: (val) => {
      return passwordStrengthCheck(val);
    },
  });

  const confirmPasswordRegister = register("confirmPassword", {
    required: "Password Confirmation is required",
    validate: (val) => {
      if (watch("password") != val) return "Passwords do not match";
    },
  });

  const onSubmit = () => {};

  return (
    <div className="bg-primary-translucent border-primary flex h-full w-full flex-col rounded-lg border shadow-md ~gap-4/8 ~px-8/20 ~py-4/12">
      <h2 className="text-center font-semibold ~text-2xl/3xl">
        Create your account
      </h2>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="form"
      >
        <FormTextInput
          name="email"
          labelText="Email"
          register={emailRegister}
          errors={errors}
        />
        <FormTextInput
          name="username"
          labelText="Username"
          register={usernameRegister}
          errors={errors}
        />
        <FormTextInput
          name="password"
          labelText="Password"
          register={passwordRegister}
          errors={errors}
        />
        <FormTextInput
          name="confirmPassword"
          labelText="Confirm Password"
          register={confirmPasswordRegister}
          errors={errors}
        />
        <div className="flex justify-center ~mt-4/8">
          <button className="btn btn-primary btn-wide">Submit</button>
        </div>
      </form>
    </div>
  );
}
