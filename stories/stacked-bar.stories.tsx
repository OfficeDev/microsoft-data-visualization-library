import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart } from "../src/chart";
import { Container } from "./components";
import { ChartTypes, IChart } from "../src/types";
import { BarDataSetStyle } from "../src/lib/datasets";
import { barOptions } from "../src/lib/settings";

export default {
  title: "Charts/Stacked bar",
  component: Chart,
};

const datasets = [
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    color: "",
  },
  {
    label: "Watches",
    data: [1200, 3600, 2480, 5049, 4596],
    color: "",
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
