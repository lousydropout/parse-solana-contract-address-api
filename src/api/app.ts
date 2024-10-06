import { Hono } from "hono";
import { logger } from "../utils/logger";
import { cors } from "../utils/cors";

const app = new Hono();
app.use(logger());
app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/names/:name", (c) => {
  const name = c.req.param("name");
  return c.json({ name });
});

app.post("/something", async (c) => {
  console.log(`POST /something: ${await c.req.text()}`);
  const body = await c.req.json();
  return c.json(body);
});

export { app };
