import { NextFunction, Request, Response } from "express";
import { ClientService } from "./client.service";

export class ClientController {
  constructor(private readonly service: ClientService) {
    this.service = service;
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { clientSearch } = req.query;
      const response = await this.service.findAll({
        clientSearch: clientSearch as string,
      });
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
