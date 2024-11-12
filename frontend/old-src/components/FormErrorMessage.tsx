import type { FieldErrors } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { MdErrorOutline } from "react-icons/md";

export interface FormErrorMessageProps {
  name: string;
  errors?: FieldErrors | undefined;
}

export default function FormErrorMessage({
  name,
  errors,
}: FormErrorMessageProps) {
  return (
    <div className="label">
      <span className="label-text-alt">
        <div className="flex items-center gap-1 text-error">
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <>
                <MdErrorOutline />
                <p>{message}</p>
              </>
            )}
          />
        </div>
      </span>
    </div>
  );
}
