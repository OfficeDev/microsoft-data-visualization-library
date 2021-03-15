// import React from "react";
// import { object } from "@storybook/addon-knobs";
// import { Chart } from "../src/charts/Chart";
// import { Container } from "./components";
// import { ChartOptions } from "../src/types";

// export default {
//   title: "Charts/Bar chart",
//   component: Chart,
// };

// const barKnobGroupID = "Bar chart";

// export const BarChart = () => {
//   const dataVizProps = {
//     title: "Bar chart sample",
//     type: ChartOptions.Bar,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Watches",
//           data: [200, 3600, 480, 5049, 4596],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, barKnobGroupID)} />
//     </Container>
//   );
// };

// const stackedBarKnobGroupID = "Stacked bar chart";

// export const StackedBarChart = () => {
//   const dataVizProps = {
//     title: "Stacked bar chart sample",
//     type: ChartOptions.BarStacked,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Laptops",
//           data: [1860, 7700, 4100, 3012, 2930],
//         },
//         {
//           label: "Watches",
//           data: [1200, 3600, 2480, 5049, 4596],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart
//         {...object("Configuration", dataVizProps, stackedBarKnobGroupID)}
//       />
//     </Container>
//   );
// };

// const groupedBarKnobGroupID = "Grouped bar chart";

// export const GroupedBarChart = () => {
//   const dataVizProps = {
//     title: "Grouped bar chart sample",
//     type: ChartOptions.Bar,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Tablets",
//           data: [4860, 6700, 3100, 2012, 1930],
//         },
//         {
//           label: "Phones",
//           data: [4100, 1600, 3180, 3049, 3596],
//         },
//         {
//           label: "Laptops",
//           data: [1860, 7700, 4100, 3012, 2930],
//         },
//         {
//           label: "Watches",
//           data: [1200, 3600, 2480, 5049, 4596],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart
//         {...object("Configuration", dataVizProps, groupedBarKnobGroupID)}
//       />
//     </Container>
//   );
// };

// const horizontalBarKnobGroupID = "Horizontal bar chart";

// export const HorizontalBarChart = () => {
//   const dataVizProps = {
//     title: "Horizontal bar chart sample",
//     type: ChartOptions.BarHorizontal,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Watches",
//           data: [200, 3600, 480, 5049, 4596],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart
//         {...object("Configuration", dataVizProps, horizontalBarKnobGroupID)}
//       />
//     </Container>
//   );
// };

// const horizontalStackedBarKnobGroupID = "Horizontal bar chart";

// export const HorizontalStackedBarChart = () => {
//   const dataVizProps = {
//     title: "Horizontal bar chart sample",
//     type: ChartOptions.BarHorizontalStacked,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Laptops",
//           data: [1860, 7700, 4100, 3012, 2930],
//         },
//         {
//           label: "Watches",
//           data: [1200, 3600, 2480, 5049, 4596],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart
//         {...object(
//           "Configuration",
//           dataVizProps,
//           horizontalStackedBarKnobGroupID
//         )}
//       />
//     </Container>
//   );
// };
