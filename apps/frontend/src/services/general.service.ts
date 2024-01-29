import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import { StatusEnum } from "@pet-shop/entities/statusenum";

export async function findAllSchedules(props: IFindAllSchedulesProps) {
  const params = new URLSearchParams();
  Object.entries(props).forEach(([key, value]) => {
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

export async function updateSchedules(id: string, status: StatusEnum) {
  console.log(id, status);
  const response = await fetch(`http://localhost:8000/schedule/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
}
