import { IClient } from "@pet-shop/entities/client";
import { IClientRepository } from "./interfaces/client.repository.interface";

export class ClientService {
  constructor(private readonly repository: IClientRepository) {
    this.repository = repository;
  }

  async findAll({
    clientSearch,
  }: {
    clientSearch: string;
  }): Promise<IClient[]> {
    const response = await this.repository.findAll({
      clientSearch,
    });
    return response.map((client) => {
      return {
        id: client.client_id,
        name: client.client_name,
        email: client.email,
        pet: {
          pet_name: client.pet_name,
          species: client.species,
          imageUrl: client.image_url,
        },
      };
    });
  }
}
