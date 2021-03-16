import { PluginServiceRegistrationOptions } from "chart.js";
import {
  axisXTeamsStyle,
  highLightDataOnHover,
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
  LineHighContrastChartDataSets,
} from "../types";
import { defaultOptions, highContrastOptions } from "./settings";
import { LineDataSetHCStyle, LineDataSetStyle } from "./datasets";
import { deepMerge } from "./utils";

export class ChartBuilder extends Entity {
  type?: ChartTypes;
  data: IChartData;
  areaLabel: string;
  options: IChartOptions = defaultOptions;
  plugins?: PluginServiceRegistrationOptions[];

  constructor(fields: IChartConfig) {
    super(fields);

    this.areaLabel = fields.areaLabel;
    this.data = fields.data;
    this.type = fields.type;
    const defaultPlugins: PluginServiceRegistrationOptions[] = [
      {
        afterInit: keyboardAccessibility,
      },
      {
        afterInit: axisXTeamsStyle,
      },
      {
        afterDatasetsDraw: highLightDataOnHover,
      },
      {
        destroy: removeAllListeners,
      },
    ];
    this.plugins = fields.plugins
      ? defaultPlugins.concat(fields.plugins)
      : defaultPlugins;

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
  }
}
