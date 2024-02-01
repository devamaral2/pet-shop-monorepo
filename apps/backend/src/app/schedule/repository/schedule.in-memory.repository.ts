/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import { ISchedule } from "@pet-shop/entities/schedule";
import { SpeciesEnum } from "@pet-shop/entities/speciesenum";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { randomUUID } from "crypto";
import { IClientRepository } from "../../client/interfaces/client.repository.interface";
import {
  IFindAllSchedulesRepositoryResponse,
  ScheduleFromDb,
} from "../interfaces/findAllSchedules.interfaces";
import { IScheduleRepository } from "../interfaces/schedule.repository.interface";

export class ScheduleInMemoryRepository implements IScheduleRepository {
  private _schedules: ISchedule[] = [];
  private _clientRepository: IClientRepository;

  public constructor(clientRepository: IClientRepository) {
    this._clientRepository = clientRepository;
  }

  get schedules() {
    return this._schedules;
  }

  public async create({
    timestamp,
    clientId,
  }: {
    timestamp: number;
    clientId: string;
  }) {
    this._schedules.push({
      id: randomUUID(),
      timestamp,
      status: StatusEnum.SCHEDULED,
      client_id: clientId,
    });
  }

  public async findAll(
    props: IFindAllSchedulesProps
  ): Promise<IFindAllSchedulesRepositoryResponse> {
    const arrayFromDb = this._schedules.map(async (schedule) => {
      const client = await this._clientRepository.findById(
        schedule.client_id as string
      );

      if (!client) return null;
      const clientData = client;
      if (!clientData) return null;
      return {
        schedule_id: schedule.id,
        timestamp: schedule.timestamp,
        status: schedule.status,
        client_id: schedule.client_id,
        client_name: clientData.client_name,
        email: clientData.email,
        pet_name: clientData.pet_name,
        pet_id: clientData.pet_id,
        image_url: clientData.image_url,
        species: clientData.species,
      };
    });
    const response = await Promise.all(arrayFromDb);
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      schedules: response as any,
      totalOfLines: arrayFromDb.length,
    };
  }

  async update({ id, status }: { id: string; status: string }) {
    this._schedules = this._schedules.map((schedule) => {
      if (schedule.id === id) {
        return { ...schedule, status };
      }
      return schedule;
    }) as ISchedule[];
  }

  async findById(id: string): Promise<ScheduleFromDb | null> {
    const schedule = this._schedules.find((schedule) => schedule.id === id);
    if (!schedule) return null;
    const client = await this._clientRepository.findById(
      schedule.client_id as string
    );

    return {
      schedule_id: schedule.id as string,
      timestamp: schedule.timestamp as number,
      status: schedule.status as StatusEnum,
      client_id: schedule.client_id as string,
      client_name: client?.client_name as string,
      email: client?.email as string,
      pet_name: client?.pet_name as string,
      pet_id: client?.pet_id as string,
      image_url: client?.image_url as string,
      species: client?.species as SpeciesEnum,
    };
  }
}
