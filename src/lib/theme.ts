import {
  BorderWidth,
  ChartColor,
  ChartDataSets,
  PointStyle,
  Scriptable,
  BorderAlignment,
  PositionType,
  ChartPoint,
  ChartType,
} from "chart.js";
import { Entity, Point } from "../types";

// export class ChartDataSet extends Entity implements ChartDataSets {
//   backgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   barPercentage?: number;
//   barThickness?: number | "flex";
//   borderAlign?: BorderAlignment | BorderAlignment[] | Scriptable<BorderAlignment>;
//   borderCapStyle?: 'butt' | 'round' | 'square';
//   borderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   borderDash?: number[];
//   borderDashOffset?: number;
//   borderJoinStyle?: 'bevel' | 'round' | 'miter';
//   borderSkipped?: PositionType | PositionType[] | Scriptable<PositionType>;
//   borderWidth?: BorderWidth | BorderWidth[] | Scriptable<BorderWidth>;
//   categoryPercentage?: number;
//   cubicInterpolationMode?: 'default' | 'monotone';
//   data?: Array<number | null | undefined | number[]> | ChartPoint[];
//   fill?: boolean | number | string;
//   hidden?: boolean;
//   hideInLegendAndTooltip?: boolean;
//   hitRadius?: number | number[] | Scriptable<number>;
//   hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   hoverBorderWidth?: number | number[] | Scriptable<number>;
//   hoverRadius?: number;
//   label?: string;
//   lineTension?: number;
//   maxBarThickness?: number;
//   minBarLength?: number;
//   order?: number;
//   pointBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   pointBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   pointBorderWidth?: number | number[] | Scriptable<number>;
//   pointHitRadius?: number | number[] | Scriptable<number>;
//   pointHoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   pointHoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
//   pointHoverBorderWidth?: number | number[] | Scriptable<number>;
//   pointHoverRadius?: number | number[] | Scriptable<number>;
//   pointRadius?: number | number[] | Scriptable<number>;
//   pointRotation?: number | number[] | Scriptable<number>;
//   pointStyle?: PointStyle | HTMLImageElement | HTMLCanvasElement | Array<PointStyle | HTMLImageElement | HTMLCanvasElement> | Scriptable<PointStyle | HTMLImageElement | HTMLCanvasElement>;
//   radius?: number | number[] | Scriptable<number>;
//   rotation?: number | number[] | Scriptable<number>;
//   showLine?: boolean;
//   spanGaps?: boolean;
//   stack?: string;
//   steppedLine?: 'before' | 'after' | 'middle' | boolean;
//   type?: ChartType | string;
//   weight?: number;
//   xAxisID?: string;
//   yAxisID?: string;

//   constructor(fields: Partial<ChartDataSets>) {
//     super(fields)
//   }
// }

export class LineChartDataSetStyle extends Entity implements ChartDataSets {
  borderCapStyle?: "butt" | "round" | "square";
  borderJoinStyle?: "bevel" | "round" | "miter";
  borderWidth?: BorderWidth | BorderWidth[] | Scriptable<BorderWidth>;
  hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBorderWidth?: number | number[] | Scriptable<number>;
  pointBorderWidth?: number | number[] | Scriptable<number>;
  pointHoverBorderWidth?: number | number[] | Scriptable<number>;
  pointHoverRadius?: number | number[] | Scriptable<number>;
  pointRadius?: number | number[] | Scriptable<number>;
  pointStyle?:
    | PointStyle
    | HTMLImageElement
    | HTMLCanvasElement
    | Array<PointStyle | HTMLImageElement | HTMLCanvasElement>
    | Scriptable<PointStyle | HTMLImageElement | HTMLCanvasElement>;
  backgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  color?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pointBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pointBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pointHoverBackgroundColor?:
    | ChartColor
    | ChartColor[]
    | Scriptable<ChartColor>;
  pointHoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;

  constructor(fields: Partial<LineChartDataSetStyle>) {
    super(fields);
    this.backgroundColor = fields.backgroundColor || "transparent";
    this.borderCapStyle = fields.borderCapStyle || "round";
    this.borderJoinStyle = fields.borderJoinStyle || "round";
    this.borderWidth = fields.borderWidth || 2;
    this.hoverBackgroundColor = fields.hoverBackgroundColor || "transparent";
    this.hoverBorderWidth = fields.hoverBorderWidth || 2;
    this.pointBorderWidth = fields.hoverBorderWidth || 0;
    this.pointHoverBorderWidth = fields.pointHoverBorderWidth || 0;
    this.pointHoverRadius = fields.pointHoverRadius || 2;
    this.pointRadius = fields.pointRadius || 2;
    this.pointStyle = fields.pointStyle || "circle";
    this.borderColor = fields.borderColor || fields.color || "rgba(0,0,0,.1)";
    this.hoverBorderColor =
      fields.hoverBorderColor || fields.color || "rgba(0,0,0,.1)";
    this.pointBorderColor =
      fields.pointBorderColor || fields.color || "rgba(0,0,0,.1)";
    this.pointBackgroundColor =
      fields.pointBackgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.pointHoverBackgroundColor =
      fields.pointHoverBackgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.pointHoverBorderColor =
      fields.pointHoverBorderColor || fields.color || "rgba(0,0,0,.1)";
  }
}

export class LineChartDataSetHCStyle extends LineChartDataSetStyle {
  borderColor: string;
  hoverBorderColor: string;
  pointBorderColor: string;
  pointBackgroundColor: string;
  pointHoverBackgroundColor: string;
  pointHoverBorderColor: string;
  hoverBorderWidth?: number | number[] | Scriptable<number>;
  pointRadius?: number | number[] | Scriptable<number>;
  pointHoverRadius?: number | number[] | Scriptable<number>;
  borderDash: number[];
  pointStyle:
    | PointStyle
    | HTMLImageElement
    | HTMLCanvasElement
    | Array<PointStyle | HTMLImageElement | HTMLCanvasElement>
    | Scriptable<PointStyle | HTMLImageElement | HTMLCanvasElement>;

  constructor(fields: Partial<LineChartDataSetHCStyle>) {
    super(fields);
    this.borderColor = "#fff";
    this.hoverBorderColor = "#1aebff";
    this.pointBorderColor = "#fff";
    this.pointBackgroundColor = "#fff";
    this.pointHoverBackgroundColor = "#fff";
    this.pointHoverBorderColor = "#fff";
    this.hoverBorderWidth = 4;
    this.pointRadius = 4;
    this.pointHoverRadius = 4;
    this.borderDash = fields.borderDash || [];
    this.pointStyle = fields.pointStyle || Point.Circle;
  }
}
