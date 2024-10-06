import { app } from "../api/app";
import { handle } from "hono/aws-lambda";

export const handler = handle(app);
