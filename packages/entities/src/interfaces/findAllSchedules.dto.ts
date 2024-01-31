import { ISchedule } from "..";

export interface IFindAllSchedulesDto {
  totalOfLines: number;
  schedules: Array<ISchedule>;
}
