"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="email-copy">
      <button
        className="icon-button"
        aria-label={copied ? t("copied") : t("copyEmail")}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setFailed(false);
          } catch {
            setFailed(true);
          }
        }}
      >
        {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      </button>
      <span className="sr-only" role="status">
        {copied ? t("copied") : ""}
      </span>
      {failed && <a href={`mailto:${email}`}>{t("email")}</a>}
    </div>
  );
}
