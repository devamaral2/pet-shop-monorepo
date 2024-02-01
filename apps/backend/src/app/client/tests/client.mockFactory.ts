import { SpeciesEnum } from "@pet-shop/entities/speciesenum";
import { ClientInMemoryRepository } from "../repository/client.in-memory.repository";

export function clientMockFactory(
  repo: ClientInMemoryRepository,
  clients: string[]
) {
  clients.forEach((client) => {
    repo.setClient(
      { name: client, email: `${client}@emmail.com` },
      {
        name: `${client}'s pet`,
        species: SpeciesEnum.DOG,
        image_url: "http://image.com",
      }
    );
  });
}
