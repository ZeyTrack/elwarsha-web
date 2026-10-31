import { Outlet, useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { useSessionContext } from "@core/session/SessionContext";
import { SignedOutScreen } from "@ui/patterns/SignedOutScreen";

export function ProtectedRoute() {
  const { locale } = useParams<{ locale: Locale }>();
  const copy = messages[locale === "en" ? "en" : "ar"].auth;
  const { status } = useSessionContext();

  if (status === "loading") {
    return <p role="status">{copy.loading}</p>;
  }
  if (status === "unauthenticated") {
    return <SignedOutScreen locale={locale === "en" ? "en" : "ar"} />;
  }
  if (status === "error") {
    return <p role="alert">{copy.error}</p>;
  }
  return <Outlet />;
}