import React from "react";
import { Chart } from "../src/chart";
import { IChart } from "../src/types";
import { Patterns } from "../src/lib/patterns";
import {
  GroupedBarChartHighContrast,
  GroupedBarChart,
} from "../src/lib/builder";
import { Container, DarkContainer, HighContrastContainer } from "./components";
import { customOptions } from "./utils";

export default {
  title: "Charts/Grouped bar",
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
];

export const Default = () => {
  const config: IChart = new GroupedBarChart({
    areaLabel: "Grouped bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets,
    },
  });
  return (
    <Container>
      <Chart {...config} />
    </Container>
  );
};

const datasetsHighContrast = [
  {
    label: "Tablets",
    data: [860, 6700, 3100, 2012, 1930],
    pattern: Patterns.Diagonal,
  },
  {
    label: "Phones",
    data: [100, 1600, 180, 3049, 3596],
    pattern: Patterns.Square,
  },
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    pattern: Patterns.Grid2,
  },
  {
    label: "Watches",
    data: [200, 3600, 480, 5049, 4596],
    pattern: Patterns.Grid,
  },
];

export const HighContrast = () => {
  const config: IChart = new GroupedBarChartHighContrast({
    areaLabel: "Grouped bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: datasetsHighContrast,
    },
  });
  return (
    <HighContrastContainer>
      <Chart {...config} />
    </HighContrastContainer>
  );
};

const datasetsCustomTheme = [
  {
    label: "Tablets",
    data: [860, 6700, 3100, 2012, 1930],
    color: "rgb(255, 99, 132)",
  },
  {
    label: "Phones",
    data: [100, 1600, 180, 3049, 3596],
    color: "rgb(255, 159, 64)",
  },
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    color: "rgb(255, 205, 86)",
  },
  {
    label: "Watches",
    data: [200, 3600, 480, 5049, 4596],
    color: "rgb(75, 192, 192)",
  },
];

export const CustomTheme = () => {
  const config: IChart = new GroupedBarChart({
    areaLabel: "Grouped bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: datasetsCustomTheme,
    },
    options: customOptions,
  });
  return (
    <DarkContainer>
      <Chart {...config} />
    </DarkContainer>
  );
};
