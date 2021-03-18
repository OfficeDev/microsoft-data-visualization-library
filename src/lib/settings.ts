import { ChartDataSets } from "chart.js";
import { HighContrastColors, IChartOptions } from "../types";
import { usNumberFormat, shortTicks } from "./utils";

const stackedTooltipTitle = (
  item: Chart.ChartTooltipItem[],
  data: Chart.ChartData
): string => {
  let total = 0;
  if (!item) return "";
  if (!data) return "";
  if (!data.datasets) return "";
  data.datasets.map((dataset: ChartDataSets) => {
    const value = dataset!.data![item[0].index!];
    if (typeof value === "number") {
      return (total += value);
    }
  });
  return `${((Number(item[0].yLabel) / total) * 100).toPrecision(
    2
  )}% (${usNumberFormat(Number(item[0].yLabel))})`;
};

export const defaultOptions: IChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  defaultColor: "#C8C6C4",
  animation: {
    duration: 1000,
  },
  layout: {
    padding: {
      left: 0,
      right: 16,
      top: 0,
      bottom: 0,
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  hover: {
    mode: "dataset",
    intersect: false,
  },
  tooltips: {
    yPadding: 12,
    xPadding: 20,
    caretPadding: 10,
    // Tooltip Title
    titleFontStyle: "200",
    titleFontSize: 20,
    // Tooltip Body
    bodySpacing: 4,
    bodyFontSize: 11.5,
    bodyFontStyle: "400",
    // Tooltip Footer
    footerFontStyle: "300",
    footerFontSize: 10,

    backgroundColor: "rgba(0, 0, 0, 0.88)",

    callbacks: {
      title: (tooltipItems: any) => {
        const value = tooltipItems[0].yLabel;
        return typeof value === "number" && value > 999
          ? usNumberFormat(value)
          : value;
      },
      label: (tooltipItem: any, data: any) =>
        data.datasets[tooltipItem.datasetIndex].label,
      footer: (tooltipItems: any) => {
        const value = tooltipItems[0].xLabel;
        return typeof value === "number" && value > 999
          ? usNumberFormat(value)
          : value;
      },
    },
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontSize: 10,
          padding: 0,
          maxRotation: 0,
          minRotation: 0,
          callback: shortTicks,
          fontColor: "#605E5C",
        },
        gridLines: {
          borderDash: [5, 9999],
          zeroLineBorderDash: [5, 9999],
          color: "#E1DFDD",
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: shortTicks,
          fontSize: 10,
          padding: -16,
          labelOffset: 10,
          maxTicksLimit: 5,
          fontColor: "#605E5C",
        },
        gridLines: {
          lineWidth: 1,
          drawBorder: false,
          drawTicks: true,
          tickMarkLength: 44,
          zeroLineColor: "#E1DFDD",
          color: "#E1DFDD",
        },
      },
    ],
  },
};

// let dataPointConfig = {
//   label: set.label,
//   data: set.data,
//   borderWidth: 1,
//   borderColor: colorScheme.default.background,
//   hoverBorderColor: chartDataPointColors[i],
//   backgroundColor: chartDataPointColors[i],
//   hoverBorderWidth: 2,
//   hoverBackgroundColor: chartDataPointColors[i],
//   pointBorderColor: colorScheme.default.background,
//   pointBackgroundColor: colorScheme.default.foreground3,
//   pointHoverBackgroundColor: colorScheme.default.foreground3,
//   pointHoverBorderColor: chartDataPointColors[i],
//   pointHoverBorderWidth: 2,
//   borderCapStyle: "round",
//   borderJoinStyle: "round",
//   pointBorderWidth: 0,
//   pointRadius: 0,
//   pointHoverRadius: 3,
//   pointStyle: "circle",
//   borderDash: [],
// }

export const highContrastOptions: IChartOptions = {
  highContrastMode: true,
  defaultColor: HighContrastColors.Foreground,
  tooltips: {
    backgroundColor: HighContrastColors.Background,
    borderColor: HighContrastColors.Active,
    multiKeyBackground: "transparent",
    titleFontColor: HighContrastColors.Foreground,
    bodyFontColor: HighContrastColors.Foreground,
    footerFontColor: HighContrastColors.Foreground,
    borderWidth: 2,
    displayColors: false,
  },
  hover: {
    mode: "dataset",
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: HighContrastColors.Foreground,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: HighContrastColors.Foreground,
        },
        gridLines: {
          zeroLineColor: "rgba(255,255,255, .3)",
          color: "rgba(255,255,255, .3)",
        },
      },
    ],
  },
};

export const stackedLineOptions: Chart.ChartOptions = {
  scales: {
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
  tooltips: {
    callbacks: {
      title: stackedTooltipTitle,
      labelColor: (tooltipItem: any, chart: any) => {
        return {
          borderColor: "transparent",
          backgroundColor:
            chart.config.data.datasets[tooltipItem.datasetIndex]
              .backgroundColor,
        } as any;
      },
    },
  },
};

export const barOptions: Chart.ChartOptions = {
  hover: {
    mode: "nearest",
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          offsetGridLines: false,
        },
      },
    ],
  },
};

export const pieOptions: Chart.ChartOptions = {
  layout: {
    padding: {
      top: 32,
      right: 32,
      bottom: 32,
      left: -16,
    },
  },
  hover: {
    mode: "point",
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      title: (tooltipItems: any, data: any) => {
        return `${(
          (Number(data.datasets[0].data[tooltipItems[0].index]) /
            (data.datasets[0].data as number[]).reduce((a, b) => a + b)) *
          100
        ).toPrecision(2)}% (${usNumberFormat(
          Number(data.datasets[0].data[tooltipItems[0].index])
        )})`;
      },
      label: (tooltipItem: any, data: any) => data.labels[tooltipItem.index],
    },
  },
};

export const doughnutOptions: Chart.ChartOptions = {
  cutoutPercentage: 70,
  ...pieOptions,
};

export const groupedBarOptions: Chart.ChartOptions = {
  scales: {
    xAxes: [
      {
        gridLines: {
          offsetGridLines: true,
        },
      },
    ],
  },
};

export const stackedBarOptions: Chart.ChartOptions = {
  hover: {
    mode: "nearest",
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        gridLines: {
          offsetGridLines: false,
        },
      },
    ],
    yAxes: [{ stacked: true }],
  },
  tooltips: {
    callbacks: {
      title: stackedTooltipTitle,
    },
  },
};

export const horizontalBarOptions: Chart.ChartOptions = {
  layout: {
    padding: {
      top: -6,
      left: -32,
    },
  },
  hover: {
    mode: "index",
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          mirror: true,
          padding: 0,
          callback: (v: string) => v,
          labelOffset: 26,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
  tooltips: {
    position: "nearest",
  },
};
