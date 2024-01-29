import { NextFunction, Request, Response, Router } from "express";
import { createClientController } from "../../../app/client/client.factory";

const routes: Router = Router();
const clientController = createClientController();

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  clientController.findAll(req, res, next);
});

export default routes;
