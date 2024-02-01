import { fakerPT_BR } from "@faker-js/faker";
import { IPet } from "@pet-shop/entities/pet";

export function creatingClientSeedQuery(pets: Array<IPet>) {
  const queryStringForClients =
    "INSERT INTO clients (name, email, pet_id) VALUES\n";

  return pets.reduce((acc, pet, index) => {
    const firstName = fakerPT_BR.person.firstName();
    const lastName = fakerPT_BR.person.lastName();
    const email = fakerPT_BR.internet.email({ firstName, lastName });
    return `${acc}('${firstName} ${lastName}', '${email}', '${pet.id}')${index === pets.length - 1 ? ";" : ",\n"}`;
  }, queryStringForClients);
}
