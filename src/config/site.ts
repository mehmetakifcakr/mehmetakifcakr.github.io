export type Locale = "tr" | "en";

export type Localized<T> = Record<Locale, T>;

export type ProjectStatus = "completed" | "in-progress" | "concept";

export interface Education {
  institution: string;
  programme: Localized<string>;
  degree: Localized<string> | null;
  startYear: number | null;
  endYear: number | null;
}

export interface OpenSourceProject {
  id: string;
  name: string;
  repository: string;
  description: Localized<string>;
  stage: Localized<string>;
  technologies: readonly string[];
  version: string | null;
  crateName: string | null;
  crateUrl: string | null;
}

export interface CompetitionProject {
  id: string;
  slug: string;
  title: Localized<string>;
  scope: Localized<string>;
  competition: string | null;
  year: number | null;
  role: Localized<string> | null;
  status: ProjectStatus | null;
  result: Localized<string> | null;
  problem: Localized<string> | null;
  constraints: Localized<readonly string[]> | null;
  architecture: Localized<string> | null;
  technologies: readonly string[] | null;
  lessons: Localized<readonly string[]> | null;
  nextSteps: Localized<readonly string[]> | null;
  repository: string | null;
  media: readonly string[] | null;
}

export interface CinemaMedia {
  title: Localized<string>;
  poster: string;
  webm: string | null;
  mp4: string | null;
}

interface SiteConfig {
  name: string;
  monogram: string;
  domain: string;
  url: string;
  timezone: string;
  headline: Localized<string>;
  location: Localized<string>;
  contact: {
    email: string | null;
    github: string | null;
    linkedin: string | null;
    youtube: string | null;
    instagram: string | null;
    x: string | null;
    orcid: string | null;
  };
  cv: Localized<string | null>;
  photo: { src: string; alt: Localized<string> } | null;
  availability: Localized<string> | null;
  education: readonly Education[];
  now: { building: Localized<string> | null; learning: Localized<string> | null };
  openSource: readonly OpenSourceProject[];
  projects: {
    recoverTick: OpenSourceProject;
    openRobotKit: OpenSourceProject;
    aiTraderPaper: OpenSourceProject;
  };
  competitionProjects: readonly CompetitionProject[];
  expertise: {
    embedded: readonly string[];
    biomedical: readonly string[];
    cinema: readonly string[];
    ev: readonly string[];
    workshop: readonly string[];
  };
  media: {
    shoulderModel: string | null;
    cinema: readonly CinemaMedia[] | null;
  };
  models: {
    battery: {
      classification: "illustrative";
      capacityAh: number;
      internalResistanceOhms: number;
      emptyOcv: number;
      fullOcv: number;
    };
    motor: {
      classification: "illustrative";
      torqueNm: number;
      baseSpeedRpm: number;
      maximumSpeedRpm: number;
    };
  };
  references: readonly { url: string; principles: string }[] | null;
  deployment: { lastDeployedAt: string | null };
}

const recoverTick: OpenSourceProject = {
  id: "recovertick",
  name: "RecoverTick",
  repository: "https://github.com/mehmetakifcakr/recovertick",
  description: {
    tr: "Gömülü kontrolcüler için bağımlılıksız Rust karar motoru. Deterministik durum geçişleri, sınırlı kurtarma ve doğrulanabilir tekrar yürütme.",
    en: "A zero-dependency Rust decision engine for embedded controllers. Deterministic transitions, bounded recovery and verified replay.",
  },
  stage: { tr: "MVP", en: "MVP" },
  technologies: ["Rust", "no_std", "Embedded"],
  version: "0.1.0",
  crateName: null,
  crateUrl: null,
};

const openRobotKit: OpenSourceProject = {
  id: "openrobotkit",
  name: "OpenRobotKit",
  repository: "https://github.com/mehmetakifcakr/OpenRobotKit",
  description: {
    tr: "Yeniden kullanılabilir robotik araçları için erken aşamada bir başlangıç. Mevcut Python motor soyutlaması üzerine geliştiriliyor.",
    en: "An early foundation for reusable robotics tools, starting with a small Python motor abstraction.",
  },
  stage: { tr: "Erken geliştirme", en: "Early development" },
  technologies: ["Python", "Robotics"],
  version: null,
  crateName: null,
  crateUrl: null,
};

const aiTraderPaper: OpenSourceProject = {
  id: "ai-trader-paper",
  name: "AI Trader Paper",
  repository: "https://github.com/mehmetakifcakr/ai-trader-paper",
  description: {
    tr: "Çevrimdışı çalışabilen araştırma prototipi. Ortak bir sanal portföy ve açık yürütme sınırlarıyla yerel simülasyon.",
    en: "An offline-first research prototype with a shared simulated portfolio and explicit execution limits.",
  },
  stage: { tr: "Alfa · yerel simülasyon", en: "Alpha · local simulation" },
  technologies: ["Python", "Simulation", "Machine learning"],
  version: null,
  crateName: null,
  crateUrl: null,
};

const unconfirmedCaseStudy = {
  competition: null,
  year: null,
  role: null,
  status: null,
  result: null,
  problem: null,
  constraints: null,
  architecture: null,
  technologies: null,
  lessons: null,
  nextSteps: null,
  repository: null,
  media: null,
} satisfies Omit<CompetitionProject, "id" | "slug" | "title" | "scope">;

export const siteConfig: SiteConfig = {
  name: "Mehmet Akif Çakır",
  monogram: "MAC",
  domain: "macakr.me",
  url: "https://macakr.me",
  timezone: "Europe/Istanbul",
  headline: {
    tr: "Mekatronik Mühendisliği Öğrencisi · Gömülü Sistemler ve Rust · Yapay Zekâ ile Görsel Üretim",
    en: "Mechatronics Engineering Student · Embedded Systems & Rust · AI Visual Creation",
  },
  location: { tr: "Türkiye", en: "Türkiye" },
  contact: {
    email: "mehmetakifcakrr@gmail.com",
    github: "https://github.com/mehmetakifcakr",
    linkedin: "https://www.linkedin.com/in/ma-cakr/",
    youtube: null,
    instagram: null,
    x: null,
    orcid: "https://orcid.org/0009-0008-9355-7559",
  },
  cv: { tr: null, en: null },
  photo: null,
  availability: null,
  education: [
    {
      institution: "Manisa Celal Bayar University",
      programme: { tr: "Mekatronik Mühendisliği", en: "Mechatronics Engineering" },
      degree: { tr: "Lisans", en: "BSc" },
      startYear: null,
      endYear: null,
    },
    {
      institution: "Anadolu University",
      programme: { tr: "Yapay Zekâ Destekli Kodlama", en: "AI-Assisted Coding" },
      degree: null,
      startYear: null,
      endYear: null,
    },
  ],
  now: { building: null, learning: null },
  openSource: [recoverTick, openRobotKit, aiTraderPaper],
  projects: { recoverTick, openRobotKit, aiTraderPaper },
  competitionProjects: [
    {
      ...unconfirmedCaseStudy,
      id: "rocket",
      slug: "rocket",
      title: { tr: "Roket sistemleri", en: "Rocket systems" },
      scope: {
        tr: "Orta ve yüksek irtifa roketleri için aviyonik, telemetri ve fırlatma yazılımı.",
        en: "Avionics, telemetry and launch software for mid- and high-altitude rockets.",
      },
    },
    {
      ...unconfirmedCaseStudy,
      id: "emergency-priority",
      slug: "emergency-priority",
      title: { tr: "Acil araç geçiş önceliği", en: "Emergency vehicle priority" },
      scope: {
        tr: "Ambulans ve itfaiye için akıllı trafik ışığı entegrasyonu ve kablosuz haberleşme.",
        en: "Smart traffic-light integration and wireless communication for ambulances and fire engines.",
      },
    },
    {
      ...unconfirmedCaseStudy,
      id: "robot-arm",
      slug: "robot-arm",
      title: { tr: "Biyotasarım ve robot kol", en: "Biodesign and robotics" },
      scope: {
        tr: "Endüstriyel robot kol için kinematik, servo ve step motor kontrolü.",
        en: "Kinematics, servo and stepper control for an industrial robot arm.",
      },
    },
    {
      ...unconfirmedCaseStudy,
      id: "tennis-robot",
      slug: "tennis-robot",
      title: { tr: "Otonom tenis topu robotu", en: "Autonomous tennis-ball robot" },
      scope: {
        tr: "Görüntüyle nesne algılama ve otonom rota planlama ile top toplama.",
        en: "Ball collection using vision-based object detection and autonomous route planning.",
      },
    },
  ],
  expertise: {
    embedded: ["Rust", "C++", "Python", "Microcontrollers", "Sensors"],
    biomedical: ["3D CAD", "CT data", "Anatomical layers", "FDM", "SLA"],
    cinema: ["Kling AI", "Runway", "Veo", "Higgsfield", "n8n"],
    ev: ["Battery chemistry", "BMS", "Motor torque", "Durability analysis"],
    workshop: ["Bosch Professional", "Einhell"],
  },
  media: { shoulderModel: null, cinema: null },
  models: {
    battery: {
      classification: "illustrative",
      capacityAh: 3,
      internalResistanceOhms: 0.04,
      emptyOcv: 3,
      fullOcv: 4.2,
    },
    motor: {
      classification: "illustrative",
      torqueNm: 30,
      baseSpeedRpm: 3000,
      maximumSpeedRpm: 12000,
    },
  },
  references: null,
  deployment: { lastDeployedAt: null },
};

export const site = siteConfig;
