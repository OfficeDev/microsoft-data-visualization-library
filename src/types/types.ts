import {
  BorderAlignment,
  BorderWidth,
  ChartColor,
  ChartDataSets,
  ChartPoint,
  ChartType,
  PointStyle,
  PositionType,
  Scriptable,
} from "chart.js";

export class Entity {
  constructor(fields?: any) {
    Object.assign(this, fields);
  }
}

export interface IChart extends Chart.ChartConfiguration {
  areaLabel: string;
  type: ChartTypes;
}

export interface IChartOptions extends Chart.ChartOptions {
  highContrastMode?: boolean;
}

export interface IBubbleChartData {
  x: number;
  y: number;
  r: number;
}

export interface IChartDataSet {
  label: string;
  data: number[] | IBubbleChartData[];
  hidden?: boolean;
}

export enum ChartTypes {
  Line = "line",
  Bar = "bar",
  Pie = "pie",
  Doughnut = "doughnut",
  Bubble = "bubble",
}

export enum Point {
  Circle = "circle",
  Rectangle = "rect",
  Triangle = "triangle",
  RectangleRotated = "rectRot",
}

export enum Shapes {
  Square = "square",
  DiagonalRightLeft = "diagonalRightLeft",
  Grid = "grid",
  Diagonal = "diagonal",
  VerticalLine = "verticalLine",
  GridRightLeft = "gridRightLeft",
}

export interface IDraw {
  shape: Shapes;
  size: number;
}

export enum HighContrastColors {
  Foreground = "#fff",
  Background = "#000",
  Active = "#1aebff",
  Selected = "#ffff01",
  Disabled = "#3ff23f",
}

export type IChartPatterns = (colorScheme: any) => IDraw[];

export class BarDataSet extends Entity implements ChartDataSets {
  cubicInterpolationMode?: "default" | "monotone";
  backgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  barPercentage?: number;
  barThickness?: number | "flex";
  borderAlign?:
    | BorderAlignment
    | BorderAlignment[]
    | Scriptable<BorderAlignment>;
  borderWidth?: BorderWidth | BorderWidth[] | Scriptable<BorderWidth>;
  borderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderCapStyle?: "butt" | "round" | "square";
  borderDash?: number[];
  borderDashOffset?: number;
  borderJoinStyle?: "bevel" | "round" | "miter";
  borderSkipped?: PositionType | PositionType[] | Scriptable<PositionType>;
  categoryPercentage?: number;
  data?: Array<number | null | undefined | number[]> | ChartPoint[];
  fill?: boolean | number | string;
  hitRadius?: number | number[] | Scriptable<number>;
  hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBorderWidth?: number | number[] | Scriptable<number>;
  hoverRadius?: number;
  label?: string;
  lineTension?: number;
  maxBarThickness?: number;
  minBarLength?: number;
  steppedLine?: "before" | "after" | "middle" | boolean;
  order?: number;
  pointBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pointBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pointBorderWidth?: number | number[] | Scriptable<number>;
  pointRadius?: number | number[] | Scriptable<number>;
  pointRotation?: number | number[] | Scriptable<number>;
  pointHoverRadius?: number | number[] | Scriptable<number>;
  pointHitRadius?: number | number[] | Scriptable<number>;
  pointHoverBackgroundColor?:
    | ChartColor
    | ChartColor[]
    | Scriptable<ChartColor>;
  pointHoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pointHoverBorderWidth?: number | number[] | Scriptable<number>;
  pointStyle?:
    | PointStyle
    | HTMLImageElement
    | HTMLCanvasElement
    | Array<PointStyle | HTMLImageElement | HTMLCanvasElement>
    | Scriptable<PointStyle | HTMLImageElement | HTMLCanvasElement>;
  radius?: number | number[] | Scriptable<number>;
  rotation?: number | number[] | Scriptable<number>;
  xAxisID?: string;
  yAxisID?: string;
  type?: ChartType | string;
  hidden?: boolean;
  hideInLegendAndTooltip?: boolean;
  showLine?: boolean;
  stack?: string;
  spanGaps?: boolean;
  weight?: number;
  constructor(fields: Partial<BarDataSet>) {
    super(fields);
    this.borderWidth = fields.borderWidth || 0;
    this.hoverBorderWidth = fields.hoverBorderWidth || 0;
    this.pointHoverBorderWidth = fields.pointHoverBorderWidth || 0;
    this.borderCapStyle = fields.borderCapStyle || "round";
    this.borderJoinStyle = fields.borderJoinStyle || "round";
    this.pointBorderWidth = fields.pointBorderWidth || 0;
    this.pointRadius = fields.pointRadius || 0;
    this.pointHoverRadius = fields.pointHoverRadius || 0;
  }
}
