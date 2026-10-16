import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { env } from "@/config/env";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

const sans = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "optional",
  preload: false,
});
const mono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "optional",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: { default: t("title"), template: `%s — ${siteConfig.name}` },
    description: t("description"),
    applicationName: siteConfig.domain,
    authors: [
      {
        name: siteConfig.name,
        ...(siteConfig.contact.github ? { url: siteConfig.contact.github } : {}),
      },
    ],
    alternates: { canonical: `/${locale}`, languages: { tr: "/tr", en: "/en", "x-default": "/" } },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      siteName: siteConfig.domain,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
    },
    twitter: { card: "summary", title: t("title"), description: t("description") },
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale });
  return (
    <html lang={locale} suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <a className="skip-link" href="#main-content">
              {t("common.skip")}
            </a>
            <SiteHeader />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter deployedAt={env.DEPLOYED_AT ?? siteConfig.deployment.lastDeployedAt} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
