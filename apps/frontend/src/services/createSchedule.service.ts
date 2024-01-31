import queryClient from "./queryClient";

export async function findAllClientsWithoutSchedule(clientSearch: string) {
  const params = new URLSearchParams();
  if (clientSearch) {
    params.append("clientSearch", clientSearch);
  }

  const response = await fetch(
    `http://localhost:8000/client?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}
export async function createSchedule(clientId: string, date: string) {
  const timestamp = new Date(date).getTime();
  const res = await fetch(`http://localhost:8000/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientId,
      timestamp,
    }),
  });
  queryClient.invalidateQueries(["schedules"]);
  return res.json();
}
