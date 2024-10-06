import { Hono } from "hono";
import { logger } from "../utils/logger";
import { cors } from "../utils/cors";
import { getContractAddress } from "./solana-utils";

const app = new Hono();
app.use(logger());
app.use("/*", cors());

app.get("/contract-address", (c) => {
  const tx = c.req.header("tx") || "";
  if (!tx) return c.json({ found: false, programId: "" });

  return c.json(getContractAddress(tx));
});

export { app };
