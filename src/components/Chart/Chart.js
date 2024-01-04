import { ResponsiveBar } from "@nivo/bar";

const keys = ["Flow"];
const props = {
  indexBy: "Diameter",
  keys,
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
  padding: 0.05,
  labelTextColor: "inherit:ligher(1.4)",
  labelSkipWidth: 16,
  labelSkipHeight: 16,
};

export const Chart = ({ rowData }) => {
  console.log("rowData: ", rowData);
  const data = rowData.map((element) => {
    return {
      Diameter: element.Diameter,
      Flow: element.Pipe,
    };
  })
  .sort((a, b) => a.Diameter - b.Diameter);
  // const data1 = [
  //   {
  //     spot: "AD",
  //     deep: 71,
  //   },
  //   {
  //     spot: "AE",
  //     deep: 183,
  //   },
  //   {
  //     spot: "AF",
  //     deep: 186,
  //   },
  //   {
  //     spot: "AG",
  //     deep: 78,
  //   },
  //   {
  //     spot: "AI",
  //     deep: 24,
  //   },
  //   {
  //     spot: "AL",
  //     deep: 140,
  //   },
  //   {
  //     spot: "AM",
  //     deep: 39,
  //   },
  // ];
  console.log("data:", data);
  const data1 = [
    {
        "Diameter": "0.25",
        "Flow": "3207"
    },
    {
        "Diameter": "0.26",
        "Flow": "3699"
    },
    {
        "Diameter": "0.26",
        "Flow": "5000"
    },
  ];

  return <ResponsiveBar data={data1} {...props} />;
};
