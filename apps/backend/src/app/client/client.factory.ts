import { connection } from "../../infrastructure/database/connection";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { ClientRepository } from "./repository/client.repository";

export function createClientController(): ClientController {
  const clientRepository = new ClientRepository(connection);
  const clientService = new ClientService(clientRepository);
  return new ClientController(clientService);
}
