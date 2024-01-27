import { regex } from "../../utils/regex";
import { Pet } from "../pet/pet";
import { clientMessangesEnum } from "./enum/clientMessanges.enum";

export interface ClientProps {
  name: string;
  email: string;
  pet: Pet;
}
export class Client {
  private props: ClientProps;
  constructor(props: ClientProps) {
    if (!this.emailTest(props.email)) {
      throw new Error(clientMessangesEnum.CREATE_WITH_INVALID_EMAIL);
    }
    this.props = props;
  }

  private emailTest(email: string) {
    return regex.email.test(email);
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    if (!this.emailTest(email)) {
      throw new Error(clientMessangesEnum.UPDATE_WITH_INVALID_EMAIL);
    }
    this.props.email = email;
  }
}
