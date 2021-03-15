// import React, { useEffect } from "react";
// import Chart, { ChartDataSets } from "chart.js";
// import {
//   tooltipTrigger,
//   tooltipAxisXLine,
//   chartConfig,
//   usNumberFormat,
// } from "../../lib/utils";

// export function BarChart({
//   title,
//   data,
//   stacked,
// }: {
//   title: string;
//   data: Chart.ChartData;
//   stacked?: boolean;
// }) {
//   const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
//   const chartRef = React.useRef<Chart | undefined>();
//   const chartId = React.useMemo(
//     () => Math.random().toString(36).substr(2, 9),
//     []
//   );

//   useEffect(() => {
//     let selectedIndex = -1;
//     let selectedDataSet = 0;

//     if (!canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;
//     const config: any = chartConfig({ type: "bar" });
//     config.options.hover.mode = "nearest";
//     config.options.scales.xAxes[0].gridLines.offsetGridLines =
//       data.datasets!.length > 1 && !stacked ? true : false;

//     if (stacked) {
//       config.options.scales.yAxes[0].stacked = true;
//       config.options.scales.xAxes[0].stacked = true;
//       config.options.tooltips.callbacks.title = (tooltipItems: any) => {
//         let total = 0;
//         data.datasets!.map((dataset: ChartDataSets) => {
//           const value = dataset!.data![tooltipItems[0].index];
//           if (typeof value === "number") {
//             return (total += value);
//           }
//         });
//         return `${((tooltipItems[0].yLabel / total) * 100).toPrecision(
//           2
//         )}% (${usNumberFormat(tooltipItems[0].yLabel)})`;
//       };
//     }

//     chartRef.current = new Chart(ctx, {
//       ...(config as any),
//       data: {
//         labels: data.labels,
//         datasets: [],
//       },
//       plugins: [
//         {
//           afterDatasetsDraw: ({ ctx, tooltip, chart }: any) => {
//             tooltipAxisXLine({
//               chart,
//               ctx,
//               tooltip,
//             });
//           },
//         },
//       ],
//     });
//     const chart: any = chartRef.current;

//     /**
//      * Keyboard manipulations
//      */
//     function meta() {
//       return chart.getDatasetMeta(selectedDataSet);
//     }

//     function removeFocusStyleOnClick() {
//       // Remove focus state style if selected by mouse
//       if (canvasRef.current) {
//         canvasRef.current.style.boxShadow = "none";
//       }
//     }

//     function removeDataPointsHoverStates() {
//       if (selectedIndex > -1) {
//         meta().controller.removeHoverStyle(
//           meta().data[selectedIndex],
//           0,
//           selectedIndex
//         );
//       }
//     }

//     function hoverDataPoint(pointID: number) {
//       meta().controller.setHoverStyle(
//         meta().data[pointID],
//         selectedDataSet,
//         pointID
//       );
//     }

//     function showFocusedDataPoint() {
//       hoverDataPoint(selectedIndex);
//       tooltipTrigger({
//         chart: chartRef.current as any,
//         data,
//         set: selectedDataSet,
//         index: selectedIndex,
//       });
//       document
//         .getElementById(
//           `${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`
//         )
//         ?.focus();
//     }

//     function resetChartStates() {
//       removeDataPointsHoverStates();
//       const activeElements = chart.tooltip._active;
//       const requestedElem = chart.getDatasetMeta(selectedDataSet).data[
//         selectedIndex
//       ];
//       activeElements.find((v: any, i: number) => {
//         if (requestedElem._index === v._index) {
//           activeElements.splice(i, 1);
//           return true;
//         }
//       });

//       for (let i = 0; i < activeElements.length; i++) {
//         if (requestedElem._index === activeElements[i]._index) {
//           activeElements.splice(i, 1);
//           break;
//         }
//       }
//       // if (siteVariables.theme === ChartTheme.HighContrast) {
//       //   (chartRef.current as any).data.datasets.map(
//       //     (dataset: any, i: number) => {
//       //       dataset.borderColor = siteVariables.colorScheme.default.border;
//       //       dataset.borderWidth = 2;
//       //       dataset.backgroundColor = buildPattern({
//       //         ...chartBarDataPointPatterns(colorScheme)[i],
//       //         backgroundColor: colorScheme.default.background,
//       //         patternColor: colorScheme.brand.background,
//       //       });
//       //     }
//       //   );
//       //   chart.update();
//       // }
//       chart.tooltip._active = activeElements;
//       chart.tooltip.update(true);
//       chart.draw();
//     }

//     function changeFocus(e: KeyboardEvent) {
//       removeDataPointsHoverStates();
//       switch (e.key) {
//         case "ArrowRight":
//           e.preventDefault();
//           selectedIndex = (selectedIndex + 1) % meta().data.length;
//           break;
//         case "ArrowLeft":
//           e.preventDefault();
//           selectedIndex = (selectedIndex || meta().data.length) - 1;
//           break;
//         case "ArrowUp":
//           e.preventDefault();
//           if (data!.datasets!.length > 1) {
//             selectedDataSet += 1;
//             if (selectedDataSet === data!.datasets!.length) {
//               selectedDataSet = 0;
//             }
//           }
//           break;
//         case "ArrowDown":
//           e.preventDefault();
//           if (data!.datasets!.length > 1) {
//             selectedDataSet -= 1;
//             if (selectedDataSet < 0) {
//               selectedDataSet = data!.datasets!.length - 1;
//             }
//           }
//           break;
//       }

//       showFocusedDataPoint();
//     }

//     canvasRef.current.addEventListener("click", removeFocusStyleOnClick);
//     canvasRef.current.addEventListener("keydown", changeFocus);
//     canvasRef.current.addEventListener("focusout", resetChartStates);
//     return () => {
//       if (!chartRef.current) return;
//       if (canvasRef.current) {
//         canvasRef.current.removeEventListener("click", removeFocusStyleOnClick);
//         canvasRef.current.removeEventListener("keydown", changeFocus);
//         canvasRef.current.removeEventListener("focusout", resetChartStates);
//       }
//       chartRef.current.destroy();
//     };
//   }, []);

//   // /**
//   //  * Theme updates
//   //  */
//   // useEffect(() => {
//   //   if (!chartRef.current) return;
//   //   if (!canvasRef.current) return;
//   //   const ctx = canvasRef.current.getContext("2d");
//   //   if (!ctx) return;
//   //   // Apply new colors scheme for data points
//   //   chartRef.current.data.datasets = createDataPoints();
//   //   // Update tooltip colors scheme
//   //   setTooltipColorScheme({
//   //     chart: chartRef.current,
//   //     siteVariables,
//   //     chartDataPointColors,
//   //     patterns: chartBarDataPointPatterns,
//   //   });
//   //   // Update axeses
//   //   axesConfig({ chart: chartRef.current, ctx, colorScheme });

//   //   chartRef.current.update();
//   // }, [theme]);

//   return (
//     <canvas
//       id={chartId}
//       ref={canvasRef}
//       tabIndex={0}
//       style={{
//         userSelect: "none",
//       }}
//       aria-label={title}
//     >
//       {data!.datasets!.map((set, setKey) =>
//         (set.data as number[]).forEach((item: number, itemKey: number) => (
//           // Generated tooltips for screen readers
//           <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
//             <p>{item}</p>
//             <span>
//               {set.label}: {set!.data![itemKey]}
//             </span>
//           </div>
//         ))
//       )}
//     </canvas>
//   );
// }
