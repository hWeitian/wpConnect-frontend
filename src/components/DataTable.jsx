import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({
  checkboxSelection,
  columns,
  rows,
  isDataLoading,
  handleHiddenIconOpen,
  handleHiddenIconClose,
}) => {
  const defaultPage = 0;
  const defaultPageSize = 10;

  const [paginationModel, setPaginationModel] = useState({
    page: defaultPage,
    pageSize: defaultPageSize,
  });

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      pageSizeOptions={[5, 10]}
      checkboxSelection={checkboxSelection}
      disableRowSelectionOnClick
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      loading={isDataLoading}
      slotProps={{
        cell: {
          onMouseEnter: handleHiddenIconOpen,
          onMouseLeave: handleHiddenIconClose,
        },
      }}
    />
  );
};

export default DataTable;
