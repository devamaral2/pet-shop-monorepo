import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import { PoolClient } from "pg";
import {
  IFindAllSchedulesRepositoryResponse,
  ScheduleFromDb,
} from "../interfaces/findAllSchedules.interfaces";
import { IScheduleRepository } from "../interfaces/schedule.repository.interface";

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
  }: IFindAllSchedulesProps): { query: string; values: (string | number)[] } {
    const limit = 10;
    const offset = (page - 1) * limit;

    let query = `
    SELECT s.*, c.*, p.*, s.id as schedule_id, c.name as client_name, p.name as pet_name
          FROM schedules s
          JOIN clients c ON s.client_id = c.id
          JOIN pets p ON c.pet_id = p.id
          WHERE 1 = 1
        `;

    const values = [];

    if (status) {
      query += ` AND s.status = $${values.length + 1}`;
      values.push(status);
    }

    if (clientSearch) {
      query += ` AND c.name LIKE '%${clientSearch}%'`;
    }

    if (startTime && endTime) {
      query += ` AND s.timestamp BETWEEN ${startTime} AND ${endTime}`;
    }

    query += ` ORDER BY s.timestamp ASC LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
    values.push(limit, offset);
    return {
      query,
      values,
    };
  }

  public async create({
    timestamp,
    clientId,
  }: {
    timestamp: number;
    clientId: string;
  }) {
    const db = await this.connection();
    const query = `
      INSERT INTO schedules (timestamp, status, client_id)
      VALUES ($1, 'scheduled', $2)
      RETURNING *
    `;
    const values = [timestamp, clientId];
    await db.query(query, values);
  }

  public async findAll({
    page,
    status,
    clientSearch,
    startTime,
    endTime,
  }: IFindAllSchedulesProps): Promise<IFindAllSchedulesRepositoryResponse> {
    const { query, values } = this.creatingFindQuery({
      page,
      status,
      clientSearch,
      startTime,
      endTime,
    });
    const db = await this.connection();
    const total = await db.query("SELECT COUNT(*) FROM schedules");
    const schedules = await db.query(query, values);
    return { totalOfLines: total.rows[0].count, schedules: schedules.rows };
  }

  async update({ id, status }: { id: string; status: string }) {
    const query = `
      UPDATE schedules
      SET status = $1
      WHERE id = $2
    `;
    const values = [status, id];
    const db = await this.connection();
    await db.query(query, values);
  }

  async findById(id: string): Promise<ScheduleFromDb> {
    const query = `
    SELECT s.*, c.*, p.*
    FROM schedules s
    JOIN clients c ON s.client_id = c.id
    JOIN pets p ON c.pet_id = p.id
    WHERE s.id = $1
  `;
    const values = [id];
    const db = await this.connection();
    const res = await db.query(query, values);
    return res.rows[0];
  }

  async verifyIfSchedule(clientId: string): Promise<ScheduleFromDb[]> {
    const query = `
      SELECT s.*
      FROM schedules s
      WHERE s.client_id = $1
      AND s.status = 'scheduled'
    `;
    const values = [clientId];
    const db = await this.connection();
    const res = await db.query(query, values);
    return res.rows;
  }
}
