import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Papa from "papaparse";
import sewer_design from "./assets/sewer_design.csv";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ExportExcel from "./components/export_excel";
import "./App.css";
import HistogramDiameter from "./components/Histograms/Histogram_Diameter";
import HistogramSlope from "./components/Histograms/Histogram_Slope";
import HistogramVelocity from "./components/Histograms/Histogram_Velocity";
import HistogramHD from "./components/Histograms/Histogram_H_D";

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
            result.data
              .slice(1, result.data.length - 1)
              .map((dataOfEachRow) => {
                const rowObject = {};
                result.data[0].forEach((key, index) => {
                  rowObject[key] = Number(dataOfEachRow[index]);
                });
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

  //export to csv
  const gridApiRef = useRef(null);
  const gridOptions = {
    defaultColDef,
    suppressExcelExport: true,
    popupParent: document.body,
    columnDefs,
    rowData,
  };

  const onBtnExport = () => {
    gridApiRef.current.exportDataAsCsv();
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };
  return (
    <main className="container-fluid  ">
      <section className="container-top-of-the-table  row align-items-center px-3">
        <ExportExcel
          className="export-excel-btn  "
          onBtnExport={onBtnExport}
          onGridReady={onGridReady}
        />
        <select
          onChange={onPageSizeChanged}
          id="page-size"
          className="pagination-dropdown col-3 my-5 border border-success rounded"
          style={{
            border: "3px solid",
            padding: "15px",
            fontSize: "14px",
            fontWeight: "bold",
            // color: "#82ca9d",
            cursor: "pointer",
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </section>

      <div className="ag-theme-alpine text-center" style={{ height: 525 }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
          rowSelection="multiple"
          animateRows={true}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          enableBrowserTooltips={true}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
        />
        <div className="container-histogram container-fluid">
          <div className=" row px-3 py-5">
            <div className="col">
              {rowData.length > 0 && (
                <HistogramDiameter className="histogram" rowData={rowData} />
              )}{" "}
            </div>
            <div className="col">
              {rowData.length > 0 && (
                <HistogramSlope className="histogram" rowData={rowData} />
              )}{" "}
            </div>
          </div>
          <div className="row">
            <div className="col">
              {rowData.length > 0 && (
                <HistogramVelocity className="histogram" rowData={rowData} />
              )}{" "}
            </div>
            <div className="col">
              {rowData.length > 0 && (
                <HistogramHD className="histogram" rowData={rowData} />
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
