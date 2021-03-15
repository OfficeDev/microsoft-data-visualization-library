// import React from "react";
// import { object } from "@storybook/addon-knobs";
// import { Chart, ChartOptions } from "../src/charts/Chart";
// import { Container } from "./components";

// export default {
//   title: "Charts/States",
//   component: Chart,
// };

// const noDataKnobGroupID = "Chart empty state";

// export const NoDataState = () => {
//   const dataVizProps = {
//     title: "Chart no data",
//     type: ChartOptions.LineStacked,
//     data: {
//       labels: [],
//       datasets: [],
//     },
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, noDataKnobGroupID)} />
//     </Container>
//   );
// };

// const errorKnobGroupID = "Chart error state";
// export const ErrorState = () => {
//   const dataVizProps = {
//     title: "Error",
//     type: ChartOptions.LineStacked,
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, errorKnobGroupID)} />
//     </Container>
//   );
// };
