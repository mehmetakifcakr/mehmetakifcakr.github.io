"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useEffects } from "./providers";

function subscribe(listener: () => void) {
  const interval = window.setInterval(listener, 60_000);
  return () => window.clearInterval(interval);
}
function getTime() {
  return new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function SiteFooter({ deployedAt }: { deployedAt: string | null }) {
  const t = useTranslations();
  const locale = useLocale();
  const { mode, toggle } = useEffects();
  const time = useSyncExternalStore(subscribe, getTime, () => "UTC+03");
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <a href="#top" className="wordmark">
            mac<span className="wordmark-cross">+</span>
            <span className="wordmark-domain">akr.me</span>
          </a>
          <p>{t("footer.tagline")}</p>
          {siteConfig.contact.github && (
            <a href={siteConfig.contact.github} target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
        <div className="telemetry-strip mono">
          <span>
            <i className="status-dot" aria-hidden="true" />
            {t("footer.time")}: <span>{time}</span>{" "}
            <span className="telemetry-zone">{t("footer.timezone")}</span>
          </span>
          {deployedAt && (
            <span>
              {t("footer.deploy")}:{" "}
              {new Intl.DateTimeFormat(locale, {
                dateStyle: "medium",
                timeZone: siteConfig.timezone,
              }).format(new Date(deployedAt))}
            </span>
          )}
          <button onClick={toggle}>
            <Zap size={12} aria-hidden="true" />
            {t("footer.effects")}: {t(`controls.${mode}`)}
          </button>
        </div>
      </div>
    </footer>
  );
}
