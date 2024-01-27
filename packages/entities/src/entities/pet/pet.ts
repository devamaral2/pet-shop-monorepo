import { petMessangesEnum } from "./enum/petMessanges.enum";
import { SpeciesEnum } from "./enum/species.enum";

export interface PetProps {
  name: string;
  species: SpeciesEnum;
}
export class Pet {
  private _name: string;
  private _species: SpeciesEnum;
  constructor(props: PetProps) {
    if (!this.isValidSpecies(props.species)) {
      throw new Error(petMessangesEnum.CREATE_WITH_INVALID_SPECIES);
    }
    this._name = props.name;
    this._species = props.species;
  }

  isValidSpecies(species: SpeciesEnum): boolean {
    const validSpecies = Object.values(SpeciesEnum);
    return validSpecies.includes(species);
  }

  get name() {
    return this._name;
  }
  get species(): SpeciesEnum {
    return this._species;
  }
}
