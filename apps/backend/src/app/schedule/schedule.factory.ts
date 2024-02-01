import { connection } from "../../infrastructure/database/connection";
import { ClientRepository } from "../client/repository/client.repository";
import { ScheduleRepository } from "./repository/schedule.repository";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";

export function createScheduleController(): ScheduleController {
  const scheduleRepository = new ScheduleRepository(connection);
  const clientRepository = new ClientRepository(connection);
  const scheduleService = new ScheduleService(
    scheduleRepository,
    clientRepository
  );
  return new ScheduleController(scheduleService);
}
