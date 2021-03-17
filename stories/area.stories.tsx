import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart } from "../src/chart";
import { IChart, Point } from "../src/types";
import { AreaChart, AreaChartHighContrast } from "../src/lib/builder";
import { customOptions } from "./utils";
import { Container, DarkContainer, HighContrastContainer } from "./components";

export default {
  title: "Charts/Area",
  component: Chart,
};

const datasets = [
  {
    label: "Laptops",
    data: [1860, 7700, 4100, 3012, 2930],
    color: "#6264A7",
  },
  {
    label: "Watches",
    data: [200, 3600, 480, 5049, 4596],
    color: "#C8C6C4",
  },
];

export const Default = () => {
  const dataVizProps: IChart = new AreaChart({
    areaLabel: "Line chart sample",
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
    borderDash: [],
    pointStyle: Point.Circle,
  },
  {
    label: "Phones",
    data: [100, 1600, 180, 3049, 3596],
    borderDash: [],
    pointStyle: Point.Rectangle,
  },
];

export const HighContrast = () => {
  const dataVizProps: IChart = new AreaChartHighContrast({
    areaLabel: "Line chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: datasetsHighContrast,
    },
  });
  return (
    <HighContrastContainer>
      <Chart {...object("Configuration", dataVizProps, "HighContrast")} />
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
];

export const CustomTheme = () => {
  const dataVizProps: IChart = new AreaChart({
    areaLabel: "Line chart sample",
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
