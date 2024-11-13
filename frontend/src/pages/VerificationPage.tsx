import type { routerTypes } from "../types";

export default function VerificationPage({
  url,
  method,
  form,
}: routerTypes.VerificationArgs) {
  if (form) return <></>;
  return <></>;
}

function VerificationNoForm({
  url,
  method,
}: Omit<routerTypes.VerificationArgs, "form">) {}

function VerificationWithForm({
  url,
  method,
  form,
}: routerTypes.VerificationArgs) {}
