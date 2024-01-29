import { IClient } from "@pet-shop/entities/client";
import { SpeciesEnum } from "@pet-shop/entities/speciesenum";
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
  }): Promise<Array<IClient & { id: string }>> {
    const response = await this.repository.findAll({
      clientSearch,
    });
    return response.map((client: ClientFromDb & { id: string }) => {
      return {
        id: client.id,
        name: client.client_name,
        email: client.email,
        pet: {
          name: client.pet_name,
          imageUrl: client.image_url,
          species: client.species as SpeciesEnum,
        },
      };
    });
  }
}
