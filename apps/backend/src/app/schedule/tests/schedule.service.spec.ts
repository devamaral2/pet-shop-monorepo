import { ErrorsDictionary } from "@pet-shop/entities/errorsDictionary";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { fail } from "assert";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { ClientFromDb } from "../../client/interfaces/findAllClients.interface";
import { ClientInMemoryRepository } from "../../client/repository/client.in-memory.repository";
import { clientMockFactory } from "../../client/tests/client.mockFactory";
import { ScheduleInMemoryRepository } from "../repository/schedule.in-memory.repository";
import { ScheduleService } from "../schedule.service";
import { scheduleMockFactory } from "./schedule.mockFactory";

describe("Testes do service de schedule", () => {
  let service: ScheduleService;
  let clinetInMemoryRepository: ClientInMemoryRepository;
  let scheduleInMemoryRepository: ScheduleInMemoryRepository;

  beforeEach(() => {
    clinetInMemoryRepository = new ClientInMemoryRepository();
    scheduleInMemoryRepository = new ScheduleInMemoryRepository(
      clinetInMemoryRepository
    );
    service = new ScheduleService(
      scheduleInMemoryRepository,
      clinetInMemoryRepository
    );
  });

  it("Deve ser possivel possível criar um schedule para um client existente", async () => {
    clientMockFactory(clinetInMemoryRepository, ["client1"]);
    const client = await clinetInMemoryRepository.findAll({});
    await scheduleMockFactory(service, [(client[0] as ClientFromDb).client_id]);
    const schedule = scheduleInMemoryRepository.schedules[0];
    expect(schedule.client_id).toEqual(client[0].client_id);
    expect(schedule.timestamp).toEqual(1709303593000);
  });

  it("Não deve ser possível criar um schedule com um client", async () => {
    expect(
      async () =>
        await service.create({
          timestamp: 1709303593000,
          clientId: "16a714af-44c8-48ec-ac0e-a5e758709ad9",
        })
    ).rejects.toThrowError(
      ErrorsDictionary.CREATE_SCHEDULE_WITH_INVALID_CLIENT_ID.key
    );
  });

  it("A função findAll deve entregar todos os schedules presentes no banco de dados", async () => {
    clientMockFactory(clinetInMemoryRepository, [
      "client1",
      "client2",
      "client3",
    ]);
    const clients = await clinetInMemoryRepository.findAll({});

    await scheduleMockFactory(
      service,
      clients.map((client) => (client as ClientFromDb).client_id)
    );
    const response = await service.findAll({});

    expect(response.totalOfLines).toEqual(3);
    expect(response.schedules[0]?.client?.name).toEqual("client1");
    expect(response.schedules[2]?.client?.pet?.name).toEqual("client3's pet");
  });

  it("A função update deve atualizar corretamente o schedule corretamente", async () => {
    clientMockFactory(clinetInMemoryRepository, ["client1"]);
    const clients = await clinetInMemoryRepository.findAll({});
    await scheduleMockFactory(
      service,
      clients.map((client) => (client as ClientFromDb).client_id)
    );
    await service.update({
      id: scheduleInMemoryRepository.schedules[0].id as string,
      status: StatusEnum.DONE,
    });
    expect(scheduleInMemoryRepository.schedules[0].status).toEqual(
      StatusEnum.DONE
    );
  });

  it("A função update deve lançar um erro no caso seja passado um uuid inválido", async () => {
    try {
      await service.update({
        id: randomUUID(),
        status: StatusEnum.DONE,
      });
      fail("Expected error to be thrown");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error?.message).toBe(
        ErrorsDictionary.UPDATE_SCHEDULE_WITH_INVALID_ID.key
      );
    }
  });
});
