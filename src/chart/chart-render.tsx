import React, { useEffect } from "react";
import Chart from "chart.js";
import { ChartLegend } from "./chart-legend";
import { IChart } from "../types";

export const ChartRender = (config: IChart) => {
  const { data, options, canvasProps } = config;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<Chart | undefined>();
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    // Chart Init
    chartRef.current = new Chart(ctx, { ...config });
  }, []);

  function onLegendItemClick(index: number) {
    if (!chartRef.current) return;
    const ci = (chartRef.current as any).chart;
    const meta = ci.getDatasetMeta(index);

    // See controller.isDatasetVisible comment
    meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

    // We hid a dataset ... rerender the chart
    ci.update();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <canvas
          id={chartId}
          ref={canvasRef}
          tabIndex={0}
          style={{
            userSelect: "none",
          }}
          aria-label={config.areaLabel}
          {...canvasProps}
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
      </div>
      {data && (options as any).legend.custom && (
        <ChartLegend config={config} onClick={onLegendItemClick} />
      )}
    </div>
  );
};
