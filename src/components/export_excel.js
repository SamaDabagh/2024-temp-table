import React from "react";

const ExportExcel = ({ onBtnExport }) => {
  return (
    <div className="col-4">
      <button
        type="button"
        className="export-excel-btn btn btn-outline-success btn-lg "
        style={{
          background: "#198754",
          border: "1px solid #f7f7f4",
          padding: "15px",
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "4px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={onBtnExport}
      >
        Download The Table
      </button>
      {/* <select>
        <option value="input">input</option>
        <option value="description">descriptions</option>
      </select> */}
    </div>
  );
};

export default ExportExcel;
