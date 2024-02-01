import { IFindAllSchedulesDto } from "@pet-shop/entities/IFindAllSchedulesDto";
import { StatusEnum } from "@pet-shop/entities/statusenum";
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
import { SuccessDictionary } from "../../../../packages/entities/src";
import { useDefaultToast } from "../hook/useSuccess";
import { useDebounce } from "../hookes/useDebounce";
import { findAllSchedules, updateSchedules } from "../services/general.service";
import { IFindAllQuery } from "../utils/query.interface";
export const GeneralContext = createContext<IGeneralContext>(
  {} as IGeneralContext,
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

  const { defaultToast } = useDefaultToast();

  const { debouncedValue, isDebouncing } = useDebounce(clientQuery, 1000);
  const [apiResponse, setApiResponse] = useState<IFindAllSchedulesDto>(
    {} as IFindAllSchedulesDto,
  );

  const { isFetching } = useQuery({
    queryKey: ["schedules", filters],
    queryFn: () => findAllSchedules(filters),
    onSuccess: (data) => {
      setApiResponse(data);
    },
    refetchOnWindowFocus: false,
  });

  const handleUpdateSchedule = async (id: string, status: StatusEnum) => {
    const response = await updateSchedules({ id, status });
    if (
      response?.message === SuccessDictionary.UPDATE_SCHEDULE_SUCCESS.message
    ) {
      setApiResponse((prev) => ({
        totalOfLines: prev.totalOfLines,
        schedules: prev.schedules.map((item) => {
          if (item.id === id) {
            return { ...item, status };
          }
          return item;
        }),
      }));
    } else {
      defaultToast(response?.message, "error");
    }
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleChangeTime = (
    date: string,
    context?: "startTime" | "endTime",
  ) => {
    setFilters((prev) => ({
      ...prev,
      [context || "startTime"]: date,
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
    handleUpdateSchedule,
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
  apiResponse: IFindAllSchedulesDto;
  isFetching: boolean;
  isDebouncing: boolean;
  filters: IFindAllQuery;
  clientQuery: string;
  handleUpdateSchedule: (id: string, status: StatusEnum) => void;
  setFilters: Dispatch<React.SetStateAction<IFindAllQuery>>;
  handlePageChange: (page: number) => void;
  handleChangeClientQuery: (query: string) => void;
  handleChangeTime: (date: string, context?: "startTime" | "endTime") => void;
}
