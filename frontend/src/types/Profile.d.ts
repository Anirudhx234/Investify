interface Profile {
  email: string;
  username: string;
  profilePic?: string | null | undefined;
  age?: number | null | undefined;
  finGoals?: string[] | null | undefined;
}

export default Profile;
