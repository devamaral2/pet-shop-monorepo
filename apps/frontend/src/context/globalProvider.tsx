import { IFindAllSchedulesProps } from "@pet-shop/entities/IFindAllSchedules";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { FindAllSchedulesDto } from "../../../../packages/entities/src/interfaces/FindAllSchedules.dto";
import { findAllSchedules } from "../services/general.service";
export const GeneralContext = createContext<IGeneralContext>(
  {} as IGeneralContext
);

export function useGeneralContext() {
  return useContext(GeneralContext);
}

export function GeneralProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<IFindAllSchedulesProps>({
    clientSearch: "",
    page: 1,
    status: "",
    startTime: 0,
    endTime: 0,
  });
  console.info(setFilters);
  const [start, setStart] = useState(false);

  // const { debouncedValue: debouncedKeyword, isDebouncing } = useDebounce(
  //     keyword,
  //     1000
  // );
  console.info(start);

  const { data: apiResponse, isFetching } = useQuery({
    queryKey: ["schedules", filters],
    queryFn: () => findAllSchedules(filters),
    refetchOnWindowFocus: false,
  });
  console.info(isFetching);
  // const handlePageChange = (page) => {
  //     setFilters((prev) => ({ ...prev, page }));
  //     pushParameter('page', page.toString());
  // };

  // const handleChangeKeyword = (e) => {
  //     if (!start) setStart(true);
  //     setKeyword(e.target.value);
  //     pushParameter('keyword', e.target.value);
  // };

  const provided = { apiResponse, isFetching, start, filters };
  const provide = useMemo(() => provided, [provided]);

  return (
    <GeneralContext.Provider value={provide}>
      {children}
    </GeneralContext.Provider>
  );
}

export interface IGeneralContext {
  apiResponse: FindAllSchedulesDto;
  start: boolean;
  isFetching: boolean;
  filters: IFindAllSchedulesProps;
}
