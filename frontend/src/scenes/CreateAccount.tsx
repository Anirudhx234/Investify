import type CreateAccountAttributes from "../types/CreateAccountAttributes";

import { useForm } from "react-hook-form";
import Underlay from "../components/Underlay";
import emailRegex from "../utils/emailRegex";
import passwordStrengthCheck from "../utils/passwordStrengthCheck";
import FormErrorMessage from "../components/FormErrorMessage";

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

  return (
    <>
      <Underlay />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <div>
          <h2>Create Account</h2>
          <form
            onSubmit={handleSubmit(() => console.log("Submit"))}
            aria-label="form"
          >
            <label htmlFor="create-email">Email</label>
            <input
              id="create-email"
              type="text"
              {...emailRegister}
              aria-describedby="create-email-error"
            />
            <FormErrorMessage
              id="create-email-error"
              errors={errors}
              name="email"
            />

            <label htmlFor="create-username">Username</label>
            <input
              id="create-username"
              type="text"
              {...usernameRegister}
              aria-describedby="create-username-error"
            />
            <FormErrorMessage
              id="create-username-error"
              errors={errors}
              name="username"
            />

            <label htmlFor="create-password">Password</label>
            <input
              id="create-password"
              type="password"
              {...passwordRegister}
              aria-describedby="create-password-error"
            />
            <FormErrorMessage
              id="create-password-error"
              errors={errors}
              name="password"
            />

            <label htmlFor="create-confirm-password">Confirm Password</label>
            <input
              id="create-confirm-password"
              type="password"
              {...confirmPasswordRegister}
              aria-describedby="create-confirm-password-error"
            />
            <FormErrorMessage
              id="create-confirm-password-error"
              errors={errors}
              name="confirmPassword"
            />

            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
