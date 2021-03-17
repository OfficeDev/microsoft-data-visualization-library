import {
  ChartDataSets,
  PluginServiceRegistrationOptions,
  PointStyle,
  Scriptable,
} from "chart.js";
import { Moment } from "moment";
import { LineDataSetHCStyle } from "../lib/datasets";

export class Entity {
  constructor(fields?: any) {
    Object.assign(this, fields);
  }
}

export interface IChart extends Chart.ChartConfiguration {
  areaLabel: string;
  type?: ChartTypes;
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
  HorizontalBar = "horizontalBar",
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

export interface IChartData {
  labels: Array<
    string | string[] | number | number[] | Date | Date[] | Moment | Moment[]
  >;
  datasets: ChartDataSets[];
}

export interface IChartDataHighContrast extends IChartData {
  datasets: HighContrastChartDataSets[];
}

export interface ILineChartDataHighContrast extends IChartData {
  datasets: LineDataSetHCStyle[];
}

export interface LineHighContrastChartDataSets extends ChartDataSets {
  borderDash: number[];
  pointStyle:
    | PointStyle
    | HTMLImageElement
    | HTMLCanvasElement
    | Array<PointStyle | HTMLImageElement | HTMLCanvasElement>
    | Scriptable<PointStyle | HTMLImageElement | HTMLCanvasElement>;
}

export interface HighContrastChartDataSets extends ChartDataSets {
  pattern: IDraw;
}

export interface IChartConfig {
  type?: ChartTypes;
  data: IChartData;
  areaLabel: string;
  options?: IChartOptions;
  plugins?: PluginServiceRegistrationOptions[];
  highContrastMode?: boolean;
}

export interface IPreSetupConfig {
  areaLabel: string;
  data: IChartData;
  options?: IChartOptions;
  plugins?: PluginServiceRegistrationOptions[];
}

export interface IPreSetupConfigHighContrast extends IPreSetupConfig {
  data: IChartDataHighContrast;
}
export interface ILinePreSetupConfigHighContrast extends IPreSetupConfig {
  data: ILineChartDataHighContrast;
}
