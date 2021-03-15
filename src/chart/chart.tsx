import React from "react";
import Chart from "chart.js";
import { ChartTypes, IChart } from "../types";
// import {
//   BarChart,
//   PieChart,
//   LineChart,
//   LineAreaChart,
//   DoughnutChart,
//   LineStackedChart,
//   BarStackedChart,
//   BarHorizontalChart,
//   BarHorizontalStackedChart,
//   BubbleChart,
// } from "./chart-types";
import { defaultChartOptions, mergeDeep } from "../lib/utils";
import { LineChart } from "./line-chart-render";

(Chart as any).defaults.global.legend.display = false;
(Chart as any).defaults.global.defaultFontFamily = `Segoe UI, system-ui, sans-serif`;

const CHARTS = {
  [ChartTypes.Line]: LineChart,
  // [ChartTypes.LineArea]: LineAreaChart,
  // [ChartTypes.LineStacked]: LineStackedChart,
  // [ChartTypes.Bar]: BarChart,
  // [ChartTypes.BarStacked]: BarStackedChart,
  // [ChartTypes.BarHorizontal]: BarHorizontalChart,
  // [ChartTypes.BarHorizontalStacked]: BarHorizontalStackedChart,
  // [ChartTypes.Pie]: PieChart,
  // [ChartTypes.Doughnut]: DoughnutChart,
  // [ChartTypes.Bubble]: BubbleChart,
};

export function ChartContainer(config: IChart) {
  const { options } = config;
  const ChartContainer = LineChart;

  console.log({ config: mergeDeep(defaultChartOptions, options), options });

  return (
    <React.Suspense fallback={"Loading..."}>
      <ChartContainer
        {...config}
        options={
          options
            ? mergeDeep(defaultChartOptions, options)
            : defaultChartOptions
        }
      />
    </React.Suspense>
  );
}
