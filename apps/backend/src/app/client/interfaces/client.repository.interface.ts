import { IClient } from "@pet-shop/entities/client";
import { IPet } from "@pet-shop/entities/pet";
import { ClientFromDb, IFindAllClientsProps } from "./findAllClients.interface";
export interface IClientRepository {
  findAll(props: IFindAllClientsProps): Promise<ClientFromDb[]>;
  findById(id: string): Promise<ClientFromDb | null>;
  setClient?: (client: IClient, pet: IPet) => void;
}
