import "server-only";

import { z } from "zod";

const optionalString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);

const optionalUrl = z.preprocess((value) => (value === "" ? undefined : value), z.url().optional());

const optionalEmail = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.email().optional(),
);

const environmentSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    NEXT_PUBLIC_SITE_URL: z.url().default("https://macakr.me"),
    GITHUB_TOKEN: optionalString,
    RESEND_API_KEY: optionalString,
    CONTACT_FROM_EMAIL: optionalEmail,
    CONTACT_TO_EMAIL: optionalEmail,
    UPSTASH_REDIS_REST_URL: optionalUrl,
    UPSTASH_REDIS_REST_TOKEN: optionalString,
    TURNSTILE_SECRET_KEY: optionalString,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalString,
    DEPLOYED_AT: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.iso.datetime({ offset: true }).optional(),
    ),
    VERCEL_GIT_COMMIT_SHA: optionalString,
  })
  .superRefine((environment, context) => {
    if (
      Boolean(environment.UPSTASH_REDIS_REST_URL) !== Boolean(environment.UPSTASH_REDIS_REST_TOKEN)
    ) {
      context.addIssue({
        code: "custom",
        path: ["UPSTASH_REDIS_REST_URL"],
        message: "Configure both Upstash REST variables together.",
      });
    }

    if (
      Boolean(environment.TURNSTILE_SECRET_KEY) !==
      Boolean(environment.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
    ) {
      context.addIssue({
        code: "custom",
        path: ["TURNSTILE_SECRET_KEY"],
        message: "Configure both Turnstile keys together.",
      });
    }
  });

const parsedEnvironment = environmentSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  DEPLOYED_AT: process.env.DEPLOYED_AT,
  VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
});

if (!parsedEnvironment.success) {
  const invalidFields = parsedEnvironment.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid application environment:\n${invalidFields}`);
}

export const env = Object.freeze(parsedEnvironment.data);
