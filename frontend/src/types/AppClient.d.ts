/* client data */
interface AppClient {
  id: string;
  email: string;
  username: string;
  profilePicture?: string | undefined | null;
  age?: number | undefined | null;
  income?: number | undefined | null;
}

export default AppClient;
