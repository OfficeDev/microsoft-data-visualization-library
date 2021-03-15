import React, { useEffect } from "react";
import Chart from "chart.js";
import { tooltipTrigger, tooltipAxisYLine } from "../lib/utils";
import { IChart } from "../types";

export const LineChart = (config: IChart) => {
  const { data } = config;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<Chart | undefined>();
  const chartId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );

  useEffect(() => {
    let selectedIndex = -1;
    let selectedDataSet = 0;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const _config = {
      ...config,
      plugins: [
        {
          afterDatasetsDraw: ({ ctx, tooltip, chart }: any) => {
            tooltipAxisYLine({
              chart,
              ctx,
              tooltip,
            });
          },
        },
      ],
    };
    // Chart Init
    chartRef.current = new Chart(ctx, _config);
    const chart: any = chartRef.current;

    const axesXGridLines = ctx!.createLinearGradient(100, 100, 100, 0);
    axesXGridLines.addColorStop(0.01, chart.options.defaultColor);
    axesXGridLines.addColorStop(0.01, "transparent");

    chart.options.scales.xAxes.forEach((xAxes: any, index: number) => {
      if (index < 1) {
        xAxes.gridLines.color = axesXGridLines;
        xAxes.gridLines.zeroLineColor = axesXGridLines;
      } else {
        xAxes.gridLines.color = "transparent";
      }
    });

    /**
     * Keyboard manipulations
     */
    function meta() {
      return chart.getDatasetMeta(selectedDataSet);
    }

    function removeFocusStyleOnClick() {
      // Remove focus state style if selected by mouse
      if (canvasRef.current) {
        canvasRef.current.style.boxShadow = "none";
      }
    }

    function removeDataPointsHoverStates() {
      if (selectedIndex > -1) {
        meta().controller.removeHoverStyle(
          meta().data[selectedIndex],
          0,
          selectedIndex
        );
      }
    }

    function hoverDataPoint(pointID: number) {
      meta().controller.setHoverStyle(
        meta().data[pointID],
        selectedDataSet,
        pointID
      );
    }

    function showFocusedDataPoint() {
      hoverDataPoint(selectedIndex);
      if (data) {
        tooltipTrigger({
          chart: chartRef.current as any,
          data,
          set: selectedDataSet,
          index: selectedIndex,
          mergeDuplicates: true,
        });
      }
      document
        .getElementById(
          `${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`
        )
        ?.focus();
    }

    function resetChartStates() {
      removeDataPointsHoverStates();
      const activeElements = chart.tooltip._active;
      const requestedElem = chart.getDatasetMeta(selectedDataSet).data[
        selectedIndex
      ];
      activeElements.find((v: any, i: number) => {
        if (requestedElem._index === v._index) {
          activeElements.splice(i, 1);
          return true;
        }
      });

      for (let i = 0; i < activeElements.length; i++) {
        if (requestedElem._index === activeElements[i]._index) {
          activeElements.splice(i, 1);
          break;
        }
      }
      // if (theme === ChartTheme.HighContrast) {
      //   chart.data.datasets.map((dataset: any) => {
      //     dataset.borderColor = colorScheme.default.border;
      //     dataset.borderWidth = 2;
      //   });
      //   chart.update();
      // }
      chart.tooltip._active = activeElements;
      chart.tooltip.update(true);
      chart.draw();
    }

    function changeFocus(e: KeyboardEvent) {
      removeDataPointsHoverStates();
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % meta().data.length;
          break;
        case "ArrowLeft":
          e.preventDefault();
          selectedIndex = (selectedIndex || meta().data.length) - 1;
          break;
        case "ArrowUp":
        case "ArrowDown":
          e.preventDefault();
          if (data!.datasets!.length > 1) {
            // Get all values for the current data point
            const values = data!.datasets!.map(
              (dataset) => dataset!.data![selectedIndex]
            );
            // Sort an array to define next available number
            const sorted = [...Array.from(new Set(values))].sort(
              (a, b) => Number(a) - Number(b)
            );
            let nextValue =
              sorted[
                sorted.findIndex((v) => v === values[selectedDataSet]) +
                  (e.key === "ArrowUp" ? 1 : -1)
              ];

            // Find dataset ID by the next higher number after current
            let nextDataSet = values.findIndex((v) => v === nextValue);

            // If there is no next number that could selected, get number from oposite side
            if (nextDataSet < 0) {
              nextDataSet = values.findIndex(
                (v) =>
                  v ===
                  sorted[e.key === "ArrowUp" ? 0 : data!.datasets!.length - 1]
              );
            }
            selectedDataSet = nextDataSet;
            selectedIndex = selectedIndex % meta().data.length;
          }
          break;
      }

      showFocusedDataPoint();
    }

    canvasRef.current.addEventListener("click", removeFocusStyleOnClick);
    canvasRef.current.addEventListener("keydown", changeFocus);
    canvasRef.current.addEventListener("focusout", resetChartStates);
    return () => {
      if (!chartRef.current) return;
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", removeFocusStyleOnClick);
        canvasRef.current.removeEventListener("keydown", changeFocus);
        canvasRef.current.removeEventListener("focusout", resetChartStates);
      }
      chartRef.current.destroy();
    };
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
