import { ErrorsDictionary } from "../..";
import { SpeciesEnum } from "./enum/species.enum";

export interface PetProps {
  name: string;
  species: SpeciesEnum;
  imageUrl?: string;
}
export class Pet {
  private _name: string;
  private _species: SpeciesEnum;
  private _imageUrl?: string;
  constructor(props: PetProps) {
    if (!this.isValidSpecies(props.species)) {
      throw new Error(ErrorsDictionary.CREATE_PET_WITH_INVALID_SPECIES.key);
    }
    this._name = props.name;
    this._species = props.species;
    this._imageUrl = props.imageUrl;
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

  get imageUrl(): string | undefined {
    return this._imageUrl;
  }
}
