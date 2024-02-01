/* eslint-disable react-hooks/exhaustive-deps */
import { IClient } from "@pet-shop/entities/client";
import { ErrorsDictionary } from "@pet-shop/entities/errorsDictionary";
import { SuccessDictionary } from "@pet-shop/entities/successDictionary";
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
import { scheduleVerification } from "../utils/schedule.verification";
export const CreateScheduleContext = createContext<ICreateScheduleContext>(
  {} as ICreateScheduleContext
);

export function useCreateScheduleContext() {
  return useContext(CreateScheduleContext);
}

interface ISelectedClient {
  label: string;
  value: string;
  client: IClient;
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
    try {
      scheduleVerification(
        selectedClient?.client as IClient,
        new Date(date).getTime()
      );
      const response = await createSchedule(
        selectedClient?.value as string,
        date
      );
      const responseContext =
        response?.message === SuccessDictionary.CREATE_SCHEDULE_SUCCESS.message
          ? "success"
          : "error";
      defaultToast(response?.message as string, responseContext);
    } catch (error: any) {
      defaultToast(ErrorsDictionary[error?.message as string].message, "error");
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
