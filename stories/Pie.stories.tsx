// import React from "react";
// import { object } from "@storybook/addon-knobs";
// import { Chart, ChartOptions } from "../src/charts/Chart";
// import { Container } from "./components";

// export default {
//   title: "Charts/Pie chart",
//   component: Chart,
// };

// const pieKnobGroupID = "Pie chart";

// export const PieChart = () => {
//   const dataVizProps = {
//     title: "Pie chart sample",
//     type: ChartOptions.Pie,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Watches",
//           data: [2004, 1600, 480, 504, 1000],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, pieKnobGroupID)} />
//     </Container>
//   );
// };

// const doughnutKnobGroupID = "Doughnut chart";

// export const DoughnutChart = () => {
//   const dataVizProps = {
//     title: "Doughnut chart sample",
//     type: ChartOptions.Doughnut,
//     data: {
//       labels: ["Jan", "Feb", "March", "April", "May"],
//       datasets: [
//         {
//           label: "Watches",
//           data: [2004, 1600, 480, 504, 1000],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, doughnutKnobGroupID)} />
//     </Container>
//   );
// };
