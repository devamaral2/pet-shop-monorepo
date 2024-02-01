import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";

import { IFindAllSchedulesDto } from "@pet-shop/entities/IFindAllSchedulesDto";
import { Client } from "@pet-shop/entities/client";
import { ErrorsDictionary } from "@pet-shop/entities/errorsDictionary";
import { Schedule } from "@pet-shop/entities/schedule";
import { IClientRepository } from "../client/interfaces/client.repository.interface";
import { IScheduleRepository } from "./interfaces/schedule.repository.interface";

export class ScheduleService {
  constructor(
    private readonly repository: IScheduleRepository,
    private readonly clientRepository: IClientRepository
  ) {
    this.repository = repository;
    this.clientRepository = clientRepository;
  }

  public async create({
    timestamp,
    clientId,
  }: {
    timestamp: number;
    clientId: string;
  }) {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new Error(
        ErrorsDictionary.CREATE_SCHEDULE_WITH_INVALID_CLIENT_ID.key
      );
    }
    new Schedule({
      timestamp,
      client: new Client({
        name: client.client_name,
        email: client.email,
        pet: {
          name: client.pet_name,
          imageUrl: client.image_url,
          species: client.species,
        },
      }),
    });
    return this.repository.create({
      timestamp,
      clientId,
    });
  }

  public async update({ id, status }: { id: string; status: string }) {
    const schedule = await this.repository.findById(id);
    if (!schedule) {
      throw new Error(ErrorsDictionary.UPDATE_SCHEDULE_WITH_INVALID_ID.key);
    }
    return this.repository.update({
      id,
      status,
    });
  }

  async findAll({
    page,
    status,
    clientSearch,
    startTime,
    endTime,
  }: IFindAllSchedulesProps): Promise<IFindAllSchedulesDto> {
    const response = await this.repository.findAll({
      page,
      status,
      clientSearch,
      startTime,
      endTime,
    });
    const schedulesArray = response.schedules.map((schedule) => {
      return {
        id: schedule.schedule_id,
        timestamp: schedule.timestamp,
        status: schedule.status,
        client: {
          name: schedule.client_name,
          email: schedule.email,
          pet: {
            name: schedule.pet_name,
            imageUrl: schedule.image_url,
            species: schedule.species,
          },
        },
      };
    });
    return {
      totalOfLines: response.totalOfLines,
      schedules: schedulesArray,
    };
  }
}
