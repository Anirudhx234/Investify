export type ProfileData =
  | {
      email: string;
      username: string;
    }
  | null
  | undefined;

export interface ProfileState {
  data?: ProfileData;
}
