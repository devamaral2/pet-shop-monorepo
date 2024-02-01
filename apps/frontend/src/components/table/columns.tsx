import { Avatar, Stack, Tooltip } from "@chakra-ui/react";
import { ISchedule } from "@pet-shop/entities/schedule";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { TableColumn } from "react-data-table-component";
import { StatusMenu } from "../StatusMenu";

export function columns(
  handleUpdateSchedule: (id: string, status: StatusEnum) => void
) {
  const columns: TableColumn<ISchedule>[] = [
    {
      name: "Pet",
      cell: (row) => (
        <Stack>
          <Tooltip label={row?.client?.pet?.name} placement={"top"} hasArrow>
            <Avatar
              name={row?.client?.pet?.name}
              src={row?.client?.pet?.imageUrl}
              w="2rem"
              h="2rem"
            />
          </Tooltip>
        </Stack>
      ),
      maxWidth: "120px",
    },
    {
      name: "Cliente",
      selector: (row) => row?.client?.name || "Sem nome",
    },
    {
      name: "Data",
      selector: (row) => {
        console.log(row);
        const addZero = (n: number) => (n < 10 ? `0${n}` : n);
        const date = new Date(Number(row.timestamp));
        const day = addZero(date.getDate());
        const month = addZero(date.getMonth() + 1);
        const year = date.getFullYear();
        const hour = addZero(date.getHours());
        const minute = addZero(date.getMinutes());
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
                newState as StatusEnum
              );
            }}
          />
        </Stack>
      ),
    },
  ];

  return columns;
}
