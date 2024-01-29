import { ISchedule } from "..";

export interface FindAllSchedulesDto {
  totalOfLines: number;
  schedules: Array<ISchedule & { id?: string; schedule_id?: string }>;
}
