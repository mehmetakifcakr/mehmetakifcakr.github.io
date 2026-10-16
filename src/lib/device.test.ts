import { describe, expect, it } from "vitest";
import { resolveEffectsMode } from "./device";
import tr from "../messages/tr.json";
import en from "../messages/en.json";

function keys(value: object, prefix = ""): string[] {
  return Object.entries(value)
    .flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof child === "object" && child !== null ? keys(child, path) : [path];
    })
    .sort();
}

describe("effects policy", () => {
  it("respects reduced motion and data saving even when Full is selected", () => {
    expect(resolveEffectsMode({ reducedMotion: true }, "full")).toBe("lite");
    expect(resolveEffectsMode({ reducedMotion: false, saveData: true }, "full")).toBe("lite");
  });

  it("starts low-capability devices in Lite and permits a deliberate override", () => {
    expect(resolveEffectsMode({ reducedMotion: false, hardwareConcurrency: 4 }, null)).toBe("lite");
    expect(resolveEffectsMode({ reducedMotion: false, deviceMemory: 4 }, null)).toBe("lite");
    expect(resolveEffectsMode({ reducedMotion: false, hardwareConcurrency: 4 }, "full")).toBe(
      "full",
    );
  });

  it("does not infer poor capability from missing browser hints", () => {
    expect(resolveEffectsMode({ reducedMotion: false }, null)).toBe("full");
  });
});

describe("localization contract", () => {
  it("keeps every public interface message available in both locales", () => {
    expect(keys(tr)).toEqual(keys(en));
  });
});
