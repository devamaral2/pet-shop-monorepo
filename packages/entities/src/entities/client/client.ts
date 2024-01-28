import { ErrorsDictionary, IPet } from "../..";
import { regex } from "../../utils/regex";

export interface IClient {
  name: string;
  email: string;
  pet: IPet;
}
export class Client implements IClient {
  private _name: string;
  private _email: string;
  private _pet: IPet;
  constructor(props: IClient) {
    if (!this.emailTest(props.email)) {
      throw new Error(ErrorsDictionary.CREATE_CLIENT_WITH_INVALID_EMAIL.key);
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
      throw new Error(ErrorsDictionary.UPDATE_CLIENT_WITH_INVALID_EMAIL.key);
    }
    this._email = email;
  }
}
