import React, { useEffect } from "react";
import Chart, { PluginServiceRegistrationOptions } from "chart.js";
import { IChart } from "../types";
import {
  removeAllListeners,
  keyboardAccessibility,
  highLightDataOnHover,
  axisXTeamsStyle,
} from "../lib/plugins";

export const ChartRender = (config: IChart) => {
  const { data, plugins } = config;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<Chart | undefined>();
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    let _plugins: PluginServiceRegistrationOptions[] = [
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
    if (plugins) {
      _plugins = [..._plugins, ...plugins];
    }
    if (!ctx) return;
    const _config = {
      ...config,
      plugins: _plugins,
    };

    // Chart Init
    chartRef.current = new Chart(ctx, _config);
  }, []);

  return (
    <canvas
      id={chartId}
      ref={canvasRef}
      tabIndex={0}
      style={{
        userSelect: "none",
      }}
      aria-label={config.areaLabel}
    >
      {data!.datasets!.map((set, setKey) =>
        (set.data! as number[]).forEach((item: number, itemKey: number) => (
          // Generated tooltips for screen readers
          <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
            <p>{item}</p>
            <span>
              {set.label}: {set!.data![itemKey]}
            </span>
          </div>
        ))
      )}
    </canvas>
  );
};
