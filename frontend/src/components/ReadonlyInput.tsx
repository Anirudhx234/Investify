import { twMerge } from "../util/twMerge";

type ReadonlyInputProps = {
  name: string;
  label: string;
  value?: string | undefined;
  className?: string | undefined;
};

export function ReadonlyInput({
  name,
  label,
  value,
  className,
}: ReadonlyInputProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span>{label}</span>
      </div>
      <input
        className={twMerge(
          "input input-bordered cursor-not-allowed bg-base-200 text-neutral",
          className,
        )}
        value={value}
        readOnly
        name={name}
      />
    </label>
  );
}
