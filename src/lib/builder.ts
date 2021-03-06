import { PluginServiceRegistrationOptions } from "chart.js";
import {
  axisXTeamsStyle,
  gradientPlugin,
  highLightDataOnHover,
  horizontalBarAxisYLabels,
  horizontalBarValue,
  keyboardAccessibility,
  removeAllListeners,
} from "./plugins";
import {
  ChartTypes,
  Entity,
  IChartConfig,
  IChartData,
  IChartOptions,
  ILineChartDataHighContrast,
  ILinePreSetupConfigHighContrast,
  IPreSetupConfig,
  IPreSetupConfigHighContrast,
} from "../types";
import {
  barOptions,
  defaultOptions,
  doughnutOptions,
  groupedBarOptions,
  highContrastOptions,
  horizontalBarOptions,
  pieOptions,
  stackedBarOptions,
  stackedLineOptions,
  trendLineOptions,
} from "./settings";
import {
  BarDataSetHCStyle,
  BarDataSetStyle,
  DoughnutDataSetHCStyle,
  DoughnutDataSetStyle,
  HorizontalBarDataSetHCStyle,
  HorizontalBarDataSetStyle,
  LineDataSetHCStyle,
  LineDataSetStyle,
  LineStackedDataSetHCStyle,
  LineStackedDataSetStyle,
  PieDataSetHCStyle,
  PieDataSetStyle,
  TrendLineDataSetHCStyle,
  TrendLineDataSetStyle,
} from "./datasets";
import { deepMerge } from "./utils";

export class ChartBuilder extends Entity {
  type?: ChartTypes;
  data: IChartData;
  areaLabel: string;
  options: IChartOptions = defaultOptions;
  plugins: PluginServiceRegistrationOptions[] = [
    {
      afterInit: keyboardAccessibility,
    },
    {
      afterInit: axisXTeamsStyle,
    },
    {
      destroy: removeAllListeners,
    },
  ];

  constructor(fields: IChartConfig) {
    super(fields);

    this.areaLabel = fields.areaLabel;
    this.data = fields.data;
    this.type = fields.type;

    if (fields.plugins) {
      this.plugins = this.plugins.concat(fields.plugins);
    }

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }
  }
}

export class LineChart extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.Line;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new LineDataSetStyle(set)
    );

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class TrendLineChart extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.Line;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new TrendLineDataSetStyle(set)
    );

    this.options = deepMerge(this.options, trendLineOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      afterLayout: gradientPlugin,
    });
    this.plugins.push({
      beforeDatasetDraw: highLightDataOnHover,
    });
  }
}

export class TrendLineChartHighContrast extends TrendLineChart {
  constructor(fields: ILinePreSetupConfigHighContrast) {
    super(fields);

    this.data.datasets = Array.from(
      fields.data.datasets,
      (set: TrendLineDataSetHCStyle) => new TrendLineDataSetHCStyle(set)
    );

    this.options = deepMerge(this.options, highContrastOptions);

    this.plugins.push({
      afterLayout: gradientPlugin,
    });

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class BarChart extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.Bar;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new BarDataSetStyle(set)
    );

    this.options = deepMerge(this.options, barOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class PieChart extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.Pie;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new PieDataSetStyle(set)
    );

    this.options = deepMerge(this.options, pieOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }
  }
}

export class DoughnutChart extends PieChart {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.Doughnut;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new DoughnutDataSetStyle(set)
    );

    this.options = deepMerge(this.options, doughnutOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }
  }
}

export class GroupedBarChart extends BarChart {
  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.options = deepMerge(this.options, groupedBarOptions);
  }
}

export class StackedBarChart extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.Bar;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new BarDataSetStyle(set)
    );

    this.options = deepMerge(this.options, stackedBarOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class HorizontalBarChart extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.HorizontalBar;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new HorizontalBarDataSetStyle(set)
    );

    this.plugins.push({
      resize: horizontalBarAxisYLabels,
    });
    this.plugins.push({
      afterDatasetsDraw: horizontalBarValue,
    });

    this.options = deepMerge(this.options, horizontalBarOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }
  }
}

export class AreaChart extends LineChart {
  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.plugins.push({
      afterLayout: gradientPlugin,
    });
    this.plugins.push({
      beforeDatasetDraw: highLightDataOnHover,
    });
  }
}

export class LineStackedChart extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfig) {
    super(fields);

    this.type = ChartTypes.Line;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new LineStackedDataSetStyle(set)
    );
    this.options = deepMerge(this.options, stackedLineOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

/**
 * HighContrast Chart Options
 */

export class HorizontalBarChartHighContrast extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfigHighContrast) {
    super(fields);

    this.type = ChartTypes.HorizontalBar;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) =>
        new HorizontalBarDataSetHCStyle(set as HorizontalBarDataSetHCStyle)
    );

    this.plugins.push({
      resize: horizontalBarAxisYLabels,
    });
    this.plugins.push({
      afterDatasetsDraw: horizontalBarValue,
    });

    this.options = deepMerge(this.options, highContrastOptions);
    this.options = deepMerge(this.options, horizontalBarOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }
  }
}

export class StackedBarChartHighContrast extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfigHighContrast) {
    super(fields);

    this.type = ChartTypes.Bar;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new BarDataSetHCStyle(set as BarDataSetHCStyle)
    );

    this.options = deepMerge(this.options, highContrastOptions);
    this.options = deepMerge(this.options, stackedBarOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class LineStackedChartHighContrast extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfigHighContrast) {
    super(fields);

    this.type = ChartTypes.Line;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new LineStackedDataSetHCStyle(set as LineStackedDataSetHCStyle)
    );
    this.options = deepMerge(this.options, highContrastOptions);
    this.options = deepMerge(this.options, stackedLineOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class PieChartHighContrast extends PieChart {
  type: ChartTypes;

  constructor(fields: IPreSetupConfigHighContrast) {
    super(fields);

    this.type = ChartTypes.Pie;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new PieDataSetHCStyle(set as PieDataSetHCStyle)
    );

    this.options = deepMerge(this.options, highContrastOptions);
    this.options = deepMerge(this.options, pieOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }
  }
}

export class DoughnutChartHighContrast extends DoughnutChart {
  type: ChartTypes;

  constructor(fields: IPreSetupConfigHighContrast) {
    super(fields);

    this.type = ChartTypes.Pie;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new DoughnutDataSetHCStyle(set as DoughnutDataSetHCStyle)
    );

    this.options = deepMerge(this.options, highContrastOptions);
    this.options = deepMerge(this.options, doughnutOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }
  }
}

export class LineChartHighContrast extends ChartBuilder {
  type: ChartTypes;
  data: ILineChartDataHighContrast;

  constructor(fields: ILinePreSetupConfigHighContrast) {
    super(fields);

    this.type = ChartTypes.Line;
    this.data = fields.data;
    this.data.datasets = Array.from(
      fields.data.datasets,
      (set: LineDataSetHCStyle) => new LineDataSetHCStyle(set)
    );

    this.options = deepMerge(defaultOptions, highContrastOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class AreaChartHighContrast extends LineChartHighContrast {
  constructor(fields: ILinePreSetupConfigHighContrast) {
    super(fields);

    this.plugins.push({
      afterLayout: gradientPlugin,
    });

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class BarChartHighContrast extends ChartBuilder {
  type: ChartTypes;

  constructor(fields: IPreSetupConfigHighContrast) {
    super(fields);

    this.type = ChartTypes.Bar;
    this.data.datasets = Array.from(
      this.data.datasets,
      (set) => new BarDataSetHCStyle(set as BarDataSetHCStyle)
    );

    this.options = deepMerge(this.options, highContrastOptions);
    this.options = deepMerge(this.options, barOptions);

    if (fields.options) {
      this.options = deepMerge(this.options, fields.options);
    }

    this.plugins.push({
      beforeDatasetsDraw: highLightDataOnHover,
    });
  }
}

export class GroupedBarChartHighContrast extends BarChartHighContrast {
  constructor(fields: IPreSetupConfigHighContrast) {
    super(fields);

    this.options = deepMerge(this.options, groupedBarOptions);
  }
}
