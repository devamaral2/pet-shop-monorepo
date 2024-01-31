import { Progress } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useGeneralContext } from "../../context/generalProvider";
import { Card } from "../Card";
import { NoDataComponent } from "./NoDataComponent";
import { paginationComponentOptions } from "./PaginationComponentOptions";
import { columns } from "./columns";
export function Table() {
  const {
    apiResponse,
    isFetching,
    handlePageChange,
    filters,
    handleUpdateSchedule,
  } = useGeneralContext();
  if (isFetching) return <> </>;
  return (
    <Card>
      <DataTable
        columns={columns(handleUpdateSchedule)}
        style={{ padding: "2rem" }}
        data={apiResponse.schedules}
        pagination
        paginationServer
        paginationTotalRows={apiResponse.totalOfLines}
        onChangePage={handlePageChange}
        progressComponent={
          <Progress
            w="100%"
            size="xs"
            isIndeterminate
            m="2rem"
            colorScheme="green"
          />
        }
        progressPending={isFetching}
        paginationPerPage={10}
        paginationDefaultPage={filters.page}
        paginationComponentOptions={paginationComponentOptions}
        noDataComponent={<NoDataComponent />}
      />
    </Card>
  );
}
