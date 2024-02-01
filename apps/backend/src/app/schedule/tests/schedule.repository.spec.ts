import { StatusEnum } from "@pet-shop/entities/statusenum";
import { describe, expect, it } from "vitest";
import { connection } from "../../../infrastructure/database/connection";
import { ScheduleRepository } from "../repository/schedule.repository";

describe("Testes do service de schedule", () => {
  const repository = new ScheduleRepository(connection);

  it("Verifica se a query de de findAll funciona corretamente, sem nenhum parametro", async () => {
    const query = repository.creatingFindQuery({});
    expect(query.schedules).include(
      "ORDER BY s.timestamp ASC LIMIT $1 OFFSET $2"
    );
    expect(query.values).toEqual([10, 0]);
  });

  it("Verifica se a query de de findAll funciona corretamente, com uma search por status", async () => {
    const query = repository.creatingFindQuery({ status: StatusEnum.DONE });
    expect(query.schedules).include(" AND s.status = $1");
    expect(query.values).toEqual(["done", 10, 0]);
  });

  it("Verifica se a query de de findAll funciona corretamente, com uma search por status e clientSearch", async () => {
    const query = repository.creatingFindQuery({
      status: StatusEnum.DONE,
      clientSearch: "Renato",
    });
    expect(query.schedules).include(" AND s.status = $1");
    expect(query.schedules).include(" AND c.name LIKE '%Renato%");
    expect(query.values).toEqual(["done", 10, 0]);
  });

  it("Verifica se a query de de findAll funciona corretamente, com uma search por status, startTime sem endTime e clientSearch", async () => {
    const query = repository.creatingFindQuery({
      status: StatusEnum.DONE,
      clientSearch: "Renato",
      startTime: 100,
    });
    expect(query.schedules).include(" AND s.status = $1");
    expect(query.schedules).include(" AND c.name LIKE '%Renato%");
    expect(query.values).toEqual(["done", 10, 0]);
  });

  it("Verifica se a query de de findAll funciona corretamente, com uma search por status, startTime, endTime e clientSearch", async () => {
    const query = repository.creatingFindQuery({
      status: StatusEnum.DONE,
      clientSearch: "Renato",
      startTime: 100,
      endTime: 200,
    });
    expect(query.schedules).include("AND s.status = $1");
    expect(query.schedules).include(" AND c.name LIKE '%Renato%");
    expect(query.schedules).include(" AND s.timestamp BETWEEN $2 AND $3");
    expect(query.values).toEqual(["done", 100, 200, 10, 0]);
  });

  it("Verifica se a query de de findAll funciona corretamente, com uma search por status, startTime, endTime, clientSearch e paginação", async () => {
    const query = repository.creatingFindQuery({
      page: 2,
      status: StatusEnum.DONE,
      clientSearch: "Renato",
      startTime: 100,
      endTime: 200,
    });
    expect(query.schedules).include("AND s.status = $1");
    expect(query.schedules).include(" AND c.name LIKE '%Renato%");
    expect(query.schedules).include(" AND s.timestamp BETWEEN $2 AND $3");
    expect(query.schedules).include(
      " ORDER BY s.timestamp ASC LIMIT $4 OFFSET $5"
    );
    expect(query.values).toEqual(["done", 100, 200, 10, 10]);
  });
});
