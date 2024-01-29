import { StatusEnum } from "@pet-shop/entities/statusenum";

export const statusTranslator = (status: StatusEnum & "all") => {
  switch (status) {
    case "canceled":
      return "Cancelado";
    case "done":
      return "Concluído";
    case "scheduled":
      return "Agendado";
    default:
      return "Todos";
  }
};
