import { regex } from "../../utils/regex";
import { Pet } from "../pet/pet";

export interface ClientProps {
  name: string;
  email: string;
  pet: Pet;
}
export class Client {
  private props: ClientProps;
  constructor(props: ClientProps) {
    if (!this.emailTest(props.email)) {
      throw new Error(
        "Um client não pode ser criado com um formato de email inválido"
      );
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
      throw new Error(
        "Um client não pode receber um formato de email inválido"
      );
    }
    this.props.email = email;
  }
}
