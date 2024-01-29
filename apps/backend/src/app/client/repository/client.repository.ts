import { PoolClient } from "pg";
import { IClientRepository } from "../interfaces/client.repository.interface";
import {
  ClientFromDb,
  IFindAllClientsProps,
} from "../interfaces/findAllClients.interface";

export class ClientRepository implements IClientRepository {
  constructor(private readonly connection: () => Promise<PoolClient>) {
    this.connection = connection;
  }

  public getAllClientsQuery({ clientSearch }: { clientSearch?: string }) {
    return `SELECT c.*, p.*
     FROM clients c
     JOIN pets p ON c.pet_id = p.id
     LEFT JOIN schedules s ON c.id = s.client_id AND s.status = 'scheduled'
     WHERE c.name LIKE '%${clientSearch}%'
     AND s.id IS NULL;`;
  }

  async findById(id: string): Promise<ClientFromDb> {
    const query = `
    SELECT c.*, p.*
    FROM clients c
    JOIN pets p ON c.pet_id = p.id
    WHERE c.id = $1
  `;
    const values = [id];
    const db = await this.connection();
    const res = await db.query(query, values);
    return res.rows[0];
  }

  public async findAll({ clientSearch }: IFindAllClientsProps) {
    const db = await this.connection();
    const query = this.getAllClientsQuery({ clientSearch });
    const schedules = await db.query(query, [clientSearch]);
    return schedules.rows;
  }
}
