import type { routerTypes } from "../types";

import { useLocation, useSearch } from "wouter";
import useRequests from "../hooks/useRequests";
import { useVerifyClientQuery } from "../api/auth";
import { useCallback, useMemo } from "react";

export default function VerificationPage({
  url,
}: routerTypes.VerificationArgs) {
  const search = useSearch();
  const [, navigate] = useLocation();

  const verifyClientState = useVerifyClientQuery({
    url,
    search,
  });

  const onSuccess = useCallback(() => navigate("/"), [navigate]);

  const requestStates = useMemo(
    () => ({ Verifying: verifyClientState }),
    [verifyClientState],
  );

  const { message } = useRequests({
    requestStates,
    onSuccess,
    successMessage: "Client verified!",
  });

  return <p className="text-xl font-bold">{message}</p>;
}
