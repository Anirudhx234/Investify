export interface ProfileResponse {
  email: string;
  username: string;
  profilePicture?: string | undefined;
  age?: number | undefined;
  financialGoals?: string | undefined;
}

export interface ProfileForm {
  email: string;
  username: string;
  profilePicture: FileList;
  age: number;
  financialGoals: string;
}
