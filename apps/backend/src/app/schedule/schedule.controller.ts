import { StatusEnum } from "@pet-shop/entities/statusenum";
import { NextFunction, Request, Response } from "express";
import { ScheduleService } from "./schedule.service";

export class ScheduleController {
  constructor(private readonly service: ScheduleService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { timestamp, clientId } = req.body;
      await this.service.create({
        timestamp,
        clientId,
      });
      res.status(201).json({ message: "Agendamento criado com sucesso" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.body;
      const { id } = req.params;
      await this.service.update({
        id,
        status,
      });
      res.status(200).json({ message: "Status Alterado con sucesso" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, clientSearch, startTime, endTime, status } = req.query;
      const response = await this.service.findAll({
        status: status as StatusEnum,
        clientSearch: clientSearch as string,
        page: page ? Number(page) : undefined,
        startTime: startTime ? Number(startTime) : undefined,
        endTime: endTime ? Number(endTime) : undefined,
      });
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
