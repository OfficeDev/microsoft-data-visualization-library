// import React from "react";
// import { object } from "@storybook/addon-knobs";
// import { Chart } from "../src/charts/Chart";
// import { Container } from "./components";
// import { ChartOptions } from "../src/types";

// export default {
//   title: "Charts/Doughnut chart",
//   component: Chart,
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
