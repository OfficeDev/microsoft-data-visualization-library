// import React from "react";
// import { object } from "@storybook/addon-knobs";
// import { Chart } from "../src/charts/Chart";
// import { random } from "../src/lib/utils";
// import { Container } from "./components";
// import { ChartOptions } from "../src/types";

// export default {
//   title: "Charts/Bubble chart",
//   component: Chart,
// };

// const bubbleKnobGroupID = "Bubble chart";

// export const GroupedBubbleChart = () => {
//   const dataVizProps = {
//     title: "Bubble chart sample",
//     type: ChartOptions.Bubble,
//     data: {
//       labels: "Africa",
//       datasets: [
//         {
//           label: "China",
//           data: [
//             {
//               x: 21269017,
//               y: 5.245,
//               r: 25,
//             },
//           ],
//         },
//         {
//           label: "Denmark",
//           data: [
//             {
//               x: 258702,
//               y: 7.526,
//               r: 10,
//             },
//           ],
//         },
//         {
//           label: "Germany",
//           data: [
//             {
//               x: 3979083,
//               y: 6.994,
//               r: 15,
//             },
//           ],
//         },
//         {
//           label: "Japan",
//           data: [
//             {
//               x: 4931877,
//               y: 5.921,
//               r: 40,
//             },
//           ],
//         },
//         {
//           label: "France",
//           data: [
//             {
//               x: 17269017,
//               y: 6.921,
//               r: 20,
//             },
//           ],
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, bubbleKnobGroupID)} />
//     </Container>
//   );
// };

// export const BubbleChart = () => {
//   const dataVizProps = {
//     title: "Bubble chart sample",
//     type: ChartOptions.Bubble,
//     data: {
//       labels: "Africa",
//       datasets: [
//         {
//           label: "China",
//           data: Array.from({ length: 99 }, () => ({
//             x: random(200000, 600000),
//             y: random(50, 150),
//             r: random(5, 7),
//           })),
//         },
//         {
//           label: "USA",
//           data: Array.from({ length: 99 }, () => ({
//             x: random(200000, 600000),
//             y: random(50, 150),
//             r: random(5, 7),
//           })),
//         },
//       ],
//     },
//   };
//   return (
//     <Container>
//       <Chart {...object("Configuration", dataVizProps, bubbleKnobGroupID)} />
//     </Container>
//   );
// };
