import express, { NextFunction, Request, Response } from "express";
import { connection } from "../database/connection";
import { errorMiddleware } from "./middlewares/error.middleware";

class Server {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.get("/", async (_req, res) => {
      const resu = await connection();
      const note = await resu.query("SELECT NOW()");
      console.info(note);
      res.send(note);
    });
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,PATCH, DELETE");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(express.json());
    // this.app.use("/automovel", Routes.automovel);
    // this.app.use("/motorista", Routes.motorista);
    // this.app.use("/registro", Routes.registro);
    this.app.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error: unknown, _req: Request, res: Response, _next: NextFunction) =>
        errorMiddleware(error, res)
    );
  }

  public start(port: string): void {
    this.app.listen(port, () => {
      console.info(`Running on port ${port}`);
    });
  }
}

export { Server };
export const { app } = new Server();
