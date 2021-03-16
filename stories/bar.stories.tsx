import React from "react";
import { object } from "@storybook/addon-knobs";
import { Chart } from "../src/chart";
import { Container, DarkContainer, HighContrastContainer } from "./components";
import { ChartTypes, IChart } from "../src/types";
import {
  BarDataSetHCStyle,
  BarDataSetStyle,
  Patterns,
} from "../src/lib/datasets";
import { barOptions, highContrastOptions } from "../src/lib/settings";
import { deepMerge } from "../src/lib/utils";
import { customOptions } from "./utils";

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

const datasetsHighContrast = [
  {
    label: "Tablets",
    data: [860, 6700, 3100, 2012, 1930],
    pattern: Patterns.Square,
  },
];

export const HighContrast = () => {
  const dataVizProps: IChart = {
    type: ChartTypes.Bar,
    areaLabel: "Bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: Array.from(
        datasetsHighContrast,
        (set) => new BarDataSetHCStyle(set)
      ),
    },
    options: deepMerge(highContrastOptions, barOptions),
  };
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
  const dataVizProps: IChart = {
    type: ChartTypes.Bar,
    areaLabel: "Bar chart sample",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: Array.from(
        datasetsCustomTheme,
        (set) => new BarDataSetStyle(set)
      ),
    },
    options: deepMerge(barOptions, customOptions),
  };
  return (
    <DarkContainer>
      <Chart {...object("Configuration", dataVizProps, "Default")} />
    </DarkContainer>
  );
};
