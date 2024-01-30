import { StatusEnum } from "@pet-shop/entities/statusenum";

export const statusTranslator = (status: StatusEnum & "all") => {
  switch (status) {
    case "canceled":
      return { value: "Cancelado", color: "red.600" };
    case "done":
      return { value: "Concluído", color: "green.500" };
    case "scheduled":
      return { value: "Agendado", color: "blue.400" };
    default:
      return { value: "Todos", color: "grey.600" };
  }
};
