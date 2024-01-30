/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@chakra-ui/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { createSchedule } from "../services/createSchedule.service";
export const CreateScheduleContext = createContext<ICreateScheduleContext>(
  {} as ICreateScheduleContext
);

export function useCreateScheduleContext() {
  return useContext(CreateScheduleContext);
}

interface ISelectedClient {
  label: string;
  value: string;
}

export function CreateScheduleProvider({ children }: { children: ReactNode }) {
  const [date, setDate] = useState("");
  const toast = useToast();
  const [selectedClient, setSelectedClientClient] =
    useState<ISelectedClient | null>(null);

  const handleChangeDate = (query: string) => {
    setDate(query);
  };

  const handleScheduleCreation = async () => {
    try {
      await createSchedule(selectedClient?.label as string, date);
      toast({
        title: "Agendamento criado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch {
      toast({
        title: "Erro ao criar agendamento",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const provided = {
    selectedClient,
    setSelectedClientClient,
    date,
    handleChangeDate,
    handleScheduleCreation,
  };
  const provide = useMemo(() => provided, [provided]);

  return (
    <CreateScheduleContext.Provider value={provide}>
      {children}
    </CreateScheduleContext.Provider>
  );
}

export interface ICreateScheduleContext {
  selectedClient: ISelectedClient | null;
  setSelectedClientClient: Dispatch<SetStateAction<ISelectedClient | null>>;
  date: string;
  handleChangeDate: (query: string) => void;
  handleScheduleCreation: () => void;
}
