import type { VerificationArgs } from "../types/AppRouter";

import { useSearch } from "wouter";
import { useVerifyQuery } from "../api/verify";
import { MdErrorOutline } from "react-icons/md";

export default function VerificationPage({ url, method }: VerificationArgs) {
  const searchParams = useSearch();
  const { isSuccess, isError, error } = useVerifyQuery({ url, method, searchParams });

  const errorMssg = error?.message ?? "Invalid Verification URL";

  if (isSuccess) {
    return <p className="text-success">Success!</p>;
  }

  if (isError) {
    return (
      <div className="flex items-center gap-1 text-lg text-error">
        <MdErrorOutline />
        <p>{errorMssg}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-lg">
      <span>Loading</span>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}
