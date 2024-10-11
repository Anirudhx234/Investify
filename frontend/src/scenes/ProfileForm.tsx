import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileForm } from "../types/Profile";
import { useModifyProfileMutation, useProfileDataQuery } from "../api/profile";
import { useEffect, useRef } from "react";
import ProfilePicture from "../components/ProfilePicture";
import FormTextInput from "../components/FormTextInput";
import FormNumInput from "../components/FormNumInput";
import Modal from "../components/Modal";
import ProfileEmailForm from "./ProfileEmailForm";

type ModifyProfileForm = Omit<ProfileForm, "email">;

export default function Profile() {
  const { data, isFetching } = useProfileDataQuery();
  const form = useForm<ModifyProfileForm>();
  const [updateProfile, { isLoading, isSuccess, error }] =
    useModifyProfileMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

  const errorMssg = error?.message;
  const isBuffering = isFetching || isLoading;

  const usernameRegisterInputProps = form.register("username", {
    required: "Username is required",
  });
  const profilePictureRegisterInputProps = form.register("profilePicture");
  const ageRegisterInputProps = form.register("age");
  const financialGoalsRegisterInputProps = form.register("financialGoals");

  const onSubmit: SubmitHandler<ModifyProfileForm> = async (data) => {
    const formData = new FormData();
    formData.set("username", data.username);
    formData.set("age", `${data.age}`);
    formData.set("financialGoals", data.financialGoals);

    if (data.profilePicture[0]) formData.set("profilePicture", data.profilePicture[0]);

    try {
      await updateProfile(formData).unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  useEffect(() => {
    if (data)
      form.reset({ ...data, profilePicture: undefined });
  }, [data, form]);

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">Your Profile</h1>
      <ProfileEmailForm />
      <div className="divider"></div>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="form"
        aria-disabled={isBuffering}
      >
        <div className="flex flex-col items-center gap-4">
          <ProfilePicture
            src={data?.profilePicture}
            className="~h-20/40 ~w-20/40"
          />
          <label htmlFor="profilePicture" className="btn btn-secondary btn-wide">
            Change Picture
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="hidden"
              disabled={isBuffering}
              {...profilePictureRegisterInputProps}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <FormTextInput
            name="username"
            labelText="Username"
            registerInputProps={usernameRegisterInputProps}
            errors={form.formState.errors}
            autoComplete="username"
            disabled={isBuffering}
          />

          <FormNumInput
            name="age"
            labelText="Age"
            registerInputProps={ageRegisterInputProps}
            errors={form.formState.errors}
            disabled={isBuffering}
          />

          <FormTextInput
            name="financialGoals"
            labelText="Financial Goals"
            registerInputProps={financialGoalsRegisterInputProps}
            errors={form.formState.errors}
            disabled={isBuffering}
          />

          <div className="flex justify-center">
            <button
              className="btn btn-primary btn-wide mt-4"
              disabled={isBuffering}
            >
              {isBuffering && <span className="loading loading-spinner"></span>}
              Save Profile
            </button>
          </div>
        </div>

        <Modal ref={modalRef} title={isSuccess ? "Success!" : "Error"}>
          <p className="py-4">{isSuccess ? "Profile Updated!" : errorMssg}</p>
        </Modal>
      </form>
    </div>
  );
}
