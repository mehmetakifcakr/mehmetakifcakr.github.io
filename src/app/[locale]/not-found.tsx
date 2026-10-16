import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("errors");
  return (
    <section className="shell error-page">
      <p className="mono">404 / MAC</p>
      <h1>{t("notFoundTitle")}</h1>
      <p>{t("notFoundDescription")}</p>
      <Link href="/" className="button button-primary">
        {t("backHome")}
      </Link>
    </section>
  );
}
