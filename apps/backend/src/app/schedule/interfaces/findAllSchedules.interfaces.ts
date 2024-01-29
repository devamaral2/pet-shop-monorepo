import { SpeciesEnum } from "@pet-shop/entities/speciesenum";
import { StatusEnum } from "@pet-shop/entities/statusenum";

export interface ScheduleFromDb {
  id?: string;
  schedule_id?: string;
  timestamp: number;
  status: StatusEnum;
  client_id: string;
  client_name: string;
  pet_name: string;
  email: string;
  pet_id: string;
  image_url: string;
  species: SpeciesEnum;
}

export interface IFindAllSchedulesRepositoryResponse {
  totalOfLines: number;
  schedules: ScheduleFromDb[];
}
