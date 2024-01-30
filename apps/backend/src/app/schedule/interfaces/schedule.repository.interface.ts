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
  creatingFindQuery(props: IFindAllSchedulesProps): ICreatingFindQueryResponse;
  findAll(
    props: IFindAllSchedulesProps
  ): Promise<IFindAllSchedulesRepositoryResponse>;
  create(props: { timestamp: number; clientId: string }): Promise<void>;
  update({ id, status }: { id: string; status: string }): Promise<void>;
  findById(id: string): Promise<ScheduleFromDb>;
  verifyIfSchedule(clientId: string): Promise<ScheduleFromDb[]>;
}
