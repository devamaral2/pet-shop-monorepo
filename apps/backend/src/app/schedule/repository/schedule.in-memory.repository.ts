import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import { IClient } from "@pet-shop/entities/client";
import { ISchedule } from "@pet-shop/entities/schedule";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { PoolClient } from "pg";
import {
  IFindAllSchedulesRepositoryResponse,
  ScheduleFromDb,
} from "../interfaces/findAllSchedules.interfaces";
import { IScheduleRepository } from "../interfaces/schedule.repository.interface";

export class ScheduleInMemoryRepository implements IScheduleRepository {
  private _schedules: unknown[] = [];
  private _clients: IClient[] = [];

  constructor(private readonly connection: () => Promise<PoolClient>) {
    this.connection = connection;
  }
  get schedules() {
    return this._schedules;
  }

  get clients() {
    return this._clients;
  }

  public async create({
    timestamp,
    clientId,
  }: {
    timestamp: number;
    clientId: string;
  }) {
    this.schedules.push({
      timestamp,
      status: StatusEnum.SCHEDULED,
      client_id: clientId,
    });
  }

  public async findAll({
    _page,
    _status,
    _clientSearch,
    _startTime,
    _endTime,
  }: IFindAllSchedulesProps): Promise<IFindAllSchedulesRepositoryResponse> {
    return {
      schedules: this.schedules as ISchedule,
      count: this.schedules.length,
    };
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
}
