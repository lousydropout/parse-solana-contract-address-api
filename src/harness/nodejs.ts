import { app } from "../api/app";
import { serve } from "@hono/node-server";

const port = 3000;
console.log(`Server is running on port ${port}`);
serve({ fetch: app.fetch, port });
