import { ISchedule } from "@pet-shop/entities/schedule";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { TableColumn } from "react-data-table-component";

export const columns: TableColumn<ISchedule & { id: string }>[] = [
  {
    name: "Cliente",
    selector: (row) => row.client.name,
  },
  {
    name: "Data",
    selector: (row) => {
      const date = new Date(Number(row.timestamp));
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();
      return `${day}/${month}/${year} ${hour}:${minute}`;
    },
  },
  {
    name: "Status",
    selector: (row) => row.status as StatusEnum,
  },
];