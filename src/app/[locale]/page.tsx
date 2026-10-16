import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CircuitBoard,
  Code2,
  Cpu,
  GitFork,
  GraduationCap,
  Link2,
  MapPin,
  ScanLine,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig, type Locale } from "@/config/site";
import { BlueprintArm } from "@/components/blueprint-arm";
import { CopyEmail } from "@/components/contact-links";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const cv = siteConfig.cv[locale];
  const nameBreak = siteConfig.name.lastIndexOf(" ");
  const givenName = nameBreak < 0 ? siteConfig.name : siteConfig.name.slice(0, nameBreak);
  const surname = nameBreak < 0 ? "" : siteConfig.name.slice(nameBreak + 1);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.contact.github,
      siteConfig.contact.linkedin,
      siteConfig.contact.orcid,
    ].filter(Boolean),
    knowsAbout: ["Mechatronics", "Rust", "Embedded systems", "Robotics"],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.domain,
    url: siteConfig.url,
    inLanguage: ["tr", "en"],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([person, website]).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero shell" id="top" aria-labelledby="hero-title">
        <div className="hero-topline mono">
          <span>
            <i className="signal-square" aria-hidden="true" />
            {t("hero.eyebrow")}
          </span>
          <span className="edition">{t("hero.edition")}</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="hero-greeting">{t("hero.greeting")}</span>
              {givenName}
              <br />
              <span className="surname">
                {surname}
                <span className="accent-period">.</span>
              </span>
            </h1>
            <p className="hero-headline">{t("hero.headline")}</p>
            <p className="hero-description">{t("hero.description")}</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                {t("hero.explore")}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="#contact" className="button button-secondary">
                {t("hero.contact")}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              {cv && (
                <a className="button button-secondary" href={cv} download>
                  {t("common.downloadCv")}
                </a>
              )}
            </div>
            <div className="hero-location mono">
              <MapPin size={13} aria-hidden="true" />
              {siteConfig.location[locale]}
              <span className="location-line" aria-hidden="true" />
              {siteConfig.timezone}
            </div>
          </div>
          <figure className="hero-instrument registration">
            <div className="instrument-top mono">
              <span>{t("hero.instrumentTitle")}</span>
              <ScanLine size={16} aria-hidden="true" />
            </div>
            <BlueprintArm label={t("hero.modelLabel")} />
            <figcaption>
              <span className="mono figure-title">{t("hero.figure")}</span>
              <span className="model-label mono">
                <span aria-hidden="true">↳ </span>
                {t("hero.annotation")}
              </span>
            </figcaption>
            <div className="instrument-scale mono" aria-hidden="true">
              <span>01</span>
              <i />
              <span>02</span>
              <i />
              <span>03</span>
              <i />
              <span>04</span>
              <i />
              <span>05</span>
              <i />
              <span>06</span>
            </div>
          </figure>
        </div>
        <div className="hero-baseline mono">
          <span>{t("hero.kicker")}</span>
          <a href="#about" aria-label={t("nav.about")}>
            <ArrowDown size={17} aria-hidden="true" />
          </a>
          <span className="hero-coordinates" aria-hidden="true">
            {t("hero.systemLabel")}
          </span>
        </div>
      </section>

      <section
        className="about-section shell section-space"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="section-label mono">
          <span>{t("about.eyebrow")}</span>
          <span className="section-rule" />
        </div>
        <div className="about-grid">
          <div>
            <h2 id="about-title">{t("about.title")}</h2>
            <p className="section-description">{t("about.description")}</p>
            <div className="discipline-list mono">
              <span>
                <Cpu size={14} aria-hidden="true" />
                {t("about.embeddedFocus")}
              </span>
              <span>
                <CircuitBoard size={14} aria-hidden="true" />
                {t("about.roboticsFocus")}
              </span>
              <span>
                <Code2 size={14} aria-hidden="true" />
                {t("about.openSourceFocus")}
              </span>
            </div>
          </div>
          <aside className="education-panel registration" aria-labelledby="education-title">
            <div className="education-heading mono">
              <GraduationCap size={17} aria-hidden="true" />
              <h3 id="education-title">{t("about.education")}</h3>
            </div>
            <ol className="education-timeline">
              {siteConfig.education.map((education, index) => (
                <li key={education.institution}>
                  <h4>{index === 0 ? t("about.firstEducation") : t("about.secondEducation")}</h4>
                  <p>
                    {education.programme[locale]}
                    {education.degree && <span> · {education.degree[locale]}</span>}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section
        className="projects-section shell section-space"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="section-label mono">
          <span>{t("projects.eyebrow")}</span>
          <span className="section-rule" />
          <GitFork size={15} aria-hidden="true" />
        </div>
        <div className="section-heading-row">
          <h2 id="projects-title">{t("projects.title")}</h2>
          <p className="section-description">{t("projects.description")}</p>
        </div>
        <div className="project-grid">
          <article className="project-card project-featured registration">
            <div className="project-topline mono">
              <span>{t("projects.openSource")}</span>
              <span>{siteConfig.projects.recoverTick.stage[locale]}</span>
            </div>
            <div className="rust-visual" aria-hidden="true">
              <span className="rust-code">#![no_std]</span>
              <div className="rust-word">
                {t("projects.rustLanguage")}
                <span>.</span>
              </div>
              <span className="rust-baseline mono">{t("projects.rustBaseline")}</span>
              <div className="visual-cross" />
            </div>
            <div className="project-body">
              <div className="project-number mono" aria-hidden="true">
                {t("projects.recoverTickFigure")}
              </div>
              <h3>{t("projects.recoverTickTitle")}</h3>
              <p>{t("projects.recoverTickDescription")}</p>
              <div className="project-bottom">
                <span className="mono">{t("projects.recoverTickMeta")}</span>
                <a
                  href={siteConfig.projects.recoverTick.repository}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t("projects.recoverTickTitle")} — ${t("projects.repository")}`}
                >
                  <ArrowUpRight size={23} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
          <article className="project-card project-robot registration">
            <div className="project-topline mono">
              <span>{t("projects.openSource")}</span>
              <span>{siteConfig.projects.openRobotKit.stage[locale]}</span>
            </div>
            <div className="robot-visual" aria-hidden="true">
              <svg viewBox="0 0 400 200" fill="none">
                <g stroke="var(--line-strong)">
                  <path d="M0 50h130l50 50h220M0 150h130l50-50M200 0v48m0 104v48M400 30h-70l-50 50M400 170h-70l-50-50" />
                  <path d="M160 60h80v80h-80zM168 68h64v64h-64z" fill="var(--surface-2)" />
                </g>
                <g stroke="var(--accent)">
                  <path d="m185 87-13 13 13 13m30-26 13 13-13 13m-6-34-18 42" />
                  <circle cx="100" cy="50" r="3" />
                  <circle cx="330" cy="170" r="3" />
                </g>
              </svg>
            </div>
            <div className="project-body">
              <div className="project-number mono" aria-hidden="true">
                {t("projects.openRobotKitFigure")}
              </div>
              <h3>{t("projects.openRobotKitTitle")}</h3>
              <p>{t("projects.openRobotKitDescription")}</p>
              <div className="project-bottom">
                <span className="mono">{t("projects.openRobotKitMeta")}</span>
                <a
                  href={siteConfig.projects.openRobotKit.repository}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t("projects.openRobotKitTitle")} — ${t("projects.repository")}`}
                >
                  <ArrowUpRight size={23} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>
        {siteConfig.contact.github && (
          <a
            className="text-link projects-more"
            href={siteConfig.contact.github}
            target="_blank"
            rel="noreferrer"
          >
            {t("projects.viewAll")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </section>

      <section
        className="contact-section shell section-space"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="section-label mono">
          <span>{t("contact.eyebrow")}</span>
          <span className="section-rule" />
        </div>
        <div className="contact-grid">
          <div>
            <h2 id="contact-title">{t("contact.title")}</h2>
            <p className="section-description">{t("contact.description")}</p>
          </div>
          <div className="contact-details">
            {siteConfig.contact.email && (
              <div className="email-row">
                <a className="contact-email" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </a>
                <CopyEmail email={siteConfig.contact.email} />
              </div>
            )}
            <div className="social-links">
              {siteConfig.contact.github && (
                <a href={siteConfig.contact.github} target="_blank" rel="noreferrer">
                  <GitFork size={16} aria-hidden="true" />
                  {t("common.github")}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
              {siteConfig.contact.linkedin && (
                <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer">
                  <Link2 size={16} aria-hidden="true" />
                  {t("common.linkedin")}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
