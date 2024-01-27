import { SpeciesEnum } from "./enum/species.enum";
import { Pet } from "./pet";

export const petMock = new Pet({
  name: "Rex",
  species: SpeciesEnum.DOG,
});

export const petWithWrongSpeciesMock = () =>
  new Pet({
    name: "Rex",
    species: "dinosaur" as SpeciesEnum,
  });
