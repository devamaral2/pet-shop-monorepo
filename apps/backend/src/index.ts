import { Server } from "./infrastructure/server";

const PORT = process.env.PORT || "8000";

new Server().start(PORT);
