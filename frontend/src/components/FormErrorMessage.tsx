import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

export interface FormErrorMessageProps {
  id: string;
  errors: FieldErrors;
  name: string;
}

/* this component returns an error message based on the passed errors object */
export default function FormErrorMessage({
  id,
  errors,
  name,
}: FormErrorMessageProps) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p id={id}>{message}</p>}
    />
  );
}
