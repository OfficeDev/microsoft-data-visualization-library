import React from "react";
import { Chart } from "../src/chart";
import { IChart } from "../src/types";
import { Patterns } from "../src/lib/patterns";
import { PieChart, PieChartHighContrast } from "../src/lib/builder";
import { Container, DarkContainer, HighContrastContainer } from "./components";
import { customPieOptions } from "./utils";

export default {
  title: "Charts/Pie",
  component: Chart,
};

const datasets = [
  {
    label: "Sales",
    data: [2004, 1600, 480, 504, 1000],
    color: ["#6264A7", "#C8C6C4", "#BDBDE6", "#605E5C", "#464775", "#252423"],
  },
];

export const Default = () => {
  const config: IChart = new PieChart({
    areaLabel: "Pie chart sample",
    data: {
      labels: ["Laptops", "Tablets", "Phones", "Displays", "Watches"],
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
    pattern: [
      Patterns.Diagonal,
      Patterns.Square,
      Patterns.Grid,
      Patterns.Grid2,
      Patterns.Line,
    ],
  },
];

export const HighContrast = () => {
  const config: IChart = new PieChartHighContrast({
    areaLabel: "Pie chart sample",
    data: {
      labels: ["Laptops", "Tablets", "Phones", "Displays", "Watches"],
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
    color: [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
    ],
  },
];

export const CustomTheme = () => {
  const config: IChart = new PieChart({
    areaLabel: "Pie chart sample",
    data: {
      labels: ["Laptops", "Tablets", "Phones", "Displays", "Watches"],
      datasets: datasetsCustomTheme,
    },
    options: customPieOptions,
  });
  return (
    <DarkContainer>
      <Chart {...config} />
    </DarkContainer>
  );
};
