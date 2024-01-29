import { StatusEnum } from "..";

export interface IFindAllSchedulesProps {
  page?: number;
  status?: StatusEnum & "all";
  clientSearch?: string;
  startTime?: number;
  endTime?: number;
}
