"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");
  return (
    <section className="shell error-page">
      <p className="mono">SYS / ERROR</p>
      <h1>{t("errorTitle")}</h1>
      <p>{t("errorDescription")}</p>
      <button className="button button-primary" onClick={reset}>
        {t("retry")}
      </button>
    </section>
  );
}
