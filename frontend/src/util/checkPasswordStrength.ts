/*
 * this function checks if password passed as argument is strong.
 * returns null if password is strong, message otherwise
 */

export default function checkPasswordStrength(password: string) {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
  if (!/\d/.test(password)) return "Password must contain a digit";
  if (!/[@$!%*?&#]/.test(password)) return "Password must contain a special character";
  return null;
}
