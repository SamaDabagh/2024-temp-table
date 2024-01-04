import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Papa from "papaparse";
import sewer_design from "./assets/sewer_design.csv";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import ExportExcel from "./components/export_excel";
import "./App.css";
// import HistogramDiameter from "./components/Histograms/Histogram_Diameter";

export default function App() {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    const fetchParseData = async (params) => {
      Papa.parse(sewer_design, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          setRowData(
            result.data.slice(1).map((dataOfEachRow) => {
              const rowObject = {};
              result.data[0].forEach((key, index) => {
                rowObject[key] = Number(dataOfEachRow[index]);
              });
              console.log(rowObject);
              return rowObject;
            })
          );
          setColumnDefs(
            result.data[0].map((columnKey) => ({
              headerName: columnKey,
              field: columnKey,
            }))
          );
        },
      });
    };
    fetchParseData();
  }, []);
  console.log("columnDefs: ", columnDefs);
  console.log("rowData[0]: ", rowData);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: "agNumberColumnFilter",
      tooltipField: "Pipe",
      unSortIcon: true,
      resizable: true,
    }),
    []
  );

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 525 }}>
      {/* <ExportExcel /> */}
      <select
        onChange={onPageSizeChanged}
        id="page-size"
        className="pagination-dropdown"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
        animateRows={true}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        // paginationAutoPageSize={true}

        enableBrowserTooltips={true}
      />
      {/* <HistogramDiameter rowData={rowData} /> */}
    </div>
  );
}
