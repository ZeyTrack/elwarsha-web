import { api } from "@core/api";
import { messages, type Locale } from "@core/i18n";
import { Button } from "@ui/components/Button/Button";

export function SignedOutScreen({ locale }: { locale: Locale }) {
  const copy = messages[locale].auth;
  return (
    <section aria-labelledby="signed-out-title">
      <h1 id="signed-out-title">{copy.signedOutTitle}</h1>
      <p role="status">{copy.signedOutBody}</p>
      <a href={api.loginUrl({ locale })}>
        <Button type="button">{copy.signIn}</Button>
      </a>
    </section>
  );
}