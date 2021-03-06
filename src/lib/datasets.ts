import {
  BorderWidth,
  ChartColor,
  ChartDataSets,
  PointStyle,
  PositionType,
  Scriptable,
} from "chart.js";
import {
  ChartTypes,
  Entity,
  HighContrastColors,
  IDraw,
  Point,
  Shapes,
} from "../types";
import { buildPattern } from "./patterns";

export class ChartDataSet extends Entity {
  type?: string | undefined;

  constructor(fields: Partial<ChartDataSet>) {
    super(fields);

    this.type = fields.type;
  }
}
export class LineDataSetStyle extends ChartDataSet implements ChartDataSets {
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

  constructor(fields: Partial<LineDataSetStyle>) {
    super(fields);

    this.type = ChartTypes.Line;
    this.backgroundColor = fields.backgroundColor || "transparent";
    this.borderCapStyle = fields.borderCapStyle || "round";
    this.borderJoinStyle = fields.borderJoinStyle || "round";
    this.borderWidth = fields.borderWidth || 2;
    this.hoverBackgroundColor = fields.hoverBackgroundColor || "transparent";
    this.hoverBorderWidth = fields.hoverBorderWidth || 2.5;
    this.pointBorderWidth = fields.hoverBorderWidth || 0;
    this.pointHoverBorderWidth = fields.pointHoverBorderWidth || 0;
    this.pointHoverRadius = fields.pointHoverRadius || 2.5;
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

export class TrendLineDataSetStyle
  extends ChartDataSet
  implements ChartDataSets {
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

  constructor(fields: Partial<LineDataSetStyle>) {
    super(fields);

    this.type = ChartTypes.Line;
    this.backgroundColor = fields.backgroundColor || "transparent";
    this.borderCapStyle = fields.borderCapStyle || "round";
    this.borderJoinStyle = fields.borderJoinStyle || "round";
    this.borderWidth = fields.borderWidth || 2;
    this.hoverBackgroundColor = fields.hoverBackgroundColor || "transparent";
    this.hoverBorderWidth = fields.hoverBorderWidth || 2.5;
    this.pointBorderWidth = fields.hoverBorderWidth || 0;
    this.pointHoverBorderWidth = fields.pointHoverBorderWidth || 0;
    this.pointHoverRadius = fields.pointHoverRadius || 0;
    this.pointRadius = fields.pointRadius || 0;
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

export class LineDataSetHCStyle extends LineDataSetStyle {
  borderColor?: string;
  hoverBorderColor?: string;
  pointBorderColor?: string;
  pointBackgroundColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
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

  constructor(fields: LineDataSetHCStyle) {
    super(fields);
    this.borderColor = HighContrastColors.Foreground;
    this.hoverBorderColor = HighContrastColors.Active;
    this.pointBorderColor = HighContrastColors.Foreground;
    this.pointBackgroundColor = HighContrastColors.Foreground;
    this.pointHoverBackgroundColor = HighContrastColors.Foreground;
    this.pointHoverBorderColor = HighContrastColors.Foreground;
    this.hoverBorderWidth = 4;
    this.pointRadius = 4;
    this.pointHoverRadius = 4;
    this.borderDash = fields.borderDash || [];
    this.pointStyle = fields.pointStyle || Point.Circle;
  }
}

export class TrendLineDataSetHCStyle extends LineDataSetHCStyle {
  constructor(fields: TrendLineDataSetHCStyle) {
    super(fields);
    this.pointBorderWidth = fields.hoverBorderWidth || 0;
    this.pointHoverBorderWidth = fields.pointHoverBorderWidth || 0;
    this.pointHoverRadius = fields.pointHoverRadius || 0;
    this.pointRadius = fields.pointRadius || 0;
  }
}

export class LineStackedDataSetStyle extends LineDataSetStyle {
  constructor(fields: LineStackedDataSetStyle) {
    super(fields);
    this.backgroundColor =
      fields.backgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.hoverBackgroundColor =
      fields.hoverBackgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.borderWidth = fields.borderWidth || 1;
    this.borderColor = fields.borderColor || "#ffffff";
    this.pointRadius = fields.pointRadius || 0;
    this.pointHoverBackgroundColor =
      fields.pointHoverBackgroundColor || "#ffffff";
    this.pointHoverRadius = fields.pointHoverRadius || 3;
    this.pointHoverBorderWidth = fields.pointHoverBorderWidth || 2;
  }
}

export class LineStackedDataSetHCStyle extends LineStackedDataSetStyle {
  pattern: IDraw;

  constructor(fields: LineStackedDataSetHCStyle) {
    super(fields);
    this.pattern = fields.pattern || {
      shape: Shapes.Square,
      size: 10,
    };
    this.backgroundColor = buildPattern({
      backgroundColor: HighContrastColors.Background,
      patternColor: HighContrastColors.Foreground,
      ...this.pattern,
    }) as any;
    this.hoverBackgroundColor = buildPattern({
      backgroundColor: HighContrastColors.Background,
      patternColor: HighContrastColors.Active,
      ...this.pattern,
    }) as any;
    this.borderColor = HighContrastColors.Foreground;
    this.hoverBorderColor = HighContrastColors.Active;
    this.borderWidth = fields.borderWidth || 3;
    this.hoverBorderWidth = fields.hoverBorderWidth || 4;
    this.hoverBorderWidth = fields.hoverBorderWidth || 5;
    this.pointHoverRadius = fields.pointHoverRadius || 5;
  }
}

export class BarDataSetStyle extends ChartDataSet implements ChartDataSets {
  backgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderWidth?: BorderWidth | BorderWidth[] | Scriptable<BorderWidth>;
  color?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBorderWidth?: number | number[] | Scriptable<number>;
  borderSkipped?: PositionType | PositionType[] | Scriptable<PositionType>;

  constructor(fields: BarDataSetStyle) {
    super(fields);
    this.borderWidth = fields.borderWidth || 0;
    this.backgroundColor =
      fields.backgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.hoverBorderWidth = fields.hoverBorderWidth || 0;
    this.hoverBackgroundColor =
      fields.hoverBackgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.borderSkipped = fields.borderSkipped || (false as any);
    this.type = ChartTypes.Bar as string;
  }
}

export class PieDataSetStyle extends ChartDataSet implements ChartDataSets {
  backgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderWidth?: BorderWidth | BorderWidth[] | Scriptable<BorderWidth>;
  color?: ChartColor[];
  hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderSkipped?: PositionType | PositionType[] | Scriptable<PositionType>;

  constructor(fields: PieDataSetStyle) {
    super(fields);
    this.type = ChartTypes.Pie;
    this.borderWidth = fields.borderWidth || 2;
    this.borderColor = fields.borderColor || "#fff";
    this.hoverBorderColor = fields.hoverBorderColor || "#fff";
    this.backgroundColor =
      fields.backgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.hoverBackgroundColor =
      fields.hoverBackgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.borderSkipped = fields.borderSkipped || (false as any);
  }
}

export class DoughnutDataSetStyle extends PieDataSetStyle {
  constructor(fields: DoughnutDataSetStyle) {
    super(fields);

    this.type = ChartTypes.Doughnut;
  }
}

export class HorizontalBarDataSetStyle
  extends ChartDataSet
  implements ChartDataSets {
  backgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  barPercentage?: number;
  borderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  borderWidth?: BorderWidth | BorderWidth[] | Scriptable<BorderWidth>;
  color?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  hoverBorderWidth?: number | number[] | Scriptable<number>;
  borderSkipped?: PositionType | PositionType[] | Scriptable<PositionType>;

  constructor(fields: HorizontalBarDataSetStyle) {
    super(fields);
    this.type = ChartTypes.HorizontalBar;
    this.borderWidth = fields.borderWidth || 0;
    this.barPercentage = fields.barPercentage || 0.5;
    this.backgroundColor =
      fields.backgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.hoverBorderWidth = fields.hoverBorderWidth || 0;
    this.hoverBackgroundColor =
      fields.hoverBackgroundColor || fields.color || "rgba(0,0,0,.1)";
    this.borderSkipped = fields.borderSkipped || (false as any);
  }
}

export class HorizontalBarDataSetHCStyle extends HorizontalBarDataSetStyle {
  hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pattern: IDraw;

  constructor(fields: BarDataSetHCStyle) {
    super(fields);
    this.pattern = fields.pattern || {
      shape: Shapes.Square,
      size: 10,
    };
    this.backgroundColor = buildPattern({
      backgroundColor: HighContrastColors.Background,
      patternColor: HighContrastColors.Foreground,
      ...this.pattern,
    }) as any;
    this.hoverBackgroundColor = buildPattern({
      backgroundColor: HighContrastColors.Background,
      patternColor: HighContrastColors.Active,
      ...this.pattern,
    }) as any;

    this.borderWidth = fields.borderWidth || 1;
    this.borderColor = HighContrastColors.Foreground;
    this.hoverBorderWidth = fields.hoverBorderWidth || 3;
    this.hoverBorderColor = HighContrastColors.Active;
  }
}

export class PieDataSetHCStyle extends PieDataSetStyle {
  pattern: IDraw[];

  constructor(fields: PieDataSetHCStyle) {
    super(fields);
    this.pattern = fields.pattern || [
      {
        shape: Shapes.Square,
        size: 10,
      },
    ];
    this.borderWidth = fields.borderWidth || 3;
    this.borderColor = HighContrastColors.Foreground;
    this.hoverBorderColor = HighContrastColors.Active;
    this.backgroundColor = Array.from(
      fields.pattern,
      (pat) =>
        buildPattern({
          backgroundColor: HighContrastColors.Background,
          patternColor: HighContrastColors.Foreground,
          ...pat,
        }) as any
    );
    this.hoverBackgroundColor = Array.from(
      fields.pattern,
      (pat) =>
        buildPattern({
          backgroundColor: HighContrastColors.Background,
          patternColor: HighContrastColors.Active,
          ...pat,
        }) as any
    );
  }
}

export class DoughnutDataSetHCStyle extends PieDataSetHCStyle {
  constructor(fields: PieDataSetHCStyle) {
    super(fields);
  }
}

export class BarDataSetHCStyle extends BarDataSetStyle {
  hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  pattern: IDraw;

  constructor(fields: BarDataSetHCStyle) {
    super(fields);
    this.pattern = fields.pattern || {
      shape: Shapes.Square,
      size: 10,
    };
    this.backgroundColor = buildPattern({
      backgroundColor: HighContrastColors.Background,
      patternColor: HighContrastColors.Foreground,
      ...this.pattern,
    }) as any;
    this.hoverBackgroundColor = buildPattern({
      backgroundColor: HighContrastColors.Background,
      patternColor: HighContrastColors.Active,
      ...this.pattern,
    }) as any;

    this.borderWidth = fields.borderWidth || 1;
    this.borderColor = HighContrastColors.Foreground;
    this.hoverBorderWidth = fields.hoverBorderWidth || 3;
    this.hoverBorderColor = HighContrastColors.Active;
  }
}
