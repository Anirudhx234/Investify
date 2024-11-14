import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useState } from "react";

export default function useFormReset<T extends FieldValues>(
  form: UseFormReturn<T>,
  data: T | undefined,
) {
  const [prevData, setPrevData] = useState<object | undefined>();
  if (prevData !== data) {
    setPrevData(data);
    form.reset(data);
  }
}
