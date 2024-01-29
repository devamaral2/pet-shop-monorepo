import { Progress } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useGeneralContext } from "../../context/globalProvider";
import { Card } from "../Card";
import { NoDataComponent } from "./NoDataComponent";
import { paginationComponentOptions } from "./PaginationComponentOptions";
import { columns } from "./columns";
export function Table() {
  const { apiResponse, isFetching } = useGeneralContext();
  console.log(apiResponse);
  if (isFetching) return <> </>;
  return (
    <Card>
      <DataTable
        columns={columns}
        style={{ padding: "2rem" }}
        data={apiResponse.schedules}
        pagination
        paginationServer
        paginationTotalRows={apiResponse.totalOfLines}
        onChangePage={() => null}
        progressComponent={<Progress />}
        progressPending={isFetching}
        paginationPerPage={10}
        paginationDefaultPage={1}
        paginationComponentOptions={paginationComponentOptions}
        noDataComponent={<NoDataComponent />}
      />
    </Card>
  );
}
