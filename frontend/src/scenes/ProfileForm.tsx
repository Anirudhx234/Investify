import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileForm } from "../types/Profile";
import {
  useDeleteAccountMutation,
  useModifyProfileMutation,
  useProfileDataQuery,
} from "../api/profile";
import {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import ProfilePicture from "../components/ProfilePicture";
import FormTextInput from "../components/FormTextInput";
import FormNumInput from "../components/FormNumInput";
import Modal from "../components/Modal";
import ProfileEmailForm from "./ProfileEmailForm";
import { useLogoutMutation } from "../api/auth";
import useAppDispatch from "../hooks/useAppDispatch";
import { setAuth } from "../features/authSlice";

type ModifyProfileForm = Omit<ProfileForm, "email">;

export default function Profile() {
  const { data, isFetching } = useProfileDataQuery();
  const form = useForm<ModifyProfileForm>();
  const dispatch = useAppDispatch();

  const [updateProfile, { isLoading, isSuccess, error }] =
    useModifyProfileMutation();

  const [
    logout,
    {
      isLoading: logoutIsLoading,
      error: logoutError,
      isSuccess: logoutIsSuccess,
    },
  ] = useLogoutMutation();

  const [
    deleteAccount,
    {
      isLoading: deleteAccountIsLoading,
      error: deleteAccountError,
      isSuccess: deleteAccountIsSuccess,
    },
  ] = useDeleteAccountMutation();

  const [uploadedImgURL, setUploadedImgURL] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const logoutDeleteModalRef = useRef<HTMLDialogElement>(null);

  const errorMssg = error?.message;
  const isBuffering =
    isFetching || isLoading || logoutIsLoading || deleteAccountIsLoading;

  const usernameRegisterInputProps = form.register("username", {
    required: "Username is required",
  });

  const profilePictureRegisterInputProps = form.register("profilePicture", {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const url = URL.createObjectURL(e.target.files[0]);
        setUploadedImgURL(url);
      } else {
        setUploadedImgURL(null);
      }
    },
  });

  const ageRegisterInputProps = form.register("age");
  const financialGoalsRegisterInputProps = form.register("financialGoals");

  const onSubmit: SubmitHandler<ModifyProfileForm> = async (data) => {
    const formData = new FormData();

    if (data.username) formData.set("username", data.username);
    if (data.age) formData.set("age", `${data.age}`);
    if (data.financialGoals)
      formData.set("financialGoals", data.financialGoals);

    if (data.profilePicture[0])
      formData.set("profilePicture", data.profilePicture[0]);

    try {
      await updateProfile(formData).unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const handleLogout: MouseEventHandler = async (e) => {
    e.preventDefault();
    try {
      await logout().unwrap();
    } catch {
      /* empty */
    }

    dispatch(setAuth(false));
  };

  const handleDeleteAccount: MouseEventHandler = async (e) => {
    e.preventDefault();
    try {
      await deleteAccount().unwrap();
    } catch {
      /* empty */
    }

    dispatch(setAuth(false));
  };

  useEffect(() => {
    if (data) form.reset({ ...data, profilePicture: undefined });
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
            src={uploadedImgURL ?? data?.profilePicture}
            className="~h-20/40 ~w-20/40"
          />
          <label
            htmlFor="profilePicture"
            className="btn btn-secondary btn-wide"
          >
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

          <div className="flex justify-center ~gap-2/4">
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={isBuffering}
            >
              {isBuffering && <span className="loading loading-spinner"></span>}
              Save Profile
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-secondary mt-4"
              disabled={isBuffering}
            >
              {isBuffering && <span className="loading loading-spinner"></span>}
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="btn btn-error mt-4"
              disabled={isBuffering}
            >
              {isBuffering && <span className="loading loading-spinner"></span>}
              Delete Account
            </button>
          </div>
        </div>
      </form>
      <Modal ref={modalRef} title={isSuccess ? "Success!" : "Error"}>
        <p className="py-4">{isSuccess ? "Profile Updated!" : errorMssg}</p>
      </Modal>
      <Modal
        ref={logoutDeleteModalRef}
        title={logoutIsSuccess || deleteAccountIsSuccess ? "Success!" : "Error"}
      >
        <p className="py-4">
          {logoutIsSuccess || deleteAccountIsSuccess
            ? "Done"
            : logoutError?.message || deleteAccountError?.message}
        </p>
      </Modal>
    </div>
  );
}
