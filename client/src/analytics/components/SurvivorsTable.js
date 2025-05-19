import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "Survived", headerName: "Survived", width: 100 },
  { field: "Pclass", headerName: "Pclass", width: 100 },
  { field: "Sex", headerName: "Sex", width: 100 },
  { field: "Age", headerName: "Age", width: 100 },
  { field: "SibSp", headerName: "SibSp", width: 100 },
  { field: "Parch", headerName: "Parch", width: 100 },
  { field: "Fare", headerName: "Fare", width: 120 },
  { field: "Embarked", headerName: "Embarked", width: 100 },
];

const SurvivorsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/titanic/survival-table")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <DataGrid
      rows={data.map((row, index) => ({ id: index, ...row }))}
      columns={columns}
      pageSizeOptions={[5, 10, 20]}
      rowsPerPageOptions={[5, 10, 20]}
      disableSelectionOnClick
      autoHeight
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      sx={{
        "& .MuiTablePagination-displayedRows": {
          display: "none",
        },
        "& .MuiTablePagination-selectLabel": {
          display: "none",
        },
      }}
    />
  );
};

export default SurvivorsTable;
