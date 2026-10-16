"use client";

import { type Dispatch, type SetStateAction, type RefObject, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight, Check, Command, Copy, Search, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/config/site";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";

interface CommandPaletteProps {
  paletteOpen: boolean;
  setPaletteOpen: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  copied: boolean;
  setCopied: Dispatch<SetStateAction<boolean>>;
  previousFocus: RefObject<HTMLElement | null>;
  commands: { label: string; href: string | null; action: (() => void | Promise<void>) | null }[];
  pathname: string;
  nextLocale: Locale;
  switchLocale: (event?: MouseEvent<HTMLAnchorElement>) => void;
}

export default function CommandPalette({
  paletteOpen,
  setPaletteOpen,
  query,
  setQuery,
  copied,
  setCopied,
  previousFocus,
  commands,
  pathname,
  nextLocale,
  switchLocale,
}: CommandPaletteProps) {
  const t = useTranslations();
  return (
    <Dialog
      open={paletteOpen}
      onOpenChange={(open) => {
        setPaletteOpen(open);
        if (!open) {
          setQuery("");
          setCopied(false);
        }
      }}
    >
      <DialogContent
        closeLabel={t("nav.close")}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          previousFocus.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(
              "[data-command-item]",
            ),
          );
          if (!items.length) return;
          event.preventDefault();
          const index = items.indexOf(document.activeElement as HTMLButtonElement);
          items[
            (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length
          ]?.focus();
        }}
      >
        <DialogTitle className="command-title">
          <Command size={17} aria-hidden="true" />
          {t("command.title")}
        </DialogTitle>
        <DialogDescription className="sr-only">{t("command.search")}</DialogDescription>
        <label className="command-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{t("command.search")}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("command.search")}
          />
        </label>
        <p className="mono command-group">
          {t("command.sections")} / {t("command.actions")}
        </p>
        <div className="command-items">
          {commands.map((command) =>
            command.href ? (
              <Link
                data-command-item
                href={command.href}
                key={command.label}
                onClick={() => setPaletteOpen(false)}
              >
                {command.label}
                <ArrowDown size={16} aria-hidden="true" />
              </Link>
            ) : (
              <button
                data-command-item
                key={command.label}
                onClick={() => {
                  void command.action?.();
                }}
              >
                {command.label}
                {command.label === t("command.copyEmail") ? (
                  copied ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <Copy size={16} aria-hidden="true" />
                  )
                ) : (
                  <Zap size={16} aria-hidden="true" />
                )}
              </button>
            ),
          )}
          {!commands.length && <p className="command-empty">{t("command.empty")}</p>}
          <Link data-command-item href={pathname} locale={nextLocale} onClick={switchLocale}>
            {nextLocale === "en" ? "English" : "Türkçe"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <p role="status" className="sr-only">
          {copied ? t("command.copied") : ""}
        </p>
      </DialogContent>
    </Dialog>
  );
}
