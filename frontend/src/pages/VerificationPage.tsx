import { useSearch } from "wouter";
import { useVerifyMutation } from "../api/verify";
import type { VerificationArgs } from "../types/AppRouter";
import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";

export default function VerificationPage({ url, method }: VerificationArgs) {
  const searchParams = useSearch();
  const [verify, { data, isSuccess, isError, error }] = useVerifyMutation();

  const errorMssg = error?.message ?? "Invalid Verification URL";

  useEffect(() => {
    verify({ url, method, searchParams });
  }, [verify, url, method, searchParams]);

  if (isSuccess) {
    return <p className="text-success">{data.message}</p>;
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
