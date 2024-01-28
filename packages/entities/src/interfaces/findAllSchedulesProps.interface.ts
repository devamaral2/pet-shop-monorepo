import { StatusEnum } from "..";

export interface IFindAllSchedulesProps {
  page: number;
  status?: StatusEnum;
  clientId?: string;
  startTime?: number;
  endTime?: number;
}
