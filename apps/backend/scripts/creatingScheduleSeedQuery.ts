import { fakerPT_BR } from "@faker-js/faker";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { Client } from "pg";

export function creatingScheduleSeedQuery(
  clients: Array<Client & { id: string }>
) {
  const queryStringForSchedules =
    "INSERT INTO schedules (timestamp, status, client_id) VALUES\n";

  return clients.reduce((acc, client, index) => {
    const timestamp =
      new Date().getTime() + fakerPT_BR.number.int({ min: 36000, max: 108000 });
    return `${acc}(${timestamp}, '${StatusEnum.SCHEDULED}', '${client.id}')${index === clients.length - 1 ? ";" : ",\n"}`;
  }, queryStringForSchedules);
}
