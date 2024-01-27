import { describe, expect, it } from "vitest";
import { clientMock, clientWithWrongEmail } from "./client.mock";

describe("Testes da entidade Client", () => {
  it("Não é possível criar um Client com formato de email errado", () => {
    expect(clientWithWrongEmail).toThrowError(
      "Um client não pode ser criado com um formato de email inválido"
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
      "Um client não pode receber um formato de email inválido"
    );
  });
});
