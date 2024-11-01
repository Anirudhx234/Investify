/* request / response / form types for clients */
declare namespace Clients {
  interface IdRequest {
    id?: string | undefined;
  }

  interface ModifyProfileRequestBody {
    username?: string | undefined;
    profilePicture?: File | undefined;
    age?: number | undefined | null;
    income?: number | undefined | null;
    shortTermGoal?: string | undefined; 
    longTermGoal?: string | undefined;  
    investmentRisk?: string | undefined;
    userSavings?: number | undefined | null;
  }

  interface ModifyProfileForm {
    username: string;
    profilePicture: FileList;
    age: number;
    income: number;
    shortTermGoal?: string; 
    longTermGoal?: string;  
    investmentRisk?: string;
    userSavings?: number;
    currentSavings?: number
  }

  type ModifyProfileGeneralForm = Pick<
    ModifyProfileForm,
    "username" | "profilePicture"
  >;

  type ModifyProfilePersonalForm = Pick<ModifyProfileForm, "age" | "income">;
  type ModifyProfileFinancialForm = Pick<ModifyProfileForm,  "shortTermGoal" | "longTermGoal" | "investmentRisk" | "userSavings" | "currentSavings">;
}

export default Clients;
