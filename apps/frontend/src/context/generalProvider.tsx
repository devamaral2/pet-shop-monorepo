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
import { FindAllSchedulesDto } from "../../../../packages/entities/src/interfaces/FindAllSchedules.dto";
import { useDebounce } from "../hookes/useDebounce";
import { findAllSchedules } from "../services/general.service";
import { IFindAllQuery } from "../utils/query.interface";
export const GeneralContext = createContext<IGeneralContext>(
  {} as IGeneralContext
);

export function useGeneralContext() {
  return useContext(GeneralContext);
}

export function GeneralProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<IFindAllQuery>({
    clientSearch: "",
    page: 1,
    status: "all",
    startTime: "",
    endTime: "",
  });
  const [clientQuery, setClientQuery] = useState("");

  const { debouncedValue, isDebouncing } = useDebounce(clientQuery, 1000);

  const { data: apiResponse, isFetching } = useQuery({
    queryKey: ["schedules", filters],
    queryFn: () => findAllSchedules(filters),
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleChangeTime = (date: string, context: "startTime" | "endTime") => {
    setFilters((prev) => ({
      ...prev,
      [context]: date,
    }));
  };

  const handleChangeClientQuery = (query: string) => {
    setClientQuery(query);
  };
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      clientSearch: debouncedValue,
    }));
  }, [debouncedValue]);

  const provided = {
    apiResponse,
    isFetching,
    filters,
    setFilters,
    handlePageChange,
    handleChangeTime,
    handleChangeClientQuery,
    isDebouncing,
    clientQuery,
  };
  const provide = useMemo(() => provided, [provided]);

  return (
    <GeneralContext.Provider value={provide}>
      {children}
    </GeneralContext.Provider>
  );
}

export interface IGeneralContext {
  apiResponse: FindAllSchedulesDto;
  isFetching: boolean;
  isDebouncing: boolean;
  filters: IFindAllQuery;
  clientQuery: string;
  setFilters: Dispatch<React.SetStateAction<IFindAllQuery>>;
  handlePageChange: (page: number) => void;
  handleChangeClientQuery: (query: string) => void;
  handleChangeTime: (date: string, context: "startTime" | "endTime") => void;
}
