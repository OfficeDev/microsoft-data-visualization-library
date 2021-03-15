import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart } from "../src/chart";
import { Container, HighContrastContainer } from "./components";
import { ChartTypes, IChart, Point } from "../src/types";
import {
  LineChartDataSetHCStyle,
  LineChartDataSetStyle,
} from "../src/lib/theme";
import { highContrastChartOptions } from "../src/lib/utils";

export default {
  title: "Charts/Line chart",
  component: Chart,
};

const datasets = [
  {
    label: "Tablets",
    data: [860, 6700, 3100, 2012, 1930],
    color: "#6264A7",
  },
  {
    label: "Phones",
    data: [100, 1600, 180, 3049, 3596],
    color: "#C8C6C4",
  },
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    color: "#BDBDE6",
  },
  {
    label: "Watches",
    data: [200, 3600, 480, 5049, 4596],
    color: "#605E5C",
  },
  {
    label: "TVs",
    data: [960, 8700, 5100, 5012, 3930],
    color: "#464775",
  },
  {
    label: "Displays",
    data: [1000, 4600, 480, 4049, 3596],
    color: "#252423",
  },
];

export const Default = () => {
  const dataVizProps: IChart = {
    type: ChartTypes.Line,
    areaLabel: "Line chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: Array.from(datasets, (set) => new LineChartDataSetStyle(set)),
    },
  };
  return (
    <Container>
      <Chart {...object("Configuration", dataVizProps, "Default")} />
    </Container>
  );
};

const datasetsHighContrast = [
  {
    label: "Tablets",
    data: [860, 6700, 3100, 2012, 1930],
    borderDash: [],
    pointStyle: Point.Circle,
  },
  {
    label: "Phones",
    data: [100, 1600, 180, 3049, 3596],
    borderDash: [],
    pointStyle: Point.Rectangle,
  },
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    borderDash: [],
    pointStyle: Point.Triangle,
  },
  {
    label: "Watches",
    data: [200, 3600, 480, 5049, 4596],
    borderDash: [5, 5],
    pointStyle: Point.Circle,
  },
  {
    label: "TVs",
    data: [960, 8700, 5100, 5012, 3930],
    borderDash: [5, 5],
    pointStyle: Point.Rectangle,
  },
  {
    label: "Displays",
    data: [1000, 4600, 480, 4049, 3596],
    borderDash: [5, 5],
    pointStyle: Point.Triangle,
  },
];

export const HighContrast = () => {
  const dataVizProps: IChart = {
    type: ChartTypes.Line,
    areaLabel: "Line chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: Array.from(
        datasetsHighContrast,
        (set) => new LineChartDataSetHCStyle(set)
      ),
    },
    options: highContrastChartOptions,
  };
  return (
    <HighContrastContainer>
      <Chart {...object("Configuration", dataVizProps, "HighContrast")} />
    </HighContrastContainer>
  );
};

// const stackedKnobGroupID = "Stacked chart";

// export const StackedLineChart = () => {
//   const dataVizProps = {
//     title: "Stacked line chart sample",
//     type: ChartOptions.LineStacked,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Tablets",
//           data: [1860, 4700, 3100, 2012, 1930],
//         },
//         {
//           label: "Phones",
//           data: [1860, 1600, 180, 3049, 3596],
//         },
//         {
//           label: "Laptops",
//           data: [1860, 5700, 4100, 3012, 2930],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, stackedKnobGroupID)} />
//     </Container>
//   );
// };

// const areaKnobGroupID = "Area chart";

// export const AreaChart = () => {
//   const dataVizProps = {
//     title: "Area chart sample",
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Laptops",
//           data: [1860, 7700, 4100, 3012, 2930],
//         },
//         {
//           label: "Watches",
//           data: [200, 3600, 480, 5049, 4596],
//         },
//       ],
//     },
//     gradients: true,
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, areaKnobGroupID)} />
//     </Container>
//   );
// };
