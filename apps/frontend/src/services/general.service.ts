import { StatusEnum } from "@pet-shop/entities/statusenum";
import { IFindAllQuery } from "../utils/query.interface";
import queryClient from "./queryClient";

export async function findAllSchedules(props: IFindAllQuery) {
  const params = new URLSearchParams();
  const { startTime, endTime, ...otherKeys } = props;
  if (startTime && endTime) {
    Object.entries({ startTime, endTime }).forEach(([key, value]) => {
      params.append(key, new Date(value).getTime().toString());
    });
  }
  Object.entries(otherKeys).forEach(([key, value]) => {
    if (value) {
      if (key === "status" && value === "all") return;
      params.append(key, value.toString());
    }
  });
  const response = await fetch(
    `http://localhost:8000/schedule?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}

export async function updateSchedules({
  id,
  newStatus,
}: {
  id: string;
  newStatus: StatusEnum;
}) {
  await fetch(`http://localhost:8000/schedule/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });
  queryClient.invalidateQueries(["schedules"]);
}
