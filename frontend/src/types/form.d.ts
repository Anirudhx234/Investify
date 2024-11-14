/* types relating to forms in the app */
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export interface NumberFieldArgs {
  min?: number | undefined;
  max?: number | undefined;
  decimal?: boolean | undefined;
}

export interface SelectFieldArgs {
  options: {
    label: string;
    value: string;
  }[];

  selectAttributes?: SelectHTMLAttributes<HTMLSelectElement>;
}

/* stuff defined by the implementation and not the domain */
export interface Input<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;

  isBuffering?: boolean | undefined;
  required?: boolean | undefined;

  form: UseFormReturn<T> /* options will be used to register in form at bottom level */;

  inputAttributes?:
    | Exclude<
        InputHTMLAttributes<HTMLInputElement>,
        RegisterOptions<T, Path<T>>
      >
    | undefined /* these are generated at every level */;

  registerOptions?:
    | Partial<RegisterOptions<T, Path<T>>>
    | undefined /* these are generated at every level */;
}
