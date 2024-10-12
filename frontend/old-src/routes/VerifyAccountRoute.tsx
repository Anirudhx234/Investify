import { useSearch } from "wouter";
import { useVerifyQuery } from "../api/auth";
import { MdErrorOutline } from "react-icons/md";

export default function VerifyAccountRoute() {
  const searchParams = useSearch();
  const { isError, isSuccess } = useVerifyQuery({ searchParams });

  if (isError) {
    return (
      <div className="flex items-center gap-1 text-lg text-error">
        <MdErrorOutline />
        <p>Invalid Verification URL</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center gap-1 text-lg">
        <p className="text-success">Your account was verified!</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-lg">
      <span className="loading loading-spinner"></span>
      <p>Loading...</p>
    </div>
  );
}
