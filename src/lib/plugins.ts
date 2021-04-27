import { ChartDataSets } from "chart.js";
import { LineStackedDataSetHCStyle } from "..";
import { ChartTypes, HighContrastColors, IChartOptions } from "../types";
import { buildPattern } from "./patterns";
import {
  HALF_PI,
  hexToRgb,
  PI,
  QUARTER_PI,
  showTooltipOnKayboard,
  TWO_THIRDS_PI,
} from "./utils";

export const gradientPlugin = (chartInstance: Chart) => {
  const { ctx } = chartInstance;
  if (!ctx) return;
  if (!chartInstance.config.data) return;
  if (!chartInstance.config.data.datasets) return;

  chartInstance.config.data.datasets.forEach((set: ChartDataSets) => {
    const color = String(set.borderColor);

    /**
     * TODO: Add more flexibility with color formats
     * Gradient works just with HEX | RGB values;
     */

    if (!(color.includes("#") || color.includes("rgb("))) return;
    const gradientStroke: any = ctx.createLinearGradient(
      0,
      0,
      0,
      ctx.canvas.clientHeight * 0.8
    );
    const colorRGB = color.includes("#")
      ? hexToRgb(color)
      : color
          .substring(4, color.length - 1)
          .replace(/ /g, "")
          .split(",");
    gradientStroke.addColorStop(0, `rgba(${colorRGB}, .2)`);
    gradientStroke.addColorStop(1, `rgba(${colorRGB}, .0)`);
    set.backgroundColor = gradientStroke;

    const hoverColor = String(set.hoverBorderColor);
    if (!(hoverColor.includes("#") || hoverColor.includes("rgb("))) return;
    const hoverGradientStroke = ctx.createLinearGradient(
      0,
      0,
      0,
      ctx.canvas.clientHeight * 0.8
    );
    const hoverColorRGB = hoverColor.includes("#")
      ? hexToRgb(hoverColor)
      : hoverColor
          .substring(4, hoverColor.length - 1)
          .replace(/ /g, "")
          .split(",");
    hoverGradientStroke.addColorStop(0, `rgba(${hoverColorRGB}, .4)`);
    hoverGradientStroke.addColorStop(1, `rgba(${hoverColorRGB}, .0)`);
    set.hoverBackgroundColor = hoverGradientStroke;
  });
};

export const highLightDataOnHover = (chartInstance: any) => {
  const { chart, ctx, tooltip, config } = chartInstance;

  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0],
      y = activePoint.tooltipPosition().y,
      x = activePoint.tooltipPosition().x,
      x_axis = chart.scales["x-axis-0"],
      y_axis = chart.scales["y-axis-0"],
      leftX = x_axis.left,
      rightX = x_axis.right,
      topY = y_axis.top,
      bottomY = y_axis.bottom;

    switch (config.type) {
      case ChartTypes.Line:
        ctx.save();
        // Line
        ctx.beginPath();
        ctx.moveTo(leftX - 44, y);
        ctx.lineTo(rightX, y);
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color;
        ctx.stroke();

        // Point
        const pointStyle =
          activePoint._chart.config.data.datasets[activePoint._datasetIndex]
            .pointStyle;
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
              ctx.moveTo(
                x + Math.sin(rad) * radius,
                y - Math.cos(rad) * radius
              );
              rad += TWO_THIRDS_PI;
              ctx.lineTo(
                x + Math.sin(rad) * radius,
                y - Math.cos(rad) * radius
              );
              rad += TWO_THIRDS_PI;
              ctx.lineTo(
                x + Math.sin(rad) * radius,
                y - Math.cos(rad) * radius
              );
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
              ctx.arc(
                x + yOffset,
                y - xOffset,
                cornerRadius,
                rad - HALF_PI,
                rad
              );
              ctx.arc(
                x + xOffset,
                y + yOffset,
                cornerRadius,
                rad,
                rad + HALF_PI
              );
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
              ctx.lineTo(
                x + Math.cos(rad) * radius,
                y + Math.sin(rad) * radius
              );
              break;
          }
          ctx.lineWidth = 2;
          ctx.fillStyle = HighContrastColors.Foreground;
          ctx.strokeStyle =
            chart.data.datasets[activePoint._datasetIndex].hoverBorderColor;
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        break;
      case ChartTypes.Bar:
      default:
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
        break;
    }
  }
};

export const keyboardAccessibility = (chart: Chart) => {
  const { canvas, config } = chart;
  const { data, type } = config;
  let selectedIndex = -1;
  let selectedDataSet = 0;
  const orderedDataSet =
    type === ChartTypes.Line || !(config.options?.scales as any);

  if (!canvas) return;
  canvas.addEventListener("click", removeFocusStyleOnClick);
  canvas.addEventListener("keydown", changeFocus);
  canvas.addEventListener("focusout", resetChartStates);

  function meta() {
    return chart.getDatasetMeta(selectedDataSet);
  }

  function removeFocusStyleOnClick(): void {
    // Remove focus state style if selected by mouse
    if (canvas) {
      canvas.style.boxShadow = "none";
    }
  }

  function removeDataPointsHoverStates() {
    if (selectedIndex > -1) {
      meta().controller.removeHoverStyle(
        meta().data[selectedIndex],
        0,
        selectedIndex
      );
    }
  }

  function hoverDataPoint(pointID: number) {
    meta().controller.setHoverStyle(
      meta().data[pointID],
      selectedDataSet,
      pointID
    );
  }

  function showFocusedDataPoint() {
    hoverDataPoint(selectedIndex);
    if (chart.config.data) {
      showTooltipOnKayboard({
        chart,
        setIndex: selectedDataSet,
        selectedPointIndex: selectedIndex,
      });
    }
    document
      .getElementById(
        `${canvas!.id}-tooltip-${selectedDataSet}-${selectedIndex}`
      )
      ?.focus();
  }

  function resetChartStates() {
    removeDataPointsHoverStates();
    const activeElements = (chart as any).tooltip._active;
    const requestedElem = chart.getDatasetMeta(selectedDataSet).data[
      selectedIndex
    ];
    activeElements.find((v: any, i: number) => {
      if (requestedElem._index === v._index) {
        activeElements.splice(i, 1);
        return true;
      }
    });

    for (let i = 0; i < activeElements.length; i++) {
      if (requestedElem._index === activeElements[i]._index) {
        activeElements.splice(i, 1);
        break;
      }
    }
    if ((config.options as IChartOptions).highContrastMode) {
      data!.datasets!.map((dataset: any) => {
        dataset.borderColor = HighContrastColors.Foreground;
        dataset.borderWidth = 2;
      });
      const fakeSet = new LineStackedDataSetHCStyle({} as any);
      config.data?.datasets?.forEach((set: any) => {
        if (typeof set.backgroundColor !== "string") {
          set.backgroundColor = buildPattern({
            backgroundColor: HighContrastColors.Background,
            patternColor: fakeSet.borderColor,
            ...set.pattern,
          }) as any;
        }
      });
      chart.update();
    }
    (chart as any).tooltip._active = activeElements;
    (chart as any).tooltip.update(true);
    (chart as any).draw();
  }

  function changeFocus(e: KeyboardEvent) {
    if (!data) return;
    if (!data.datasets) return;
    removeDataPointsHoverStates();
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % meta().data.length;
        break;
      case "ArrowLeft":
        e.preventDefault();
        selectedIndex = (selectedIndex || meta().data.length) - 1;
        break;
      case "ArrowUp":
      case "ArrowDown":
        e.preventDefault();
        if (orderedDataSet) {
          if (e.key === "ArrowUp") {
            selectedDataSet += 1;
            if (selectedDataSet === data.datasets.length) {
              selectedDataSet = 0;
            }
          } else {
            selectedDataSet -= 1;
            if (selectedDataSet < 0) {
              selectedDataSet = data.datasets.length - 1;
            }
          }
        } else {
          // Get all values for the current data point
          const values = data.datasets.map(
            (dataset) => dataset.data![selectedIndex]
          );
          // Sort an array to define next available number
          const sorted = Array.from(new Set(values)).sort(
            (a, b) => Number(a) - Number(b)
          );
          let nextValue =
            sorted[
              sorted.findIndex((v) => v === values[selectedDataSet]) +
                (e.key === "ArrowUp" ? 1 : -1)
            ];

          // Find dataset ID by the next higher number after current
          let nextDataSet = values.findIndex((v) => v === nextValue);

          // If there is no next number that could selected, get number from oposite side
          if (nextDataSet < 0) {
            nextDataSet = values.findIndex(
              (v) =>
                v ===
                sorted[e.key === "ArrowUp" ? 0 : data!.datasets!.length - 1]
            );
          }
          selectedDataSet = nextDataSet;
          selectedIndex = selectedIndex % meta().data.length;
        }
        break;
    }

    showFocusedDataPoint();
  }
};

export const axisXTeamsStyle = ({ config, ctx }: Chart) => {
  const xAxes = (config as any).options?.scales?.xAxes;
  const color = xAxes[0].gridLines?.color;
  const axesXGridLines = ctx!.createLinearGradient(100, 100, 100, 0);
  axesXGridLines.addColorStop(0.01, color);
  axesXGridLines.addColorStop(0.01, "transparent");
  xAxes.forEach((xAxes: any, index: number) => {
    if (index < 1) {
      xAxes.gridLines.color = axesXGridLines;
      xAxes.gridLines.zeroLineColor = axesXGridLines;
    } else {
      xAxes.gridLines.color = "transparent";
    }
  });
};

export const removeAllListeners = (chartInstance: Chart) => {
  const { canvas } = chartInstance;
  if (!canvas) return;
  canvas.replaceWith(canvas.cloneNode(true));
};

/**
 * Required review
 */
export const tooltipAxisXLine = ({ chart, ctx, tooltip }: any) => {
  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0],
      y = activePoint.tooltipPosition().y,
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

export const horizontalBarValue = ({ chart, ctx, config }: any) => {
  ctx.font = "bold 11px Segoe UI, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = config.options.scales.xAxes[0].ticks.fontColor;
  if (config.options.scales.yAxes[0].stacked) {
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

export const horizontalBarAxisYLabels = (chartInstance: Chart) => {
  const { config, chartArea } = chartInstance;
  const { options, data } = config;

  if (!options) return;
  if (!chartArea) return;
  if (!options.scales) return;
  if (!options.scales.yAxes) return;
  if (!options.scales.yAxes[0]) return;
  if (!options.scales.yAxes[0].ticks) return;

  options.scales.yAxes[0].ticks.labelOffset =
    chartArea.bottom / data!.datasets![0]!.data!.length / 2 - 10;
  chartInstance.update();
};
