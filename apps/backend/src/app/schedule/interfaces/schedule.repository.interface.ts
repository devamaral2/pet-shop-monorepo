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
  findById(id: string): Promise<ScheduleFromDb | null>;
  creatingFindQuery?: (
    props: IFindAllSchedulesProps
  ) => ICreatingFindQueryResponse;
  creatingCreateQuery?: (
    timestamp: number,
    clientId: string
  ) => { query: string; values: (string | number)[] };
  creatingUpdateQuery?: (
    id: string,
    status: string
  ) => { query: string; values: (string | number)[] };
  creatingFindByIdQuery?: (id: string) => {
    query: string;
    values: (string | number)[];
  };
}
