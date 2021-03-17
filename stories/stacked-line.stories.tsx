import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart } from "../src/chart";
import { IChart } from "../src/types";
import { Patterns } from "../src/lib/patterns";
import {
  LineStackedChart,
  LineStackedChartHighContrast,
} from "../src/lib/builder";
import { Container, DarkContainer, HighContrastContainer } from "./components";
import { customOptions } from "./utils";

export default {
  title: "Charts/Stacked line",
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
    color: "#E2E2F6",
  },
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    color: "#BDBDE6",
  },
];

export const Default = () => {
  const dataVizProps: IChart = new LineStackedChart({
    areaLabel: "Stacked line chart sample",
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
  {
    label: "Phones",
    data: [100, 1600, 180, 3049, 3596],
    pattern: Patterns.Diagonal,
  },
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    pattern: Patterns.Grid,
  },
];

export const HighContrast = () => {
  const dataVizProps: IChart = new LineStackedChartHighContrast({
    areaLabel: "Stacked line chart sample",
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
];

export const CustomTheme = () => {
  const dataVizProps: IChart = new LineStackedChart({
    areaLabel: "Stacked line chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: datasetsCustomTheme,
    },
    options: customOptions,
  });
  return (
    <DarkContainer>
      <Chart {...object("Configuration", dataVizProps, "Custom Theme")} />
    </DarkContainer>
  );
};
