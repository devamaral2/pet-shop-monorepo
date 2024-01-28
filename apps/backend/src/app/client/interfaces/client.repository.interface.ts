import { ClientFromDb, IFindAllClientsProps } from "./findAllClients.interface";
export interface IClientRepository {
  findAll(props: IFindAllClientsProps): Promise<ClientFromDb[]>;
  findById(id: string): Promise<ClientFromDb>;
}
