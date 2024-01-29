import { IClientRepository } from "./interfaces/client.repository.interface";
import { ClientFromDb } from "./interfaces/findAllClients.interface";

export class ClientService {
  constructor(private readonly repository: IClientRepository) {
    this.repository = repository;
  }

  async findAll({
    clientSearch,
  }: {
    clientSearch: string;
  }): Promise<ClientFromDb[]> {
    return this.repository.findAll({
      clientSearch,
    });
  }
}
