import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import { PoolClient } from "pg";
import {
  IFindAllSchedulesRepositoryResponse,
  ScheduleFromDb,
} from "../interfaces/findAllSchedules.interfaces";
import {
  ICreatingFindQueryResponse,
  IScheduleRepository,
} from "../interfaces/schedule.repository.interface";

export class ScheduleRepository implements IScheduleRepository {
  constructor(private readonly connection: () => Promise<PoolClient>) {
    this.connection = connection;
  }

  public creatingFindQuery({
    page = 1,
    status,
    clientSearch,
    startTime,
    endTime,
  }: IFindAllSchedulesProps): ICreatingFindQueryResponse {
    const limit = 10;
    const offset = (page - 1) * limit;

    let schedules = `
    SELECT s.*, c.*, p.*, s.id as schedule_id, c.name as client_name, p.name as pet_name
          FROM schedules s
          JOIN clients c ON s.client_id = c.id
          JOIN pets p ON c.pet_id = p.id
          WHERE 1 = 1
        `;
    let count = `
    SELECT COUNT(*) 
    FROM schedules s
    JOIN clients c ON s.client_id = c.id
    WHERE 1 = 1
    `;

    const values = [];

    if (status) {
      const string = ` AND s.status = $${values.length + 1}`;
      schedules += string;
      count += string;
      values.push(status);
    }

    if (clientSearch) {
      const string = ` AND c.name LIKE '%${clientSearch}%'`;
      schedules += string;
      count += string;
    }

    if (startTime && endTime) {
      const string = ` AND s.timestamp BETWEEN $${values.length + 1} AND $${values.length + 2}`;
      schedules += string;
      count += string;
      values.push(startTime, endTime);
    }

    schedules += ` ORDER BY s.timestamp ASC LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
    values.push(limit, offset);
    return {
      schedules,
      count,
      values,
    };
  }

  public creatingCreateQuery(
    timestamp: number,
    clientId: string
  ): { query: string; values: (string | number)[] } {
    const query = `
    INSERT INTO schedules (timestamp, status, client_id)
    VALUES ($1, 'scheduled', $2)
    RETURNING *
  `;
    return { query, values: [timestamp, clientId] };
  }

  public creatingUpdateQuery(
    id: string,
    status: string
  ): { query: string; values: (string | number)[] } {
    const query = `
      UPDATE schedules
      SET status = $1
      WHERE id = $2
    `;
    const values = [status, id];
    return { query, values };
  }

  public creatingFindByIdQuery(id: string): {
    query: string;
    values: (string | number)[];
  } {
    const query = `
    SELECT s.*, c.*, p.*
    FROM schedules s
    JOIN clients c ON s.client_id = c.id
    JOIN pets p ON c.pet_id = p.id
    WHERE s.id = $1
  `;
    const values = [id];
    return { query, values };
  }

  public async create({
    timestamp,
    clientId,
  }: {
    timestamp: number;
    clientId: string;
  }) {
    const db = await this.connection();
    const { query, values } = this.creatingCreateQuery(timestamp, clientId);
    await db.query(query, values);
  }

  public async findAll({
    page,
    status,
    clientSearch,
    startTime,
    endTime,
  }: IFindAllSchedulesProps): Promise<IFindAllSchedulesRepositoryResponse> {
    const { count, schedules, values } = this.creatingFindQuery({
      page,
      status,
      clientSearch,
      startTime,
      endTime,
    });
    const db = await this.connection();
    const response = await db.query(schedules, values);
    values.splice(values.length - 2, 2);
    const total = await db.query(count, values);
    return { totalOfLines: total.rows[0].count, schedules: response.rows };
  }

  async update({ id, status }: { id: string; status: string }) {
    const { query, values } = this.creatingUpdateQuery(id, status);
    const db = await this.connection();
    await db.query(query, values);
  }

  async findById(id: string): Promise<ScheduleFromDb> {
    const { query, values } = this.creatingFindByIdQuery(id);
    const db = await this.connection();
    const res = await db.query(query, values);
    return res.rows[0];
  }
}
