import type { SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/auth";
import useRequests from "../hooks/useRequests";
import { Link } from "wouter";
import FormEmailInput from "../components/FormEmailInput";
import FormPasswordInput from "../components/FormPasswordInput";
import FormSubmit from "../components/FormSubmit";
import useAppDispatch from "../hooks/useAppDispatch";
import { setClientId } from "../features/clientSlice";

export interface LoginFormShape {
  email: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const form = useForm<LoginFormShape>();
  const [login, loginState] = useLoginMutation();

  const { isLoading } = useRequests({
    requests: { Login: loginState },
  });

  const onSubmit: SubmitHandler<LoginFormShape> = (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        dispatch(setClientId(res.id));
      });
  };

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        Log into your account
      </h1>

      <p className="text-center">Welcome back!</p>

      <Link href="/sign-up" className="link link-primary text-center">
        Sign up instead?
      </Link>

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

        <FormPasswordInput
          name="password"
          label="Password"
          form={form}
          isBuffering={isLoading}
          required
        />

        <Link
          href="/forgot-password"
          className="link link-primary my-2 text-center"
        >
          Forgot Password?
        </Link>

        <FormSubmit className="btn-secondary" isBuffering={isLoading} />
      </form>
    </div>
  );
}
