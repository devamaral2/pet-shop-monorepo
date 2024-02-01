import { Stack } from "@chakra-ui/react";
import { ISchedule } from "@pet-shop/entities/schedule";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { TableColumn } from "react-data-table-component";
import { StatusMenu } from "../StatusMenu";

export function columns(
  handleUpdateSchedule: (id: string, status: StatusEnum) => void,
) {
  const columns: TableColumn<ISchedule>[] = [
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
      cell: (row) => (
        <Stack w="60%">
          <StatusMenu
            state={row.status as StatusEnum}
            setState={async (newState) => {
              await handleUpdateSchedule(
                row.id as string,
                newState as StatusEnum,
              );
            }}
          />
        </Stack>
      ),
    },
  ];

  return columns;
}
