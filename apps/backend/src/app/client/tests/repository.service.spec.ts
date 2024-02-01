import { beforeEach, describe, expect, it } from "vitest";
import { ClientInMemoryRepository } from "../../client/repository/client.in-memory.repository";
import { ClientService } from "../client.service";
import { clientMockFactory } from "./client.mockFactory";

describe("Testes do service de schedule", () => {
  let service: ClientService;
  let clinetInMemoryRepository: ClientInMemoryRepository;

  beforeEach(() => {
    clinetInMemoryRepository = new ClientInMemoryRepository();
    service = new ClientService(clinetInMemoryRepository);
  });

  it("Deve ser possivel possível entregar todos os clientes criados no formato correto", async () => {
    clientMockFactory(clinetInMemoryRepository, [
      "client1",
      "client2",
      "client3",
    ]);
    const clients = await service.findAll({});
    expect(clients[0].name).toEqual("client1");
    expect(clients[2]?.pet?.pet_name).toEqual("client3's pet");
  });
});
