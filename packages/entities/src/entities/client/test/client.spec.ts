import { describe, expect, it } from "vitest";
import { clientMessangesEnum } from "../enum/clientMessanges.enum";
import { clientMock, clientWithWrongEmailMock } from "./client.mock";

describe("Testes da entidade Client", () => {
  it("Não é possível criar um Client com formato de email errado", () => {
    expect(clientWithWrongEmailMock).toThrowError(
      clientMessangesEnum.CREATE_WITH_INVALID_EMAIL
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
      clientMessangesEnum.UPDATE_WITH_INVALID_EMAIL
    );
  });
});
