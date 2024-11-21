import type { ChangeEvent } from "react";
import type { SubmitHandler } from "react-hook-form";

import { useParams } from "wouter";
import {
  useClientProfileQuery,
  useLoggedInClientProfileQuery,
  useModifyProfileMutation,
} from "../api/clients";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormReset } from "../hooks/useFormReset";
import { ProfilePicture } from "../components/ProfilePicture";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { ReadonlyInput } from "../components/ReadonlyInput";
import { useToastForRequest } from "../hooks/useToastForRequests";
import { Badge } from "../components/Badge";

export function ProfileGeneralForm() {
  const params = useParams() as { id?: string | undefined };
  const clientId = params.id ?? "me";

  if (clientId === "me") return <ProfileGeneralFormEdit />;
  else return <ProfileGeneralFormView />;
}

export interface ProfileGeneralFormEditShape {
  username: string;
  profilePicture: FileList | undefined | null;
}

export function ProfileGeneralFormEdit() {
  const clientProfileState = useLoggedInClientProfileQuery();
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();
  const [uploadedImgURL, setUploadedImgURL] = useState<string | undefined>();

  const { isLoading } = useToastForRequest(
    "Modify Profile",
    modifyProfileState,
    { backupSuccessMessage: "Profile updated!" },
  );

  const form = useForm<ProfileGeneralFormEditShape>();

  const clientData = useMemo(
    () =>
      clientProfileState.data
        ? { ...clientProfileState.data, profilePicture: undefined }
        : undefined,
    [clientProfileState.data],
  );

  useFormReset(form, clientData);

  const profilePictureRegister = form.register("profilePicture", {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const url = URL.createObjectURL(e.target.files[0]);
        setUploadedImgURL(url);
      } else {
        setUploadedImgURL(undefined);
      }
    },
  });

  const onModifyProfile: SubmitHandler<ProfileGeneralFormEditShape> = (
    data,
  ) => {
    const formData = new FormData();

    if (data.username !== clientData?.username)
      formData.set("username", data.username);

    if (data.profilePicture?.[0])
      formData.set("profilePicture", data.profilePicture[0]);

    modifyProfile(formData)
      .unwrap()
      .catch(() => {});
  };

  const refetch = clientProfileState.refetch;
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        General Information
      </h1>

      <div className="divider"></div>

      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(onModifyProfile)}
        aria-label="form"
        aria-disabled={isLoading}
      >
        <div className="mb-6 flex flex-col items-center gap-8">
          <ProfilePicture src={uploadedImgURL} className="~h-20/40 ~w-20/40" />
          <label
            htmlFor="profilePicture"
            className="btn btn-secondary btn-wide"
          >
            Upload Picture
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="hidden"
              disabled={isLoading}
              {...profilePictureRegister}
            />
          </label>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex max-w-40 flex-wrap">
            {clientData?.badges.map((badge) => (
              <Badge key={badge.id} {...badge} />
            ))}
          </div>
        </div>

        <FormInput
          name="username"
          label="Username"
          form={form}
          inputAttributes={{ autoComplete: "username" }}
          isBuffering={isLoading}
          required
        />

        <div>
          <FormSubmit className="btn-primary" isBuffering={isLoading} />
        </div>
      </form>
    </div>
  );
}

export function ProfileGeneralFormView() {
  const params = useParams() as { id: string };
  const clientProfileState = useClientProfileQuery({ id: params.id });
  const clientData = clientProfileState.data;

  const refetch = clientProfileState.refetch;
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">
        General Information
      </h1>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-4">
        <ProfilePicture
          src={clientData?.profilePicture ?? undefined}
          className="~h-20/40 ~w-20/40"
        />
      </div>

      <div className="flex w-full justify-center">
        <div className="flex max-w-40 flex-wrap">
          {clientData?.badges.map((badge) => (
            <Badge key={badge.id} {...badge} />
          ))}
        </div>
      </div>

      <ReadonlyInput
        name="username"
        label="Username"
        value={clientData?.username}
      />
    </div>
  );
}
