import { ChartDataSets } from "chart.js";
import { ChartTypes, HighContrastColors, IChartOptions } from "../types";
import { buildPattern } from "./patterns";
import { LineDataSetHCStyle, LineStackedDataSetHCStyle } from "./datasets";

export const PI = Math.PI;
export const HALF_PI = PI / 2;
export const QUARTER_PI = PI / 4;
export const TWO_THIRDS_PI = (PI * 2) / 3;

export const random = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

// TODO: Localization
const suffixes = ["K", "M", "G", "T", "P", "E"];

export const shortTicks = (value: number | string): string => {
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

export const getRgbValues = (color: string) => {
  if (color.indexOf("#")) {
    return hexToRgb(color);
  }
  if (color.indexOf("rgba")) {
    return color
      .substring(5, color.length - 1)
      .replace(/ /g, "")
      .split(",");
  }
  if (color.indexOf("rgb")) {
    return color
      .substring(4, color.length - 1)
      .replace(/ /g, "")
      .split(",");
  }
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

export function isHCThemeApplied(chart: any): boolean {
  return (
    typeof chart.data.datasets[0].backgroundColor !== "string" ||
    chart.data.datasets[0].borderDash
  );
}

export function showTooltipOnKayboard({
  chart,
  setIndex,
  selectedPointIndex,
}: {
  chart: Chart;
  setIndex: number;
  selectedPointIndex: number;
}) {
  const { type, data, options } = chart.config;
  const { datasets } = data as any;
  if (
    type === ChartTypes.Line ||
    !(chart.config.options?.scales as any).yAxes[0].stacked
  ) {
    const duplicates: number[] = [];
    const segments: any[] = [];
    const fakeSet = new LineDataSetHCStyle({} as any);
    datasets!.filter((dataset: ChartDataSets, i: number) => {
      if (
        dataset!.data![selectedPointIndex] ===
        data!.datasets![setIndex].data![selectedPointIndex]
      ) {
        duplicates.push(i);
      }
      if ((options as IChartOptions).highContrastMode) {
        datasets[i].borderColor = fakeSet.borderColor;
        datasets[i].borderWidth = fakeSet.borderWidth;
        if (typeof datasets[i].backgroundColor !== "string") {
          datasets[i].backgroundColor = buildPattern({
            backgroundColor: HighContrastColors.Background,
            patternColor: fakeSet.borderColor,
            ...datasets[i].pattern,
          });
        }
      }
    });
    duplicates.forEach((segmentId) => {
      segments.push(chart.getDatasetMeta(segmentId).data[selectedPointIndex]);
      if ((options as IChartOptions).highContrastMode) {
        datasets[segmentId].borderColor = fakeSet.hoverBorderColor;
        datasets[segmentId].borderWidth = fakeSet.hoverBorderWidth;
        if (typeof datasets[segmentId].backgroundColor !== "string") {
          datasets[segmentId].backgroundColor = buildPattern({
            backgroundColor: HighContrastColors.Background,
            patternColor: fakeSet.hoverBorderColor,
            ...datasets[segmentId].pattern,
          });
        }
      }
    });
    if ((options as IChartOptions).highContrastMode) {
      chart.update();
    }
    (chart as any).tooltip._active = segments;
  } else {
    const fakeSet = new LineStackedDataSetHCStyle({} as any);
    const segment = chart.getDatasetMeta(setIndex).data[selectedPointIndex];
    (chart as any).tooltip._active = [segment];
    if ((options as IChartOptions).highContrastMode) {
      datasets.map((dataset: any, i: number) => {
        if (dataset.pattern) {
          dataset.borderColor = fakeSet.borderColor;
          dataset.borderWidth = fakeSet.borderWidth;
          dataset.backgroundColor = buildPattern({
            backgroundColor: HighContrastColors.Background,
            patternColor: fakeSet.borderColor,
            ...dataset.pattern,
          });
        }
      });
      datasets[setIndex].borderColor = fakeSet.hoverBorderColor;
      datasets[setIndex].borderWidth = fakeSet.hoverBorderWidth;
      datasets[setIndex].backgroundColor = datasets[
        setIndex
      ].backgroundColor = buildPattern({
        backgroundColor: HighContrastColors.Background,
        patternColor: fakeSet.hoverBorderColor,
        ...datasets[setIndex].pattern,
      });
    }
  }

  chart.update();
  (chart as any).tooltip.update();
  (chart as any).draw();
}

// export const setTooltipColorScheme = ({
//   chart,
//   siteVariables,
//   chartDataPointColors,
//   patterns,
//   verticalDataAlignment,
// }: {
//   chart: Chart;
//   siteVariables: SiteVariablesPrepared;
//   chartDataPointColors: string[];
//   patterns?: IChartPatterns;
//   verticalDataAlignment?: boolean;
// }) => {
//   const { colorScheme } = siteVariables;
//   chart.options.tooltips = {
//     ...chart.options.tooltips,
//     borderColor: colorScheme.default.borderHover,
//     multiKeyBackground: colorScheme.white.foreground,
//     titleFontColor: colorScheme.default.foreground3,
//     bodyFontColor: colorScheme.default.foreground3,
//     footerFontColor: colorScheme.default.foreground3,
//     // callbacks: {
//     //   ...chart.options.tooltips?.callbacks,
//     //   labelColor:
//     //     patterns && theme === ChartTheme.HighContrast
//     //       ? (tooltipItem: any) => ({
//     //         borderColor: "transparent",
//     //         backgroundColor: buildPattern({
//     //           ...patterns(colorScheme)[
//     //           verticalDataAlignment
//     //             ? tooltipItem.index
//     //             : tooltipItem.datasetIndex
//     //           ],
//     //           backgroundColor: colorScheme.default.background,
//     //           patternColor: colorScheme.default.borderHover,
//     //         }) as any,
//     //       })
//     //       : (tooltipItem: any) => ({
//     //         borderColor: "transparent",
//     //         backgroundColor:
//     //           chartDataPointColors[
//     //           verticalDataAlignment
//     //             ? tooltipItem.index
//     //             : tooltipItem.datasetIndex
//     //           ],
//     //       }),
//     // },
//   };
//   // if (siteVariables.theme === ChartTheme.HighContrast) {
//   //   (chart as any).options.scales.yAxes[0].gridLines.lineWidth = 0.25;
//   // } else {
//   //   (chart as any).options.scales.yAxes[0].gridLines.lineWidth = 1;
//   // }
// };

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

export const deepMerge = (
  target: any,
  source: any,
  isMergingArrays = true
): any => {
  target = ((obj) => Object.assign({}, obj))(target);

  const isObject = (obj: any) => obj && typeof obj === "object";

  if (!isObject(target) || !isObject(source)) return source;

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue))
      if (isMergingArrays) {
        target[key] = targetValue.map((x, i) =>
          sourceValue.length <= i
            ? x
            : deepMerge(x, sourceValue[i], isMergingArrays)
        );
        if (sourceValue.length > targetValue.length)
          target[key] = target[key].concat(
            sourceValue.slice(targetValue.length)
          );
      } else {
        target[key] = targetValue.concat(sourceValue);
      }
    else if (isObject(targetValue) && isObject(sourceValue))
      target[key] = deepMerge(
        Object.assign({}, targetValue),
        sourceValue,
        isMergingArrays
      );
    else target[key] = sourceValue;
  });

  return target;
};
