import { NextFunction, Request, Response, Router } from "express";
import { createScheduleController } from "../../../app/schedule/schedule.factory";

const routes: Router = Router();
const clientController = createScheduleController();

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  clientController.findAll(req, res, next);
});

export default routes;
