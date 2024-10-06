import { Context } from "hono";
import { cors as honoCors } from "hono/cors";

const ALLOWED_DOMAINS = [
  "example1.com",
  "example2.com",
  "example3.com",
] as const;

const origin = (origin: string, c: Context<any, any, {}>): string => {
  // Note: `c` is a `Context` object

  for (const domain of ALLOWED_DOMAINS) {
    if (origin.endsWith(domain)) return origin;
  }

  // allow localhost for development
  return process.env.ALLOW_LOCAL === "true" &&
    origin.startsWith("http://localhost:")
    ? origin
    : `https://${ALLOWED_DOMAINS[0]}`;
};

const corsConfig = { origin, allowMethods: ["GET", "POST", "OPTIONS"] };
export const cors = () => honoCors(corsConfig);
