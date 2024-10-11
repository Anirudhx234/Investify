import { useSearch } from "wouter";
import { useVerifyNewEmailMutation } from "../api/profile";
import { MdErrorOutline } from "react-icons/md";
import { useEffect } from "react";

export default function VerifyNewEmailRoute() {
  const searchParams = useSearch();
  const [verifyNewEmail, { isError, isSuccess }] = useVerifyNewEmailMutation();

  useEffect(() => {
    verifyNewEmail({ searchParams });
  }, [verifyNewEmail, searchParams]);

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