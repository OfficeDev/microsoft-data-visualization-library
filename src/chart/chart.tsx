import React from "react";
import Chart from "chart.js";
import { IChart } from "../types";
import { ChartRender } from "./chart-render";

(Chart as any).defaults.global.legend.display = false;
(Chart as any).defaults.global.defaultFontFamily = `Segoe UI, system-ui, sans-serif`;

export function ChartContainer(config: IChart) {
  console.clear();
  return <ChartRender {...config} />;
}
