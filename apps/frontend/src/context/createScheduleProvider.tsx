import { IClient } from "@pet-shop/entities/client";
import { useQuery } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebounce } from "../hookes/useDebounce";
import { findAllClientsWithoutSchedule } from "../services/createSchedule.service";
export const CreateScheduleContext = createContext<ICreateScheduleContext>(
  {} as ICreateScheduleContext
);

export function useCreateScheduleContext() {
  return useContext(CreateScheduleContext);
}

export function CreateScheduleProvider({ children }: { children: ReactNode }) {
  const [clientQuery, setClientQuery] = useState("");
  const [stableClientQuery, setStableClientQuery] = useState("");
  const { debouncedValue, isDebouncing } = useDebounce(clientQuery, 1000);

  const { data: clients, isFetching } = useQuery({
    queryKey: ["clients", stableClientQuery],
    queryFn: () => findAllClientsWithoutSchedule(stableClientQuery),
    refetchOnWindowFocus: false,
  });

  const handleChangeClientQuery = (query: string) => {
    setClientQuery(query);
  };
  useEffect(() => {
    setStableClientQuery(debouncedValue);
  }, [debouncedValue]);

  const provided = {
    clients,
    isFetching,
    handleChangeClientQuery,
    isDebouncing,
    clientQuery,
  };
  const provide = useMemo(() => provided, [provided]);

  return (
    <CreateScheduleContext.Provider value={provide}>
      {children}
    </CreateScheduleContext.Provider>
  );
}

export interface ICreateScheduleContext {
  clients: Array<IClient & { id: string }>;
  isFetching: boolean;
  isDebouncing: boolean;
  clientQuery: string;
  handleChangeClientQuery: (query: string) => void;
}
