import dotenv from "dotenv";
import { Server } from "./infrastructure/server";
dotenv.config();

const PORT = process.env.PORT || "8000";

new Server().start(PORT);
