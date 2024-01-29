export async function findAllClientsWithoutSchedule(clientSearch: string) {
  const params = new URLSearchParams(clientSearch);

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
// export function CreateSchedule(id: string, status: StatusEnum) {
//     await fetch(`http://localhost:8000/schedule/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status }),
//     });
//     queryClient.invalidateQueries(["schedules"]);
//     return true;
//   }
