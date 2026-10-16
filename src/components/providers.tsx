"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { resolveEffectsMode, type EffectsMode } from "@/lib/device";

type ExtendedNavigator = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    addEventListener?: typeof window.addEventListener;
    removeEventListener?: typeof window.removeEventListener;
  };
};

const changeEvent = "mac:effects";
const EffectsContext = createContext<{ mode: EffectsMode; toggle: () => void }>({
  mode: "lite",
  toggle: () => undefined,
});

function getSnapshot(): EffectsMode {
  const device = navigator as ExtendedNavigator;
  let preference: EffectsMode | null = null;
  try {
    const saved = localStorage.getItem("mac-effects");
    if (saved === "full" || saved === "lite") preference = saved;
  } catch {
    /* Browser storage may be unavailable in private contexts. */
  }
  return resolveEffectsMode(
    {
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      hardwareConcurrency: device.hardwareConcurrency,
      ...(device.deviceMemory === undefined ? {} : { deviceMemory: device.deviceMemory }),
      ...(device.connection?.saveData === undefined
        ? {}
        : { saveData: device.connection.saveData }),
    },
    preference,
  );
}

function subscribe(listener: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", listener);
  reduced.addEventListener("change", listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", listener);
    reduced.removeEventListener("change", listener);
  };
}

export function useEffects() {
  return useContext(EffectsContext);
}

function SmoothScroll({ mode }: { mode: EffectsMode }) {
  useEffect(() => {
    if (mode !== "full" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        lerp: 0.1,
        autoRaf: true,
        anchors: true,
        smoothWheel: true,
        syncTouch: false,
      });
      const onVisibility = () => (document.hidden ? lenis.stop() : lenis.start());
      document.addEventListener("visibilitychange", onVisibility);
      destroy = () => {
        document.removeEventListener("visibilitychange", onVisibility);
        lenis.destroy();
      };
    });
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [mode]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore<EffectsMode>(subscribe, getSnapshot, () => "lite");
  useEffect(() => {
    document.documentElement.dataset.effects = mode;
  }, [mode]);
  function toggle() {
    try {
      localStorage.setItem("mac-effects", mode === "full" ? "lite" : "full");
    } catch {
      /* Keep navigation usable when storage is blocked. */
    }
    window.dispatchEvent(new Event(changeEvent));
  }
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <EffectsContext.Provider value={{ mode, toggle }}>
        <SmoothScroll mode={mode} />
        {children}
      </EffectsContext.Provider>
    </ThemeProvider>
  );
}
