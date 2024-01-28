export const ErrorsDictionary = {
  CREATE_CLIENT_WITH_INVALID_EMAIL: {
    key: "CREATE_CREATE_WITH_INVALID_EMAIL",
    status: 400,
    messange: "Um client não pode ser criado com um formato de email inválido",
  },
  UPDATE_CLIENT_WITH_INVALID_EMAIL: {
    key: "UPDATE_CLIENT_WITH_INVALID_EMAIL",
    status: 400,
    messange: "Um client não pode receber um formato de email inválido",
  },
  CREATE_PET_WITH_INVALID_SPECIES: {
    key: "CREATE_PET_WITH_INVALID_SPECIES",
    status: 400,
    messange: "O campo species deve ser preenchido com os valores dog ou cat",
  },
  CREATE_SCHEDULE_WITH_INVALID_TIMESTAMP: {
    key: "CREATE_SCHEDULE_WITH_INVALID_TIMESTAMP",
    status: 400,
    messange: "Apenas uma data futura é permitida no campo timestamp",
  },
  UPDATE_SCHEDULE_WITH_INVALID_STATUS: {
    key: "UPDATE_SCHEDULE_WITH_INVALID_STATUS",
    status: 400,
    messange: "Os status válidos são: scheduled, canceled e done",
  },
};
