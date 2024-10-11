export type ProfileData =
  | {
      email: string;
      username: string;
      image?: string | ArrayBuffer | null;
      password?:string;
      age?: number;
      fingoals?: string| null;
    }
  | null
  | undefined;

export interface ProfileState {
  data?: ProfileData;
}
