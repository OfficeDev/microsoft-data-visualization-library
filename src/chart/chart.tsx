import React from "react";
import Chart from "chart.js";
import { IChart } from "../types";
import { ChartRender } from "./chart-render";
import { defaultOptions } from "../lib/settings";
import { deepMerge } from "../lib/utils";

(Chart as any).defaults.global.legend.display = false;
(Chart as any).defaults.global.defaultFontFamily = `Segoe UI, system-ui, sans-serif`;

export function ChartContainer(config: IChart) {
  const { options } = config;
  return (
    <ChartRender
      {...config}
      options={options ? deepMerge(defaultOptions, options) : defaultOptions}
    />
  );
}
