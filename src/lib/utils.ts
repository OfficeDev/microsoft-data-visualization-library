import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { ChartData, ChartDataSets } from "chart.js";
import { IChartPatterns, IDraw } from "../types";

const PI = Math.PI;
const RAD_PER_DEG = PI / 180;
const DOUBLE_PI = PI * 2;
const HALF_PI = PI / 2;
const QUARTER_PI = PI / 4;
const TWO_THIRDS_PI = (PI * 2) / 3;

export const random = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

// TODO: Localization
const suffixes = ["K", "M", "G", "T", "P", "E"];

export const chartAxisCallback = (value: number | string): string => {
  if (typeof value === "number") {
    if (value < 1000) {
      return String(value);
    }
    const exp = Math.floor(Math.log(Number(value)) / Math.log(1000));
    value = `${Number(value) / Math.pow(1000, exp)}${suffixes[exp - 1]}`;
    // There is no support for label aligment in Chart.js,
    // to be able align axis labels by left (right is by default)
    // add an additional spaces depends on label length
    switch (value.length) {
      case 2:
        return value + "  ";
      case 1:
        return value + "   ";
      case 3:
      default:
        return value;
    }
  } else {
    return value;
  }
};

export const hexToRgb = (hex: string) => {
  if (hex.length < 6) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
};

export const usNumberFormat = (value: number | string): string =>
  String(value)
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})/g, "$1,")
    .replace(/\,$/, "")
    .split("")
    .reverse()
    .join("");

export const defaultChartOptions: Chart.ChartOptions = {
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
          labelOffset: 4,
          maxRotation: 0,
          minRotation: 0,
          callback: chartAxisCallback,
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
        stacked: false,
        ticks: {
          callback: chartAxisCallback,
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

export const highContrastChartOptions: Chart.ChartOptions = {
  defaultColor: "#fff",
  tooltips: {
    backgroundColor: "#000",
    borderColor: "#1aebff",
    multiKeyBackground: "transparent",
    titleFontColor: "#fff",
    bodyFontColor: "#fff",
    footerFontColor: "#fff",
    borderWidth: 2,
    displayColors: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontSize: 10,
          padding: 0,
          labelOffset: 4,
          maxRotation: 0,
          minRotation: 0,
          callback: chartAxisCallback,
          fontColor: "#fff",
        },
        gridLines: {
          borderDash: [5, 9999],
          zeroLineBorderDash: [5, 9999],
        },
      },
    ],
    yAxes: [
      {
        stacked: false,
        ticks: {
          callback: chartAxisCallback,
          fontSize: 10,
          padding: -16,
          labelOffset: 10,
          maxTicksLimit: 5,
          fontColor: "#fff",
        },
        gridLines: {
          lineWidth: 1,
          drawBorder: false,
          drawTicks: true,
          tickMarkLength: 44,
          zeroLineColor: "rgba(255,255,255, .3)",
          color: "rgba(255,255,255, .3)",
        },
      },
    ],
  },
};

export function tooltipTrigger({
  chart,
  data,
  set,
  index,
  mergeDuplicates,
}: {
  chart: any;
  data: ChartData;
  set: number;
  index: number;
  mergeDuplicates?: boolean;
}) {
  if (mergeDuplicates) {
    const duplicates: number[] = [];
    const segments: any[] = [];
    // Check for equal data points
    data!.datasets!.filter((dataset: ChartDataSets, i: number) => {
      if (dataset!.data![index] === data!.datasets![set].data![index]) {
        duplicates.push(i);
      }
      // if (theme === ChartTheme.HighContrast) {
      //   chart.data.datasets[i].borderColor = colorScheme.default.border;
      //   chart.data.datasets[i].borderWidth = 2;
      // }
    });
    duplicates.forEach((segmentId) => {
      segments.push(chart.getDatasetMeta(segmentId).data[index]);
      // if (theme === ChartTheme.HighContrast) {
      //   chart.data.datasets[segmentId].borderColor =
      //     colorScheme.default.borderHover;
      //   chart.data.datasets[segmentId].borderWidth = 4;
      // }
    });
    // if (theme === ChartTheme.HighContrast) {
    //   chart.update();
    // }
    chart.tooltip._active = segments;
  } else {
    const segment = chart.getDatasetMeta(set).data[index];
    chart.tooltip._active = [segment];
    // if (theme === ChartTheme.HighContrast && patterns) {
    //   chart.data.datasets.map((dataset: any, i: number) => {
    //     dataset.borderColor = colorScheme.default.border;
    //     dataset.borderWidth = 2;
    //     dataset.backgroundColor = buildPattern({
    //       ...patterns(colorScheme)[index],
    //       backgroundColor: colorScheme.default.background,
    //       patternColor: colorScheme.brand.background,
    //     });
    //   });
    //   chart.data.datasets[set].borderColor =
    //     siteVariables.colorScheme.default.borderHover;
    //   chart.data.datasets[set].borderWidth = 4;
    //   chart.data.datasets[set].backgroundColor = chart.data.datasets[
    //     set
    //   ].backgroundColor = buildPattern({
    //     ...patterns(siteVariables.colorScheme)[set],
    //     backgroundColor: colorScheme.default.background,
    //     patternColor: colorScheme.default.borderHover,
    //   });
    //   chart.update();
    // }
  }
  chart.tooltip.update();
  chart.draw();
}

export const tooltipAxisYLine = ({ chart, ctx, tooltip }: any) => {
  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0],
      y = activePoint.tooltipPosition().y,
      x = activePoint.tooltipPosition().x,
      y_axis = chart.scales["y-axis-0"],
      topY = y_axis.top,
      bottomY = y_axis.bottom;

    const pointStyle =
      activePoint._chart.config.data.datasets[activePoint._datasetIndex]
        .pointStyle;
    ctx.save();
    // Line
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color;
    ctx.stroke();

    if (pointStyle) {
      const radius = 5;
      const rotation = 0;
      let xOffset = 0;
      let yOffset = 0;
      let cornerRadius = 1;
      let size = 5;
      let rad = 0;

      ctx.beginPath();
      ctx.setLineDash([]);
      switch (pointStyle) {
        // Default includes circle
        default:
          ctx.arc(x, y, radius, 0, Math.PI * 2, true);
          ctx.closePath();
          break;
        case "triangle":
          ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
          rad += TWO_THIRDS_PI;
          ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
          rad += TWO_THIRDS_PI;
          ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
          ctx.closePath();
          break;
        case "rectRounded":
          cornerRadius = radius * 0.516;
          size = radius - cornerRadius;
          xOffset = Math.cos(rad + QUARTER_PI) * size;
          yOffset = Math.sin(rad + QUARTER_PI) * size;
          ctx.arc(
            x - xOffset,
            y - yOffset,
            cornerRadius,
            rad - PI,
            rad - HALF_PI
          );
          ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
          ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
          ctx.arc(
            x - yOffset,
            y + xOffset,
            cornerRadius,
            rad + HALF_PI,
            rad + PI
          );
          ctx.closePath();
          break;
        case "rect":
          if (!rotation) {
            size = Math.SQRT1_2 * radius;
            ctx.rect(x - size, y - size, 2 * size, 2 * size);
            break;
          }
          rad += QUARTER_PI;
        /* falls through */
        case "rectRot":
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + yOffset, y - xOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          ctx.closePath();
          break;
        case "crossRot":
          rad += QUARTER_PI;
        /* falls through */
        case "cross":
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.moveTo(x + yOffset, y - xOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          break;
        case "star":
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.moveTo(x + yOffset, y - xOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          rad += QUARTER_PI;
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.moveTo(x + yOffset, y - xOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          break;
        case "line":
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          break;
        case "dash":
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
          break;
      }
      ctx.lineWidth = 2;
      ctx.fillStyle = "white";
      ctx.strokeStyle =
        chart.data.datasets[activePoint._datasetIndex].hoverBorderColor;
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
};

export const tooltipAxisXLine = ({ chart, ctx, tooltip }: any) => {
  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0],
      y = activePoint.tooltipPosition().y,
      x = activePoint.tooltipPosition().x,
      x_axis = chart.scales["x-axis-0"],
      leftX = x_axis.left,
      rightX = x_axis.right;

    ctx.save();
    // Line
    ctx.beginPath();
    ctx.moveTo(leftX - 20, y);
    ctx.lineTo(rightX, y);
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color;
    ctx.stroke();
    ctx.restore();
  }
};

export const horizontalBarValue = ({ chart, ctx, stacked }: any) => {
  ctx.font = "bold 11px Segoe UI";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = chart.options.defaultColor;
  if (stacked) {
    const meta = chart.controller.getDatasetMeta(
      chart.data.datasets.length - 1
    );
    meta.data.forEach((bar: any, index: number) => {
      let data = 0;
      chart.data.datasets.map((dataset: ChartDataSets) => {
        const value = dataset!.data![index];
        if (typeof value === "number") {
          return (data += value);
        }
      });
      ctx.fillText(data, bar._model.x + 8, bar._model.y);
    });
  } else {
    chart.data.datasets.forEach((dataset: any, i: number) => {
      const meta = chart.controller.getDatasetMeta(i);
      meta.data.forEach((bar: any, index: number) => {
        const data = dataset.data[index];
        ctx.fillText(data, bar._model.x + 8, bar._model.y);
      });
    });
  }
};

export const axesConfig = ({
  chart,
  ctx,
  colorScheme,
}: {
  chart: any;
  ctx: CanvasRenderingContext2D;
  colorScheme: any;
}) => {
  const axesXGridLines = ctx!.createLinearGradient(100, 100, 100, 0);
  axesXGridLines.addColorStop(0.01, colorScheme.grey.border);
  axesXGridLines.addColorStop(0.01, "transparent");

  chart.options.scales.xAxes.forEach((xAxes: any, index: number) => {
    xAxes.ticks.fontColor = colorScheme.default.foreground2;
    if (index < 1) {
      xAxes.gridLines.color = axesXGridLines;
      xAxes.gridLines.zeroLineColor = axesXGridLines;
    } else {
      xAxes.gridLines.color = "transparent";
    }
  });
  chart.options.scales.yAxes.forEach((yAxes: any, index: number) => {
    yAxes.ticks.fontColor = colorScheme.default.foreground2;
    if (index < 1) {
      yAxes.gridLines.color = colorScheme.grey.border;
      yAxes.gridLines.zeroLineColor = colorScheme.grey.border;
    } else {
      yAxes.gridLines.color = "transparent";
    }
  });
};

export const setTooltipColorScheme = ({
  chart,
  siteVariables,
  chartDataPointColors,
  patterns,
  verticalDataAlignment,
}: {
  chart: Chart;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: string[];
  patterns?: IChartPatterns;
  verticalDataAlignment?: boolean;
}) => {
  const { colorScheme, theme } = siteVariables;
  chart.options.tooltips = {
    ...chart.options.tooltips,
    // backgroundColor:
    //   theme === ChartTheme.Dark
    //     ? colorScheme.default.border2
    //     : colorScheme.default.foregroundFocus,
    borderColor: colorScheme.default.borderHover,
    multiKeyBackground: colorScheme.white.foreground,
    titleFontColor: colorScheme.default.foreground3,
    bodyFontColor: colorScheme.default.foreground3,
    footerFontColor: colorScheme.default.foreground3,
    // borderWidth: theme === ChartTheme.HighContrast ? 2 : 0,
    // callbacks: {
    //   ...chart.options.tooltips?.callbacks,
    //   labelColor:
    //     patterns && theme === ChartTheme.HighContrast
    //       ? (tooltipItem: any) => ({
    //         borderColor: "transparent",
    //         backgroundColor: buildPattern({
    //           ...patterns(colorScheme)[
    //           verticalDataAlignment
    //             ? tooltipItem.index
    //             : tooltipItem.datasetIndex
    //           ],
    //           backgroundColor: colorScheme.default.background,
    //           patternColor: colorScheme.default.borderHover,
    //         }) as any,
    //       })
    //       : (tooltipItem: any) => ({
    //         borderColor: "transparent",
    //         backgroundColor:
    //           chartDataPointColors[
    //           verticalDataAlignment
    //             ? tooltipItem.index
    //             : tooltipItem.datasetIndex
    //           ],
    //       }),
    // },
  };
  // if (siteVariables.theme === ChartTheme.HighContrast) {
  //   (chart as any).options.scales.yAxes[0].gridLines.lineWidth = 0.25;
  // } else {
  //   (chart as any).options.scales.yAxes[0].gridLines.lineWidth = 1;
  // }
};

export const tooltipConfig = () => ({
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
});

const isObject = (item: object): boolean => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};
