import { describe, expect, it } from "vitest";
import { ErrorsDictionary } from "../../..";
import { clientMock, clientWithWrongEmailMock } from "./client.mock";

describe("Testes da entidade Client", () => {
  it("Não é possível criar um Client com formato de email errado", () => {
    expect(clientWithWrongEmailMock).toThrowError(
      ErrorsDictionary.CREATE_CLIENT_WITH_INVALID_EMAIL.key,
    );
  });

  it("Caso o usuário criado tenha um email correto ele é criado normalmente", () => {
    expect(clientMock.email).toEqual("eduardo.gomes@email.com");
  });

  it("Caso o usuário tente trocar o email no formato errado, ele recebe um erro", () => {
    const updateEmail = () => {
      clientMock.email = "eduardo.gomes";
    };
    expect(updateEmail).toThrowError(
      ErrorsDictionary.UPDATE_CLIENT_WITH_INVALID_EMAIL.key,
    );
  });
});
