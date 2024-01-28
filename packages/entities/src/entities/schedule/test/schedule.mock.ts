import { clientMock } from "../../client/test/client.mock";
import { Schedule } from "../schedule";

export const scheduleWithWrongTimestampMock = () =>
  new Schedule({
    timestamp: new Date().getTime() - 10000,
    client: clientMock,
  });

export const scheduleMock = new Schedule({
  timestamp: new Date().getTime() + 10000,
  client: clientMock,
});
