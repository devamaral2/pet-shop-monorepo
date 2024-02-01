/* eslint-disable @typescript-eslint/no-unused-vars */
import { IClient } from "@pet-shop/entities/client";
import { IPet } from "@pet-shop/entities/pet";
import { randomUUID } from "crypto";
import { IClientRepository } from "../interfaces/client.repository.interface";
import {
  ClientFromDb,
  IFindAllClientsProps,
} from "../interfaces/findAllClients.interface";

export class ClientInMemoryRepository implements IClientRepository {
  private _clients: IClient[] = [];
  private _pets: IPet[] = [];

  get clients(): IClient[] {
    return this._clients;
  }

  get pets(): IPet[] {
    return this._pets;
  }

  public setClient(client: IClient, pet: IPet) {
    const petId = randomUUID();
    this._pets = [...this._pets, { ...pet, id: petId }];
    this._clients = [
      ...this._clients,
      { ...client, pet_id: petId, id: randomUUID() },
    ];
  }

  async findById(id: string): Promise<ClientFromDb | null> {
    const client = this._clients.find((client) => client.id === id);
    const pet = this._pets.find((pet) => pet.id === client?.pet_id);
    if (!client || !pet) {
      return null;
    }

    return {
      client_id: client.id as string,
      client_name: client.name,
      email: client.email,
      pet_name: pet.name as string,
      species: pet.species,
      image_url: pet.image_url as string,
      pet_id: pet.id as string,
    };
  }

  public async findAll({ clientSearch }: IFindAllClientsProps) {
    return this._clients
      .map((client) => {
        const pet = this._pets.find((pet) => pet.id === client.pet_id);
        return {
          client_id: client.id as string,
          client_name: client.name,
          email: client.email,
          pet_name: pet?.name as string,
          species: pet?.species,
          image_url: pet?.image_url as string,
          pet_id: pet?.id as string,
        };
      })
      .filter((client) => {
        if (!clientSearch) {
          return client;
        }
        return client.pet_name.includes(clientSearch);
      }) as ClientFromDb[];
  }
}
