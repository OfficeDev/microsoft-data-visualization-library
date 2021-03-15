// import React, { useEffect } from "react";
// import Chart from "chart.js";
// import { tooltipTrigger, chartConfig } from "../../lib/utils";

// export const BubbleChart = ({
//   title,
//   data,
// }: {
//   title: string;
//   data: Chart.ChartData;
// }) => {
//   const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
//   const chartRef = React.useRef<Chart | undefined>();
//   const chartId = React.useMemo(
//     () => Math.random().toString(36).substr(2, 9),
//     []
//   );

//   // Sort for kayboard access
//   data!.datasets!.map((dataset) => {
//     dataset!.data!.sort((a: any, b: any) => a.x - b.x);
//   });

//   // const createDataPoints = (): Chart.ChartDataSets[] =>
//   //   Array.from(data.datasets, (set, i) => {
//   //     let dataPointConfig = {
//   //       label: set.label,
//   //       data: set.data,
//   //       borderWidth: 0,
//   //       borderSkipped: false,
//   //       borderColor: colorScheme.default.background,
//   //       hoverBorderColor: chartDataPointColors[i],
//   //       backgroundColor: chartDataPointColors[i],
//   //       hoverBorderWidth: 0,
//   //       hoverBackgroundColor: chartDataPointColors[i],
//   //       pointBorderColor: colorScheme.default.background,
//   //       pointBackgroundColor: colorScheme.default.foreground3,
//   //       pointHoverBackgroundColor: colorScheme.default.foreground3,
//   //       pointHoverBorderColor: chartDataPointColors[i],
//   //       pointHoverBorderWidth: 0,
//   //       borderCapStyle: "round",
//   //       borderJoinStyle: "round",
//   //       pointBorderWidth: 0,
//   //       pointRadius: 0,
//   //       pointHoverRadius: 0,
//   //     };
//   //     if (theme === ChartTheme.HighContrast) {
//   //       dataPointConfig = {
//   //         ...dataPointConfig,
//   //         borderWidth: 1,
//   //         hoverBorderColor: colorScheme.default.borderHover,
//   //         hoverBorderWidth: 3,
//   //         pointBorderColor: colorScheme.default.border,
//   //         pointHoverBorderColor: colorScheme.default.borderHover,
//   //         pointHoverRadius: 0,
//   //         borderColor: colorScheme.brand.background,
//   //         backgroundColor: buildPattern({
//   //           ...chartBubbleDataPointPatterns(colorScheme)[i],
//   //           backgroundColor: colorScheme.default.background,
//   //           patternColor: colorScheme.brand.background,
//   //         }),
//   //         hoverBackgroundColor: buildPattern({
//   //           ...chartBubbleDataPointPatterns(colorScheme)[i],
//   //           backgroundColor: colorScheme.default.background,
//   //           patternColor: colorScheme.default.borderHover,
//   //         }),
//   //       };
//   //     }
//   //     return dataPointConfig as any;
//   //   });

//   useEffect(() => {
//     let selectedIndex = -1;
//     let selectedDataSet = 0;

//     if (!canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;
//     const config: any = chartConfig({ type: "bubble" });
//     config.options.hover.mode = "nearest";

//     chartRef.current = new Chart(ctx, {
//       ...(config as any),
//       data: {
//         labels: data.labels,
//         datasets: [],
//       },
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
//         // siteVariables,
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
//       //         ...chartBubbleDataPointPatterns(colorScheme)[i],
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
//         case "ArrowDown":
//           e.preventDefault();
//           if (data!.datasets!.length > 1) {
//             // Get all values for the current data point
//             const values = data!.datasets!.map(
//               (dataset) => dataset!.data![selectedIndex]
//             );
//             // Sort an array to define next available number
//             const sorted = [
//               ...(Array.from(new Set(values)) as Chart.ChartPoint[]),
//               // TODO: Works just with numbers, apply solution for string | Date | Moment
//             ].sort(
//               (a: Chart.ChartPoint, b: Chart.ChartPoint) =>
//                 Number(a.y) - Number(b.y)
//             );
//             let nextValue =
//               sorted[
//                 sorted.findIndex((v) => v === values[selectedDataSet]) +
//                   (e.key === "ArrowUp" ? 1 : -1)
//               ];

//             // Find dataset ID by the next higher number after current
//             let nextDataSet = values.findIndex((v) => v === nextValue);

//             // If there is no next number that could selected, get number from oposite side
//             if (nextDataSet < 0) {
//               nextDataSet = values.findIndex(
//                 (v) =>
//                   v ===
//                   sorted[e.key === "ArrowUp" ? 0 : data!.datasets!.length - 1]
//               );
//             }
//             selectedDataSet = nextDataSet;
//             selectedIndex = selectedIndex % meta().data.length;
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

//   return (
//     // <ChartContainer
//     //   siteVariables={siteVariables}
//     //   data={data}
//     //   chartDataPointColors={chartDataPointColors}
//     //   patterns={chartBubbleDataPointPatterns}
//     //   onLegendClick={onLegendClick}
//     // >
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
//         (set.data as Chart.ChartPoint[]).forEach(
//           (item: Chart.ChartPoint, itemKey: number) => (
//             // Generated tooltips for screen readers
//             <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
//               <p>{item.x}</p>
//               <span>
//                 {set.label}: {(set.data as Chart.ChartPoint[])[itemKey].y}
//               </span>
//             </div>
//           )
//         )
//       )}
//     </canvas>
//     // </ChartContainer>
//   );
// };
