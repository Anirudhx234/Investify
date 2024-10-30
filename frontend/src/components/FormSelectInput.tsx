// import type { Path, UseFormReturn, FieldErrors } from "react-hook-form";

// export interface Option {
//   value: string;
//   label: string;
// }

// export interface FormSelectInputProps<T> {
//   name: Path<T>;
//   form: UseFormReturn<T>;
//   labelText: string;
//   options: Option[];
//   disabled?: boolean;
// }

// export default function FormSelectInput<T>({
//   name,
//   form,
//   labelText,
//   options,
//   disabled,
// }: FormSelectInputProps<T>) {
//   const { register, formState: { errors } } = form;

//   // Use a type assertion to safely access the error message
//   const errorMessage = (errors[name as keyof FieldErrors<T>] as any)?.message;

//   return (
//     <div className="form-control w-full">
//       <label htmlFor={name} className="label">
//         <span className="label-text">{labelText}</span>
//       </label>
//       <select
//         id={name}
//         {...register(name, { required: `${labelText} is required` })}
//         disabled={disabled}
//         className={`select select-bordered w-full ${errorMessage ? "select-error" : ""}`}
//       >
//         <option value="" disabled>
//           Select an option
//         </option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {errorMessage && (
//         <p className="text-error mt-1 text-sm">{errorMessage}</p>
//       )}
//     </div>
//   );
// }
