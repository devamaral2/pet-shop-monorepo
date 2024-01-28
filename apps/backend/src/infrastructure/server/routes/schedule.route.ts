import { NextFunction, Request, Response, Router } from "express";
import { createRegistroController } from "src/app/registro/registro.factory";

const routes: Router = Router();
const registro = createRegistroController();

routes.get("/", (req: Request, res: Response, next: NextFunction) => {
  registro.findAll(req, res, next);
});
routes.post("/", (req: Request, res: Response, next: NextFunction) => {
  registro.create(req, res, next);
});
routes.patch("/:id", (req: Request, res: Response, next: NextFunction) => {
  registro.checkout(req, res, next);
});

export default routes;
