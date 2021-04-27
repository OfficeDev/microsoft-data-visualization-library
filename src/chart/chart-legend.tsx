import React, { useState } from "react";
import Chart from "chart.js";
import {
  ChartTypes,
  HighContrastColors,
  IChart,
  IChartOptions,
} from "../types";
import { HALF_PI, PI, QUARTER_PI, TWO_THIRDS_PI } from "../lib/utils";

export const ChartLegend = ({
  config,
  onClick,
}: {
  config: IChart;
  onClick: (index: number) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Segoe UI, system-ui, sans-serif",
        fontSize: 11,
        margin: "20px -2px 0",
        overflow: "hidden",
      }}
    >
      {config.data!.datasets!.map((item: any, index: number) => (
        <LegendItem
          id={index}
          key={index}
          label={String(item)}
          dataset={config.data!.datasets![index]}
          onClick={onClick}
          highContrast={(config.options as IChartOptions).highContrastMode}
        />
      ))}
    </div>
  );
};

const LegendItem = ({
  id,
  label,
  dataset,
  highContrast,
  onClick,
}: {
  id: number;
  label: string;
  dataset: Chart.ChartDataSets;
  highContrast?: boolean;
  onClick: (index: number) => void;
}) => {
  const [selected, setSelected] = useState(false);
  const legendItemRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!legendItemRef.current) return;
    console.log(elementInViewport(legendItemRef.current));
  }, []);

  const style: any = {
    display: "flex",
    margin: "0 10px",
    cursor: "pointer",
    transition: "opacity ease-out .3s",
  };
  if (selected) {
    style.opacity = 0.5;
  }
  if (highContrast) {
    style.color = selected
      ? HighContrastColors.Disabled
      : HighContrastColors.Foreground;
  }

  return (
    <div
      ref={legendItemRef}
      style={style}
      onClick={() => {
        onClick(id), setSelected(!selected);
      }}
    >
      <LegendItemColor
        dataset={dataset}
        highContrast={highContrast}
        selected={selected}
      />
      {dataset.label}
    </div>
  );
};

function elementInViewport(element: HTMLDivElement) {
  let top = element.offsetTop;
  let left = element.offsetLeft;
  let width = element.offsetWidth;
  let height = element.offsetHeight;

  while (element.offsetParent) {
    (element as any) = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}

const LegendItemColor = ({
  dataset,
  selected,
  highContrast,
}: {
  dataset: Chart.ChartDataSets;
  selected: boolean;
  highContrast?: boolean;
}) => {
  const labelColorValueRef = React.useRef<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    if (!labelColorValueRef.current) return;
    const canvasRef: HTMLCanvasElement = labelColorValueRef.current;
    createLegendItemCanvas({ canvas: canvasRef, dataset, highContrast });
  }, []);
  return (
    <canvas
      ref={labelColorValueRef}
      tabIndex={0}
      style={
        highContrast
          ? {
              width: "1.5rem",
              minWidth: "1.25rem",
              height: "1rem",
              minHeight: "1rem",
              marginRight: ".4rem",
              borderRadius: "2px",
              userSelect: "none",
            }
          : {
              width: ".7rem",
              minWidth: ".7rem",
              height: ".7rem",
              minHeight: ".7rem",
              marginBottom: "-1px",
              marginRight: ".4rem",
              borderRadius: "2px",
              userSelect: "none",
            }
      }
    />
  );
};

function createLegendItemCanvas({
  canvas,
  dataset,
  highContrast,
}: {
  canvas: HTMLCanvasElement;
  dataset: Chart.ChartDataSets;
  highContrast?: boolean;
}) {
  if (!canvas) return;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
  if (!ctx) return;
  ctx.save();
  ctx.scale(10, 8);

  if (!dataset.borderDash) {
    ctx.fillStyle = (dataset.backgroundColor === "transparent" ||
    dataset.backgroundColor === "rgba(0,0,0,0)"
      ? dataset.borderColor
      : dataset.backgroundColor) as string;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (highContrast) {
    ctx.strokeStyle = HighContrastColors.Foreground;
    ctx.lineWidth = dataset.borderWidth as number;
    ctx.strokeRect(0, 0, 30, 19);
  }

  if (dataset.type === ChartTypes.Line && dataset.borderDash) {
    if (highContrast) {
      const x = 22;
      const y = 10;

      ctx.strokeStyle = HighContrastColors.Background;
      ctx.lineWidth = dataset.borderWidth as number;
      ctx.strokeRect(0, 0, 30, 18);
      // Line
      ctx.beginPath();
      ctx.moveTo(-10, y);
      ctx.lineTo(18, y);
      ctx.setLineDash(dataset.borderDash!);
      ctx.lineWidth = (dataset.borderWidth as number) || 4;
      ctx.strokeStyle = HighContrastColors.Foreground;
      ctx.stroke();

      // Point
      const pointStyle = dataset.pointStyle;
      if (pointStyle) {
        const radius = 6;
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
            ctx.arc(x, y, radius * 0.85, 0, Math.PI * 2, true);
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
        ctx.lineWidth = 1;
        ctx.fillStyle = HighContrastColors.Foreground;
        ctx.strokeStyle = HighContrastColors.Foreground;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    } else {
      ctx.fillStyle = dataset.borderColor as string;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  // switch (dataset.type) {
  //   case ChartTypes.Line:
  //     if (highContrast) {
  //       const x = 22;
  //       const y = 10;
  //       // Line
  //       ctx.beginPath();
  //       ctx.moveTo(-10, y);
  //       ctx.lineTo(18, y);
  //       ctx.setLineDash(dataset.borderDash!);
  //       ctx.lineWidth = (dataset.borderWidth as number) || 4;
  //       ctx.strokeStyle = HighContrastColors.Foreground;
  //       ctx.stroke();

  //       // Point
  //       const pointStyle = dataset.pointStyle;
  //       if (pointStyle) {
  //         const radius = 6;
  //         const rotation = 0;
  //         let xOffset = 0;
  //         let yOffset = 0;
  //         let cornerRadius = 1;
  //         let size = 5;
  //         let rad = 0;

  //         ctx.beginPath();
  //         ctx.setLineDash([]);
  //         switch (pointStyle) {
  //           // Default includes circle
  //           default:
  //             ctx.arc(x, y, radius * 0.85, 0, Math.PI * 2, true);
  //             ctx.closePath();
  //             break;
  //           case "triangle":
  //             ctx.moveTo(
  //               x + Math.sin(rad) * radius,
  //               y - Math.cos(rad) * radius
  //             );
  //             rad += TWO_THIRDS_PI;
  //             ctx.lineTo(
  //               x + Math.sin(rad) * radius,
  //               y - Math.cos(rad) * radius
  //             );
  //             rad += TWO_THIRDS_PI;
  //             ctx.lineTo(
  //               x + Math.sin(rad) * radius,
  //               y - Math.cos(rad) * radius
  //             );
  //             ctx.closePath();
  //             break;
  //           case "rectRounded":
  //             cornerRadius = radius * 0.516;
  //             size = radius - cornerRadius;
  //             xOffset = Math.cos(rad + QUARTER_PI) * size;
  //             yOffset = Math.sin(rad + QUARTER_PI) * size;
  //             ctx.arc(
  //               x - xOffset,
  //               y - yOffset,
  //               cornerRadius,
  //               rad - PI,
  //               rad - HALF_PI
  //             );
  //             ctx.arc(
  //               x + yOffset,
  //               y - xOffset,
  //               cornerRadius,
  //               rad - HALF_PI,
  //               rad
  //             );
  //             ctx.arc(
  //               x + xOffset,
  //               y + yOffset,
  //               cornerRadius,
  //               rad,
  //               rad + HALF_PI
  //             );
  //             ctx.arc(
  //               x - yOffset,
  //               y + xOffset,
  //               cornerRadius,
  //               rad + HALF_PI,
  //               rad + PI
  //             );
  //             ctx.closePath();
  //             break;
  //           case "rect":
  //             if (!rotation) {
  //               size = Math.SQRT1_2 * radius;
  //               ctx.rect(x - size, y - size, 2 * size, 2 * size);
  //               break;
  //             }
  //             rad += QUARTER_PI;
  //           /* falls through */
  //           case "rectRot":
  //             xOffset = Math.cos(rad) * radius;
  //             yOffset = Math.sin(rad) * radius;
  //             ctx.moveTo(x - xOffset, y - yOffset);
  //             ctx.lineTo(x + yOffset, y - xOffset);
  //             ctx.lineTo(x + xOffset, y + yOffset);
  //             ctx.lineTo(x - yOffset, y + xOffset);
  //             ctx.closePath();
  //             break;
  //           case "crossRot":
  //             rad += QUARTER_PI;
  //           /* falls through */
  //           case "cross":
  //             xOffset = Math.cos(rad) * radius;
  //             yOffset = Math.sin(rad) * radius;
  //             ctx.moveTo(x - xOffset, y - yOffset);
  //             ctx.lineTo(x + xOffset, y + yOffset);
  //             ctx.moveTo(x + yOffset, y - xOffset);
  //             ctx.lineTo(x - yOffset, y + xOffset);
  //             break;
  //           case "star":
  //             xOffset = Math.cos(rad) * radius;
  //             yOffset = Math.sin(rad) * radius;
  //             ctx.moveTo(x - xOffset, y - yOffset);
  //             ctx.lineTo(x + xOffset, y + yOffset);
  //             ctx.moveTo(x + yOffset, y - xOffset);
  //             ctx.lineTo(x - yOffset, y + xOffset);
  //             rad += QUARTER_PI;
  //             xOffset = Math.cos(rad) * radius;
  //             yOffset = Math.sin(rad) * radius;
  //             ctx.moveTo(x - xOffset, y - yOffset);
  //             ctx.lineTo(x + xOffset, y + yOffset);
  //             ctx.moveTo(x + yOffset, y - xOffset);
  //             ctx.lineTo(x - yOffset, y + xOffset);
  //             break;
  //           case "line":
  //             xOffset = Math.cos(rad) * radius;
  //             yOffset = Math.sin(rad) * radius;
  //             ctx.moveTo(x - xOffset, y - yOffset);
  //             ctx.lineTo(x + xOffset, y + yOffset);
  //             break;
  //           case "dash":
  //             ctx.moveTo(x, y);
  //             ctx.lineTo(
  //               x + Math.cos(rad) * radius,
  //               y + Math.sin(rad) * radius
  //             );
  //             break;
  //         }
  //         ctx.lineWidth = 1;
  //         ctx.fillStyle = HighContrastColors.Foreground;
  //         ctx.strokeStyle = HighContrastColors.Foreground;
  //         ctx.closePath();
  //         ctx.fill();
  //         ctx.stroke();
  //         ctx.restore();
  //       }
  //     } else {
  //       ctx.fillStyle = dataset.borderColor as string;
  //       ctx.fillRect(0, 0, canvas.width, canvas.height);
  //     }
  //     break;
  //   default:
  //     ctx.fillStyle = dataset.backgroundColor as string;
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);
  //     if (highContrast) {
  //       ctx.strokeStyle = HighContrastColors.Foreground;
  //       ctx.lineWidth = dataset.borderWidth as number;
  //       ctx.strokeRect(0, 0, 30, 18);
  //     }
  //     break;
  // }
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // if (theme === TeamsTheme.HighContrast) {
  //   if (patterns) {
  //     ctx.setTransform(1.4, 0, 0, 1, 0, 0);
  //     ctx.scale(12, 10);
  //     (ctx.fillStyle as any) = buildPattern({
  //       ...patterns(colorScheme)[index],
  //       backgroundColor: colorScheme.default.background,
  //       patternColor: colorScheme.brand.background,
  //     });
  //     ctx.fillRect(-15, -15, canvasRef.width, canvasRef.height);
  //     ctx.restore();
  //   } else {
  //     ctx.scale(15, 15);
  //     ctx.fillStyle = colorScheme.brand.shadow;
  //     ctx.fillRect(-15, -15, canvasRef.width, canvasRef.height);
  //     ctx.fillStyle = colorScheme.default.foreground3;
  //     switch (lineChartPatterns[index].pointStyle) {
  //       case PointStyles.Triangle:
  //         ctx.moveTo(9.5, 2.5);
  //         ctx.lineTo(5.5, 7.5);
  //         ctx.lineTo(13.5, 7.5);
  //         break;
  //       case PointStyles.Rectangle:
  //         ctx.rect(6.5, 2.5, 8, 5);
  //         break;
  //       case PointStyles.RectangleRotated:
  //         ctx.moveTo(10, 2);
  //         ctx.lineTo(14.5, 5);
  //         ctx.lineTo(10, 8);
  //         ctx.lineTo(5.5, 5);
  //         break;
  //       case PointStyles.Circle:
  //       default:
  //         ctx.ellipse(10, 5, 3.5, 2.5, 0, 0, 2 * Math.PI);
  //         break;
  //     }
  //     ctx.fill();

  //     // Line Style
  //     ctx.strokeStyle = colorScheme.default.foreground3;
  //     ctx.beginPath();
  //     ctx.setLineDash(
  //       lineChartPatterns[index].lineBorderDash.length ? [2, 2] : []
  //     );
  //     ctx.moveTo(-1.5, 5);
  //     ctx.lineTo(20, 5);
  //     ctx.stroke();
  //     ctx.restore();
  //   }
  // } else {
  //   ctx.fillStyle = dataPointColor;
  //   ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
  // }
}
