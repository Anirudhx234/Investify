import type { routerTypes } from "../types";

import { useLocation, useSearch } from "wouter";
import { useVerifyClientQuery } from "../api/auth";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function VerificationPage({ url }: routerTypes.VerificationArgs) {
  const search = useSearch();
  const [, navigate] = useLocation();

  const verifyClientState = useVerifyClientQuery({
    url,
    search,
  });

  const { component } = useToastForRequest("Verifying", verifyClientState, {
    onSuccess: () => navigate("/"),
    backupSuccessMessage: "Client verified!",
  });

  return component;
}
