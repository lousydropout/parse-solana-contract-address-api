import { logger as honoLogger } from "hono/logger";

const removeAnsiColors = (input: string): string => {
  // Regular expression to match ANSI escape codes
  const ansiRegex = /\u001b\[[0-9;]*m/g;
  // Replace them with an empty string
  return input.replace(ansiRegex, "");
};

export const logger = () => {
  return process.env.COLOR === "true"
    ? honoLogger((message: string) => console.log(message))
    : honoLogger((message: string) => console.log(removeAnsiColors(message)));
};
