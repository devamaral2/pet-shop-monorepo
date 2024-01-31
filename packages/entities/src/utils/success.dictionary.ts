interface SuccessValue {
  status: number;
  message: string;
}

export const SuccessDictionary: Record<string, SuccessValue> = {
  CREATE_SCHEDULE_SUCCESS: {
    status: 201,
    message: "O agendamento foi criado com sucesso!",
  },
  UPDATE_SCHEDULE_SUCCESS: {
    status: 200,
    message: "O status do agendamento foi atualizado com sucesso!",
  },
};
