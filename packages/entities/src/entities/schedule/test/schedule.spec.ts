import { describe, expect, it } from "vitest";
import { ErrorsDictionary } from "../../..";
import { StatusEnum } from "../enum/status.enum";
import { scheduleMock, scheduleWithWrongTimestampMock } from "./schedule.mock";

describe("Testes da entidade Schedule", () => {
  it("Não é possível criar um schedule com um timestamp inferior a data atual", () => {
    expect(scheduleWithWrongTimestampMock).toThrowError(
      ErrorsDictionary.CREATE_SCHEDULE_WITH_INVALID_TIMESTAMP.key,
    );
  });

  it("Não se pode alterar o status do schedule com uma propriedade inadequada", () => {
    const updateStatus = () => {
      scheduleMock.status = "invalid status" as StatusEnum;
    };
    expect(updateStatus).toThrowError(
      ErrorsDictionary.UPDATE_SCHEDULE_WITH_INVALID_STATUS.key,
    );
  });

  it("Caso os parametros sejam passados corretamente o schedule é criado normalmente e as propriedades podem ser acessadas", () => {
    expect(scheduleMock.client.email).toEqual("eduardo.gomes@email.com");
  });
});
