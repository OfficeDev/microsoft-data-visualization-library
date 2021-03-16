import React, { useEffect } from "react";
import Chart from "chart.js";
import { IChart } from "../types";

export const ChartRender = (config: IChart) => {
  const { data } = config;

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
