import { SpeciesEnum } from "@pet-shop/entities/speciesenum";

export interface IFindAllClientsProps {
  clientSearch?: string;
}

export interface ClientFromDb {
  id: string;
  client_id: string;
  client_name: string;
  email: string;
  pet_name: string;
  species: SpeciesEnum;
  image_url: string;
}
