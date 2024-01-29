import { useToast } from "@chakra-ui/react";
import { IClient } from "@pet-shop/entities/client";
import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebounce } from "../hookes/useDebounce";
import {
  createSchedule,
  findAllClientsWithoutSchedule,
} from "../services/createSchedule.service";
export const CreateScheduleContext = createContext<ICreateScheduleContext>(
  {} as ICreateScheduleContext
);

export function useCreateScheduleContext() {
  return useContext(CreateScheduleContext);
}

export function CreateScheduleProvider({ children }: { children: ReactNode }) {
  const [clientQuery, setClientQuery] = useState("");
  const [stableClientQuery, setStableClientQuery] = useState("");
  const [date, setDate] = useState("");
  const toast = useToast();
  const [choosedClient, setChoosedClient] = useState<
    (IClient & { id: string }) | null
  >(null);
  const { debouncedValue, isDebouncing } = useDebounce(clientQuery, 1000);

  const { data: clients, isFetching } = useQuery({
    queryKey: ["clients", stableClientQuery],
    queryFn: () => findAllClientsWithoutSchedule(stableClientQuery),
    refetchOnWindowFocus: false,
  });

  const handleChangeClientQuery = (query: string) => {
    setClientQuery(query);
  };

  const handleChangeDate = (query: string) => {
    setDate(query);
  };

  const handleScheduleCreation = async () => {
    try {
      await createSchedule(choosedClient?.id as string, date);
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

  useEffect(() => {
    setStableClientQuery(debouncedValue);
  }, [debouncedValue]);

  const provided = {
    clients,
    isFetching,
    handleChangeClientQuery,
    isDebouncing,
    clientQuery,
    choosedClient,
    setChoosedClient,
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
  clients: Array<IClient & { id: string }>;
  isFetching: boolean;
  isDebouncing: boolean;
  clientQuery: string;
  choosedClient: (IClient & { id: string }) | null;
  setChoosedClient: Dispatch<
    React.SetStateAction<
      | (IClient & {
          id: string;
        })
      | null
    >
  >;
  handleChangeClientQuery: (query: string) => void;
  date: string;
  handleChangeDate: (query: string) => void;
  handleScheduleCreation: () => void;
}
