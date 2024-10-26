/* request / response / form types for clients */
declare namespace Clients {
  interface IdRequest {
    id?: string | undefined;
  }

  interface ModifyProfileRequestBody {
    username?: string | undefined;
    profilePicture?: File | undefined;
    age?: number | undefined;
    income?: number | undefined;
  }

  interface ModifyProfileForm {
    username: string;
    profilePicture: FileList;
    age: number;
    income: number;
  }

  type ModifyProfileGeneralForm = Pick<
    ModifyProfileForm,
    "username" | "profilePicture"
  >;

  type ModifyProfilePersonalForm = Pick<ModifyProfileForm, "age" | "income">;
}

export default Clients;
