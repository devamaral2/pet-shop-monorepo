import { fakerPT_BR } from "@faker-js/faker";
import { SpeciesEnum } from "@pet-shop/entities/speciesenum";

export function creatingPetsSeedQuery() {
  const queryStringForPets =
    "INSERT INTO pets (name, species, image_url) VALUES\n";
  const petsToCreate = new Array(60).fill("pet");
  return petsToCreate.reduce((acc, _pet, index) => {
    const species = fakerPT_BR.helpers.arrayElement(Object.values(SpeciesEnum));
    const petName =
      species === SpeciesEnum.DOG
        ? fakerPT_BR.animal.dog()
        : fakerPT_BR.animal.cat();
    return `${acc}('${petName}', '${species}', '${fakerPT_BR.image.urlLoremFlickr({ category: species as string })}')${index === petsToCreate.length - 1 ? ";" : ",\n"}`;
  }, queryStringForPets);
}
