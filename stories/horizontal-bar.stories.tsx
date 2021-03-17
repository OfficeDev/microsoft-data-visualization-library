import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart } from "../src/chart";
import { IChart } from "../src/types";
import { Patterns } from "../src/lib/patterns";
import {
  BarChart,
  BarChartHighContrast,
  HorizontalBarChart,
} from "../src/lib/builder";
import { Container, DarkContainer, HighContrastContainer } from "./components";
import { customOptions } from "./utils";

export default {
  title: "Charts/Horizontal bar",
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
  const dataVizProps: IChart = new HorizontalBarChart({
    areaLabel: "Horizontal bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets,
    },
  });
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
    pattern: Patterns.Square,
  },
];

export const HighContrast = () => {
  const dataVizProps: IChart = new BarChartHighContrast({
    areaLabel: "Bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: datasetsHighContrast,
    },
  });
  return (
    <HighContrastContainer>
      <Chart {...object("Configuration", dataVizProps, "Default")} />
    </HighContrastContainer>
  );
};

const datasetsCustomTheme = [
  {
    label: "Tablets",
    data: [860, 6700, 3100, 2012, 1930],
    color: "rgb(255, 99, 132)",
  },
];

export const CustomTheme = () => {
  const dataVizProps: IChart = new BarChart({
    areaLabel: "Bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: datasetsCustomTheme,
    },
    options: customOptions,
  });
  return (
    <DarkContainer>
      <Chart {...object("Configuration", dataVizProps, "Default")} />
    </DarkContainer>
  );
};
