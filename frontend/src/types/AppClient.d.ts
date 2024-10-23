/* client data: this interface only represents
 * info that is expected to be available on the frontend
 */
interface AppClient {
  id: string;
  email: string;
  username: string;
  profilePicture?: string | undefined;
  age?: number | undefined;
  income?: number | undefined;
}

export default AppClient;
