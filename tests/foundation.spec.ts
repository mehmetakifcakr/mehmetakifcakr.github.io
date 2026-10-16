import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("applies HTTPS enforcement to deployed hosts while keeping loopback usable", async ({
  request,
}) => {
  const local = await request.get("/tr");
  expect(local.headers()["content-security-policy"]).not.toContain("upgrade-insecure-requests");
  const deployed = await request.get("/tr", { headers: { host: "macakr.me" } });
  expect(deployed.headers()["content-security-policy"]).toContain("upgrade-insecure-requests");
  expect(deployed.headers()["strict-transport-security"]).toContain("max-age=63072000");
});

test("home, locale, theme and command navigation work without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/tr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Mehmet Akif");
  await page.getByRole("link", { name: /Dil: English/ }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("button", { name: "Theme: Dark" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.keyboard.press("ControlOrMeta+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("dialog").getByRole("textbox").fill("Projects");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [360, 768, 1280, 1920]) {
  test(`layout remains inside the viewport at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tr");
    const widths = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(widths.content).toBeLessThanOrEqual(widths.viewport);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `artifacts/phase-1/${testInfo.project.name}/tr-${width}.png`,
      fullPage: true,
    });
  });
}

test("core content and navigation are readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto("/tr");
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "İletişim", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Çakır");
  await expect(page.getByRole("link", { name: "RecoverTick — Depoyu incele" })).toBeVisible();
  await page.getByRole("link", { name: "Projeleri incele", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await context.close();
});

for (const theme of ["dark", "light"]) {
  test(`home meets automated WCAG checks in ${theme} mode`, async ({ page }, testInfo) => {
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/tr");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page.screenshot({ path: `artifacts/phase-1/${testInfo.project.name}/tr-${theme}.png` });
  });
}

test("reduced motion overrides a stored Full effects choice", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("mac-effects", "full"));
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-effects", "lite");
});
