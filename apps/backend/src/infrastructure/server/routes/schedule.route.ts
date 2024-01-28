import { NextFunction, Request, Response, Router } from "express";
import { createScheduleController } from "../../../app/schedule/schedule.factory";

const routes: Router = Router();
const scheduleController = createScheduleController();

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  scheduleController.findAll(req, res, next);
});
routes.post("/", (req: Request, res: Response, next: NextFunction) => {
  scheduleController.create(req, res, next);
});
routes.patch("/:id", (req: Request, res: Response, next: NextFunction) => {
  scheduleController.update(req, res, next);
});

export default routes;
