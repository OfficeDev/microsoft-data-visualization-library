import React from "react";
import { Chart } from "../src/chart";
import { IChart } from "../src/types";
import { Patterns } from "../src/lib/patterns";
import {
  BarChart,
  BarChartHighContrast,
  HorizontalBarChart,
  HorizontalBarChartHighContrast,
} from "../src/lib/builder";
import { Container, DarkContainer, HighContrastContainer } from "./components";
import { customOptions } from "./utils";

export default {
  title: "Charts/Horizontal bar",
  component: Chart,
};

const datasets = [
  {
    label: "Sales",
    data: [860, 6700, 3100, 2012, 1930],
    color: "#6264A7",
  },
];

export const Default = () => {
  const config: IChart = new HorizontalBarChart({
    areaLabel: "Horizontal bar chart sample",
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
    label: "Sales",
    data: [860, 6700, 3100, 2012, 1930],
    pattern: Patterns.Diagonal,
  },
];

export const HighContrast = () => {
  const config: IChart = new HorizontalBarChartHighContrast({
    areaLabel: "Horizontal bar chart sample",
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
    label: "Sales",
    data: [860, 6700, 3100, 2012, 1930],
    color: "rgb(255, 99, 132)",
  },
];

export const CustomTheme = () => {
  const config: IChart = new HorizontalBarChart({
    areaLabel: "Horizontal bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: datasetsCustomTheme,
    },
  });
  return (
    <Container>
      <Chart {...config} />
    </Container>
  );
};
