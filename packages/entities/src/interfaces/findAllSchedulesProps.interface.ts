import { StatusEnum } from "..";

export interface IFindAllSchedulesProps {
  page?: number;
  status?: StatusEnum & "all" & undefined;
  clientSearch?: string;
  startTime?: number;
  endTime?: number;
}
