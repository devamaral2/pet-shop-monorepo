import { StatusEnum } from "./StatusEnum";

export interface FindAllQueryProps {
  searchClient?: string;
  page?: number;
  status?: StatusEnum | "";
  startDate?: number;
  endDate: number;
}
