import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart } from "../src/chart";
import { Container } from "./components";
import { ChartTypes, IChart } from "../src/types";
import { BarDataSetStyle } from "../src/lib/theme";
import { barOptions } from "../src/lib/settings";

export default {
  title: "Charts/Bar",
  component: Chart,
};

const datasets = [
  {
    label: "Tablets",
    data: [860, 6700, 3100, 2012, 1930],
    color: "#6264A7",
  },
];

export const Default = () => {
  const dataVizProps: IChart = {
    type: ChartTypes.Bar,
    areaLabel: "Bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: Array.from(datasets, (set) => new BarDataSetStyle(set)),
    },
    options: barOptions,
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, "Default")} />
    </Container>
  );
};

// const datasetsHighContrast = [
//   {
//     label: "Tablets",
//     data: [860, 6700, 3100, 2012, 1930],
//     pattern: Patterns.LineStacked.Square,
//   },
//   {
//     label: "Phones",
//     data: [100, 1600, 180, 3049, 3596],
//     pattern: Patterns.LineStacked.Diagonal,
//   },
//   {
//     label: "Laptops",
//     data: [1860, 7700, 4100, 3012, 2930],
//     pattern: Patterns.LineStacked.Grid,
//   },
// ];

// export const HighContrast = () => {
//   const dataVizProps: IChart = {
//     type: ChartTypes.Line,
//     areaLabel: "Line chart sample",
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: Array.from(
//         datasetsHighContrast,
//         (set) => new LineStackedChartDataSetHCStyle(set)
//       ),
//     },
//     options: deepMerge(highContrastChartOptions, stackedLineChartOptions),
//   };
//   return (
//     <HighContrastContainer>
//       <Chart {...object("Configuration", dataVizProps, "Default")} />
//     </HighContrastContainer>
//   );
// };
