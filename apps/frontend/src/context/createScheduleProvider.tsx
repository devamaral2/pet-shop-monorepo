/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useDefaultToast } from "../hook/useSuccess";
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
  const [selectedClient, setSelectedClientClient] =
    useState<ISelectedClient | null>(null);
  const { defaultToast } = useDefaultToast();

  const handleChangeDate = (query: string) => {
    setDate(query);
  };

  const handleScheduleCreation = async () => {
    const response = await createSchedule(
      selectedClient?.value as string,
      date
    );
    const responseContext =
      response?.message === "Status Alterado con sucesso" ? "success" : "error";
    defaultToast(response?.message as string, responseContext);
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
