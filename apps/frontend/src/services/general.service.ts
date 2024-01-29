import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";

export async function findAllSchedules(props: IFindAllSchedulesProps) {
  const params = new URLSearchParams();
  Object.entries(props).forEach(([key, value]) => {
    if (value) {
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
