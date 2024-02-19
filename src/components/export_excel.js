import React from "react";

const ExportExcel = ({ onBtnExport }) => {
  return (
    <div className="col-4">
      <button
        type="button"
        className="export-excel-btn btn btn-outline-success btn-lg "
        onClick={onBtnExport}
      >
        Download The Table
      </button>
    </div>
  );
};

export default ExportExcel;
