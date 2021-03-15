import { ChartDataSets } from "chart.js";
import { HALF_PI, hexToRgb, PI, QUARTER_PI, TWO_THIRDS_PI } from "./utils";

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

export const onDataPointHover = ({ chart, ctx, tooltip }: any) => {
  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0],
      y = activePoint.tooltipPosition().y,
      x = activePoint.tooltipPosition().x,
      y_axis = chart.scales["y-axis-0"],
      topY = y_axis.top,
      bottomY = y_axis.bottom;

    ctx.save();
    // Line
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
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
