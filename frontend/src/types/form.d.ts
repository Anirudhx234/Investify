/* types relating to forms in the app */

import type {
  FieldValues,
  Path,
  RegisterOptions,
  SubmitHandler,
} from "react-hook-form";

/* stuff defined by the domain and not the implementation */
export interface Field<T extends FieldValues> {
  name: Path<T>;
  args: undefined;
}

/* stuff defined by the implementation and not the domain */
export interface Input<T extends FieldValues>
  extends Field<T> {
  registerOptions: RegisterOptions<T, Path<T>>;
  inputAttributes: Exclude<HTMLInputElement, RegisterOptions<T, Path<T>>>;
}

export interface Form<T extends FieldValues> {
  fields: Field<T>[];
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
}
