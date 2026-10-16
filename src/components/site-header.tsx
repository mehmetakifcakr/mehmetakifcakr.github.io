"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { ArrowUpRight, Command, Menu, Moon, Sun, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { siteConfig, type Locale } from "@/config/site";
import { useEffects } from "./providers";
const CommandPalette = dynamic(() => import("./command-palette"), { ssr: false });

const sections = ["about", "projects", "contact"] as const;
const emptySubscribe = () => () => undefined;

export function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { mode, toggle } = useEffects();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState<string>("");
  const previousFocus = useRef<HTMLElement | null>(null);
  const nextLocale = locale === "tr" ? "en" : "tr";
  const selectedTheme = mounted ? (theme ?? "dark") : "dark";

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (
          document.activeElement instanceof HTMLElement &&
          !document.activeElement.closest('[role="dialog"]')
        )
          previousFocus.current = document.activeElement;
        setPaletteOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  function cycleTheme() {
    setTheme(selectedTheme === "dark" ? "light" : selectedTheme === "light" ? "system" : "dark");
  }

  function switchLocale(event?: MouseEvent<HTMLAnchorElement>) {
    if (event && (window.location.search || window.location.hash)) {
      event.preventDefault();
      router.push(`${pathname}${window.location.search}${window.location.hash}`, {
        locale: nextLocale,
      });
    }
  }

  const commands = [
    ...sections.map((section) => ({
      label: t(`nav.${section}`),
      href: `/#${section}`,
      action: null,
    })),
    {
      label: `${t("controls.theme")}: ${t(`controls.${selectedTheme}`)}`,
      href: null,
      action: cycleTheme,
    },
    { label: `${t("controls.effects")}: ${t(`controls.${mode}`)}`, href: null, action: toggle },
    ...(siteConfig.contact.email
      ? [
          {
            label: t("command.copyEmail"),
            href: null,
            action: async () => {
              try {
                await navigator.clipboard.writeText(siteConfig.contact.email!);
                setCopied(true);
              } catch {
                window.location.assign(`mailto:${siteConfig.contact.email}`);
              }
            },
          },
        ]
      : []),
  ].filter(({ label }) =>
    label.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale)),
  );

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="wordmark" aria-label={`mac+akr.me — ${siteConfig.name}`}>
            mac<span className="wordmark-cross">+</span>
            <span className="wordmark-domain">akr.me</span>
          </Link>
          <nav className="desktop-nav" aria-label={t("nav.menu")}>
            {sections.map((section) => (
              <Link
                key={section}
                href={`/#${section}`}
                prefetch={false}
                className={active === section ? "nav-link active" : "nav-link"}
                aria-current={active === section ? "location" : undefined}
              >
                {t(`nav.${section}`)}
              </Link>
            ))}
          </nav>
          <div className="header-controls">
            <button
              className="command-trigger"
              onClick={(event) => {
                previousFocus.current = event.currentTarget;
                setPaletteOpen(true);
              }}
              aria-label={t("nav.command")}
            >
              <Command size={14} aria-hidden="true" />
              <span>K</span>
            </button>
            <span className="control-divider" aria-hidden="true" />
            <Link
              href={pathname}
              locale={nextLocale}
              hrefLang={nextLocale}
              lang={nextLocale}
              className="locale-switch"
              onClick={switchLocale}
              aria-label={`${locale.toUpperCase()} / ${nextLocale.toUpperCase()} — ${t("controls.language")}: ${nextLocale === "en" ? "English" : "Türkçe"}`}
            >
              {locale.toLocaleUpperCase(locale)}
              <span aria-hidden="true">/</span>
              <span>{nextLocale.toLocaleUpperCase(nextLocale)}</span>
            </Link>
            <button
              className="icon-button theme-button"
              onClick={cycleTheme}
              aria-label={`${t("controls.theme")}: ${t(`controls.${selectedTheme}`)}`}
              title={`${t("controls.theme")}: ${t(`controls.${selectedTheme}`)}`}
            >
              {selectedTheme === "light" ? (
                <Sun size={17} aria-hidden="true" />
              ) : (
                <Moon size={17} aria-hidden="true" />
              )}
            </button>
            <button
              className="icon-button mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          hidden={!menuOpen}
          aria-label={t("nav.menu")}
        >
          {sections.map((section) => (
            <Link
              key={section}
              href={`/#${section}`}
              prefetch={false}
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${section}`)}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
          <button onClick={toggle}>
            {t("controls.effects")}
            <span>{t(`controls.${mode}`)}</span>
          </button>
        </nav>
        <noscript>
          <nav className="no-js-nav" aria-label={t("nav.menu")}>
            {sections.map((section) => (
              <Link key={section} href={`/#${section}`} prefetch={false}>
                {t(`nav.${section}`)}
              </Link>
            ))}
          </nav>
        </noscript>
      </header>
      {paletteOpen && (
        <CommandPalette
          paletteOpen={paletteOpen}
          setPaletteOpen={setPaletteOpen}
          query={query}
          setQuery={setQuery}
          copied={copied}
          setCopied={setCopied}
          previousFocus={previousFocus}
          commands={commands}
          pathname={pathname}
          nextLocale={nextLocale}
          switchLocale={switchLocale}
        />
      )}
    </>
  );
}
