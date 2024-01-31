interface SuccessValue {
  key: string;
  status: number;
  message: string;
}

export const ErrorsDictionary: Record<string, SuccessValue> = {
  CREATE_CLIENT_WITH_INVALID_EMAIL: {
    key: "CREATE_CREATE_WITH_INVALID_EMAIL",
    status: 400,
    message: "Um cliente não pode ser criado com um formato de email inválido",
  },
  UPDATE_CLIENT_WITH_INVALID_EMAIL: {
    key: "UPDATE_CLIENT_WITH_INVALID_EMAIL",
    status: 400,
    message: "Um cliente não pode receber um formato de email inválido",
  },
  CREATE_PET_WITH_INVALID_SPECIES: {
    key: "CREATE_PET_WITH_INVALID_SPECIES",
    status: 400,
    message:
      "O campo especie deve ser preenchido com os valores cachorro ou gato",
  },
  CREATE_SCHEDULE_WITH_INVALID_TIMESTAMP: {
    key: "CREATE_SCHEDULE_WITH_INVALID_TIMESTAMP",
    status: 400,
    message: "Você só poderá criar um agendamento para uma data futura",
  },
  UPDATE_SCHEDULE_WITH_INVALID_STATUS: {
    key: "UPDATE_SCHEDULE_WITH_INVALID_STATUS",
    status: 400,
    message: "Os status válidos são: agendado, concuído e cancelado",
  },
  UPDATE_SCHEDULE_WITH_INVALID_ID: {
    key: "UPDATE_SCHEDULE_WITH_INVALID_ID",
    status: 404,
    message: "Este agendamento não existe no banco de dados",
  },
  CREATE_SCHEDULE_WITH_INVALID_CLIENT_ID: {
    key: "CREATE_SCHEDULE_WITH_INVALID_CLIENT_ID",
    status: 404,
    message: "Este cliente não existe no banco de dados",
  },
  CREATE_SCHEDULE_WITH_SCHEDULED_CLIENT: {
    key: "CREATE_SCHEDULE_WITH_SCHEDULED_CLIENT",
    status: 400,
    message:
      "Não é possível criar um agendamento para um cliente que já possua um agendamento",
  },
};
