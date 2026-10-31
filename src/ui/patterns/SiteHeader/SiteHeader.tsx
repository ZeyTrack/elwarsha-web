import { NavLink, useNavigate } from "react-router-dom";
import { api } from "@core/api";
import { messages, type Locale } from "@core/i18n";
import { Badge } from "@ui/components/Badge/Badge";
import { useSessionContext } from "@core/session/SessionContext";
import styles from "./SiteHeader.module.css";

export function SiteHeader({
  locale,
  onToggleLocale,
}: {
  locale: Locale;
  onToggleLocale: () => void;
}) {
  const copy = messages[locale];
  const prefix = `/${locale}`;
  const session = useSessionContext();
    const navigate = useNavigate();

  async function handleSignOut() {
    await session.logout();
    navigate(`${prefix}/`);
  }

  return (
    <header className={styles.header}>
      <NavLink className={styles.brand} to={`${prefix}/`}>
        <span className={styles.mark} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {copy.brand}
      </NavLink>
      <nav className={styles.nav} aria-label={copy.brand}>
        <NavLink to={`${prefix}/initiative/`}>{copy.nav.initiative}</NavLink>
        <NavLink to={`${prefix}/roadmap/`}>{copy.nav.roadmap}</NavLink>
        <NavLink to={`${prefix}/participation/`}>{copy.nav.participation}</NavLink>
        <NavLink to={`${prefix}/faq/`}>{copy.nav.faq}</NavLink>
        <NavLink to={`${prefix}/portal/`}>{copy.nav.portal}</NavLink>
      </nav>
      <div className={styles.actions}>
        <button className={styles.lang} type="button" onClick={onToggleLocale}>
          <Badge>{copy.language}</Badge>
        </button>
        <NavLink className={styles.applyBtn} to={`${prefix}/apply/`}>
          {copy.nav.apply}
        </NavLink>
        {session.status === "authenticated" ? (
          <>
            <span>{session.session.user.displayName}</span>
            <button className={styles.lang} type="button" onClick={() => void handleSignOut()}>
              {copy.auth.signOut}
            </button>
          </>
        ) : session.status === "unauthenticated" ? (
          <a className={styles.applyBtn} href={api.loginUrl({ locale })}>
            {copy.auth.signIn}
          </a>
        ) : null}
      </div>
    </header>
  );
}
