import type Clients from "../types/Clients";

import { useParams } from "wouter";
import {
  useClientProfileQuery,
  useModifyProfileMutation,
} from "../api/clients";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAppSelector from "../hooks/useAppSelector";
import Modal from "../components/Modal";
import ProfilePicture from "../components/ProfilePicture";
import FormTextInput from "../components/FormTextInput";

export default function ProfileGeneralForm() {
  const params = useParams() as { id: string };
  const clientProfileState = useClientProfileQuery({ id: params.id });
  const [modifyProfile, modifyProfileState] = useModifyProfileMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const generalForm = useForm<Clients.ModifyProfileGeneralForm>();

  const [uploadedImgURL, setUploadedImgURL] = useState<string | null>(null);

  useEffect(() => {
    if (clientProfileState.data) {
      generalForm.reset({
        ...clientProfileState.data,
        profilePicture: undefined,
      });
    }
  }, [generalForm, clientProfileState.data]);

  const loggedInUserId = useAppSelector((state) => state.client.id);
  const isLoggedInUser = params.id === loggedInUserId;

  const profilePictureRegister = generalForm.register("profilePicture", {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const url = URL.createObjectURL(e.target.files[0]);
        setUploadedImgURL(url);
      } else {
        setUploadedImgURL(null);
      }
    },
  });

  const isBuffering =
    clientProfileState.isFetching || modifyProfileState.isLoading;

  const isError = modifyProfileState.isError;
  const errorMssg = modifyProfileState.error?.message ?? "An error occurred";

  const onModifyProfile: SubmitHandler<
    Clients.ModifyProfileGeneralForm
  > = async (data) => {
    const formData = new FormData();

    if (data.username !== clientProfileState.data?.username)
      formData.set("username", data.username);

    if (data.profilePicture[0])
      formData.set("profilePicture", data.profilePicture[0]);

    try {
      await modifyProfile({
        id: params.id,
        formData,
      }).unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onModalExit = () => {
    modalRef.current?.close();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-semibold">
        Client ID: {clientProfileState.data?.id}
      </h1>
      <div className="divider"></div>
      <div className="h-4"></div>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={generalForm.handleSubmit(onModifyProfile)}
        aria-label="form"
        aria-disabled={isBuffering || !isLoggedInUser}
      >
        <div className="flex flex-col items-center gap-4">
          <ProfilePicture
            src={uploadedImgURL ?? { id: params.id }}
            className="~h-20/40 ~w-20/40"
          />

          {isLoggedInUser && (
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
                disabled={isBuffering}
                {...profilePictureRegister}
              />
            </label>
          )}
        </div>

        <FormTextInput
          name="username"
          labelText="Username"
          form={generalForm}
          autoComplete="username"
          disabled={isBuffering || !isLoggedInUser}
          required
        />

        {isLoggedInUser && (
          <div>
            <button className="btn btn-primary" disabled={isBuffering}>
              {isBuffering && <span className="loading loading-spinner"></span>}
              Change
            </button>
          </div>
        )}

      </form>
      <Modal
        ref={modalRef}
        onExit={onModalExit}
        title={!isError ? "Success!" : "Error"}
      >
        <p className="py-4">{!isError ? "Change request sent!" : errorMssg}</p>
      </Modal>
    </div>
  );
}
