import { fakerPT_BR } from "@faker-js/faker";
import { IClient } from "@pet-shop/entities/client";
import { StatusEnum } from "@pet-shop/entities/statusenum";

export function creatingScheduleSeedQuery(clients: Array<IClient>) {
  const queryStringForSchedules =
    "INSERT INTO schedules (timestamp, status, client_id) VALUES\n";
  clients.splice(50, 10);
  return clients.reduce((acc, client, index) => {
    const timestamp =
      new Date().getTime() +
      fakerPT_BR.number.int({ min: 86400000, max: 864000000 });
    return `${acc}(${timestamp}, '${StatusEnum.SCHEDULED}', '${client.id}')${index === clients.length - 1 ? ";" : ",\n"}`;
  }, queryStringForSchedules);
}
