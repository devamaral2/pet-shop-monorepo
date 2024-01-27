import { regex } from "../../utils/regex";
import { Pet } from "../pet/pet";
import { clientMessangesEnum } from "./enum/clientMessanges.enum";

export interface ClientProps {
  name: string;
  email: string;
  pet: Pet;
}
export class Client {
  private _name: string;
  private _email: string;
  private _pet: Pet;
  constructor(props: ClientProps) {
    if (!this.emailTest(props.email)) {
      throw new Error(clientMessangesEnum.CREATE_WITH_INVALID_EMAIL);
    }
    this._name = props.name;
    this._email = props.email;
    this._pet = props.pet;
  }

  private emailTest(email: string) {
    return regex.email.test(email);
  }

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get pet() {
    return this._pet;
  }

  set email(email: string) {
    if (!this.emailTest(email)) {
      throw new Error(clientMessangesEnum.UPDATE_WITH_INVALID_EMAIL);
    }
    this._email = email;
  }
}
