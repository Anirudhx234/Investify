import type { routerTypes } from "../types";

import { useLocation, useSearch } from "wouter";
import useRequests from "../hooks/useRequests";
import { useVerifyClientQuery } from "../api/auth";

export default function VerificationPage({
  url,
}: routerTypes.VerificationArgs) {
  const search = useSearch();
  const [, navigate] = useLocation();

  const verifyClientState = useVerifyClientQuery({
    url,
    search,
  });

  useRequests({
    requests: {
      Verifying: verifyClientState,
    },
    onSuccess: () => navigate("/"),
    successMssg: "Client verified!",
  });

  return <p>Processing...</p>;
}
