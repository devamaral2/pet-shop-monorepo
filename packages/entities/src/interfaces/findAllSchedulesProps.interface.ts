import { StatusEnum } from "..";

export interface IFindAllSchedulesProps {
  page?: number;
  status?: StatusEnum;
  clientSearch?: string;
  startTime?: number;
  endTime?: number;
}
