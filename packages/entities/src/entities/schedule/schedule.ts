import { ErrorsDictionary } from "../..";
import { Client } from "../client/client";
import { StatusEnum } from "./enum/status.enum";
interface CreateScheduleProps {
  timestamp: number;
  client: Client;
}

export class Schedule {
  private _timestamp: number;
  private _status: StatusEnum;
  private _client: Client;
  constructor(props: CreateScheduleProps) {
    if (!this.isValidTimestamp(props.timestamp)) {
      throw new Error(
        ErrorsDictionary.CREATE_SCHEDULE_WITH_INVALID_TIMESTAMP.key
      );
    }
    this._timestamp = props.timestamp;
    this._status = StatusEnum.SCHEDULED;
    this._client = props.client;
  }

  isValidStatus(status: StatusEnum): boolean {
    const validSpecies = Object.values(StatusEnum);
    return validSpecies.includes(status);
  }

  isValidTimestamp(timestamp: number): boolean {
    const nowTimestamp = new Date().getTime();
    return timestamp > nowTimestamp;
  }

  get timestamp() {
    return this._timestamp;
  }

  get status() {
    return this._status;
  }

  get client() {
    return this._client;
  }

  public set status(newStatus: StatusEnum) {
    if (!this.isValidStatus(newStatus)) {
      throw new Error(ErrorsDictionary.UPDATE_SCHEDULE_WITH_INVALID_STATUS.key);
    }
    this._status = newStatus;
  }
}
