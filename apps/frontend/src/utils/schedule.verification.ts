import { IClient } from "@pet-shop/entities/client";
import { Schedule } from "@pet-shop/entities/schedule";

export function scheduleVerification(client: IClient, timestamp: number) {
  new Schedule({
    client,
    timestamp,
  });
}
