import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import {
  IFindAllSchedulesRepositoryResponse,
  ScheduleFromDb,
} from "./findAllSchedules.interfaces";

export interface ICreatingFindQueryResponse {
  schedules: string;
  count: string;
  values: (string | number)[];
}

export interface IScheduleRepository {
  findAll(
    props: IFindAllSchedulesProps
  ): Promise<IFindAllSchedulesRepositoryResponse>;
  create(props: { timestamp: number; clientId: string }): Promise<void>;
  update({ id, status }: { id: string; status: string }): Promise<void>;
  findById(id: string): Promise<ScheduleFromDb>;
}
