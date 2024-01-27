import { petMock } from "../../pet/pet.mock";
import { Client } from "../client";

const pet = petMock;
export const clientMock = new Client({
  name: "Eduardo Gomes",
  email: "eduardo.gomes@email.com",
  pet,
});

export const clientWithWrongEmailMock = () =>
  new Client({
    name: "Eduardo Gomes",
    email: "eduardo.gomes",
    pet,
  });
