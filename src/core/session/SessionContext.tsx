import { createContext, useContext, type ReactNode } from "react";

import { useSession, type UseSessionResult } from "./index";

const SessionContext = createContext<UseSessionResult | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSessionContext(): UseSessionResult {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSessionContext must be used inside <SessionProvider>");
  }
  return value;
}