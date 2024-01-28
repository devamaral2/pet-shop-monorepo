import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import {
  IFindAllSchedulesRepositoryResponse,
  ScheduleFromDb,
} from "./findAllSchedules.interfaces";
export interface IScheduleRepository {
  creatingFindQuery(props: IFindAllSchedulesProps): {
    query: string;
    values: (string | number)[];
  };
  findAll(
    props: IFindAllSchedulesProps
  ): Promise<IFindAllSchedulesRepositoryResponse>;
  create(props: { timestamp: number; clientId: string }): Promise<void>;
  update({ id, status }: { id: string; status: string }): Promise<void>;
  findById(id: string): Promise<ScheduleFromDb>;
  verifyIfSchedule(clientId: string): Promise<ScheduleFromDb[]>;
}
