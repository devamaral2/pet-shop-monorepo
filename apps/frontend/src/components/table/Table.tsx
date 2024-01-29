import { Progress } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useGeneralContext } from "../../context/generalProvider";
import { Card } from "../Card";
import { NoDataComponent } from "./NoDataComponent";
import { paginationComponentOptions } from "./PaginationComponentOptions";
import { columns } from "./columns";
export function Table() {
  const { apiResponse, isFetching, handlePageChange, filters } =
    useGeneralContext();
  if (isFetching) return <> </>;
  return (
    <Card>
      <DataTable
        columns={columns}
        style={{ padding: "2rem" }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={apiResponse.schedules as any[]}
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
