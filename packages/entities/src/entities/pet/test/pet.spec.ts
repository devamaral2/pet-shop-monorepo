import { describe, expect, it } from "vitest";
import { ErrorsDictionary } from "../../..";
import { SpeciesEnum } from "../enum/species.enum";
import { petMock, petWithWrongSpeciesMock } from "../pet.mock";

describe("Testes da entidade Pet", () => {
  it("Não é possível criar um pet com a species errada", () => {
    expect(petWithWrongSpeciesMock).toThrowError(
      ErrorsDictionary.CREATE_PET_WITH_INVALID_SPECIES.key
    );
  });

  it("Caso o usuário crie um pet com a species correta a classe deve criar a entidade normalmente", () => {
    expect(petMock.species).toEqual(SpeciesEnum.DOG);
  });
});
