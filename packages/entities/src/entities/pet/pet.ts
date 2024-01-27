import { petMessangesEnum } from "./enum/petMessanges.enum";
import { SpeciesEnum } from "./enum/species.enum";

export interface PetProps {
  name: string;
  species: SpeciesEnum;
}
export class Pet {
  private props: PetProps;
  constructor(props: PetProps) {
    if (!this.isValidSpecies(props.species)) {
      throw new Error(petMessangesEnum.CREATE_WITH_INVALID_SPECIES);
    }
    this.props = props;
  }

  isValidSpecies(species: SpeciesEnum): boolean {
    const validSpecies = Object.values(SpeciesEnum);
    return validSpecies.includes(species);
  }
  get species() {
    return this.props.species;
  }
}
