/* attributes needed to create a new user account */

interface CreateAccountAttributes {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default CreateAccountAttributes;
