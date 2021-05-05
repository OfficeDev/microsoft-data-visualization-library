import React from "react";
import { Chart } from "../src/chart";
import { IChart, IChartData, IChartDataSet, Point } from "../src/types";
import {
  LineChart,
  LineChartHighContrast,
  TrendLineChart,
  TrendLineChartHighContrast,
} from "../src/lib/builder";
import {
  DarkContainer,
  HighContrastContainer,
  TrendLineContainer,
  TrendLineDarkContainer,
  TrendLineHighContrastContainer,
} from "./components";
import { customOptions } from "./utils";
import { usNumberFormat } from "../src/lib/utils";

export default {
  title: "Charts/TrendLine",
  component: Chart,
  // parameters: {
  //   docs: {
  //     source: {
  //       code: "Some custom string here",
  //     },
  //   },
  // },
};

const datasetsTablets: IChartDataSet = {
  label: "Tablets",
  data: [860, 700, 910, 1201, 1300, 1530, 1490, 1400, 1600, 1550],
  color: "#6264A7",
};
const datasetsPhones: IChartDataSet = {
  label: "Phones",
  data: [1860, 1700, 1910, 1201, 1300, 1130, 990, 1050, 960, 950],
  color: "rgb(192,57,77)",
};
export const Default = () => {
  const configTablets: IChart = new TrendLineChart({
    areaLabel: "Trend line chart sample",
    data: {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      datasets: [datasetsTablets],
    },
  });
  const configPhones: IChart = new TrendLineChart({
    areaLabel: "Trend line chart sample",
    data: {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      datasets: [datasetsPhones],
    },
  });
  return (
    <TrendLineContainer>
      <h2>Sales trends</h2>
      <TrendLineWidgetRow dataset={datasetsTablets}>
        <Chart canvasProps={{ style: { height: "60px" } }} {...configTablets} />
      </TrendLineWidgetRow>
      <TrendLineWidgetRow dataset={datasetsPhones}>
        <Chart canvasProps={{ style: { height: "60px" } }} {...configPhones} />
      </TrendLineWidgetRow>
    </TrendLineContainer>
  );
};

const datasetsTabletsHC = {
  label: "Tablets",
  data: [860, 700, 910, 1201, 1300, 1530, 1490, 1400, 1600, 1550],
  borderDash: [],
  pointStyle: Point.Circle,
};
const datasetsPhonesHC = {
  label: "Phones",
  data: [1860, 1700, 1910, 1201, 1300, 1130, 990, 1050, 960, 950],
  borderDash: [],
  pointStyle: Point.Circle,
};

export const HighContrast = () => {
  const configTablets: IChart = new TrendLineChartHighContrast({
    areaLabel: "Trend line chart sample",
    data: {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      datasets: [datasetsTabletsHC],
    },
  });
  const configPhones: IChart = new TrendLineChartHighContrast({
    areaLabel: "Trend line chart sample",
    data: {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      datasets: [datasetsPhonesHC],
    },
  });
  return (
    <TrendLineHighContrastContainer>
      <h2>Sales trends</h2>
      <TrendLineWidgetRow dataset={datasetsTablets}>
        <Chart canvasProps={{ style: { height: "60px" } }} {...configTablets} />
      </TrendLineWidgetRow>
      <TrendLineWidgetRow dataset={datasetsPhones}>
        <Chart canvasProps={{ style: { height: "60px" } }} {...configPhones} />
      </TrendLineWidgetRow>
    </TrendLineHighContrastContainer>
  );
};

const datasetsTabletsCustom: IChartDataSet = {
  label: "Tablets",
  data: [860, 700, 910, 1201, 1300, 1530, 1490, 1400, 1600, 1550],
  color: "rgb(255, 99, 132)",
};
const datasetsPhonesCustom: IChartDataSet = {
  label: "Phones",
  data: [1860, 1700, 1910, 1201, 1300, 1130, 990, 1050, 960, 950],
  color: "rgb(255, 159, 64)",
};

export const CustomTheme = () => {
  const configTablets: IChart = new TrendLineChart({
    areaLabel: "Trend line chart sample",
    data: {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      datasets: [datasetsTabletsCustom],
    },
  });
  const configPhones: IChart = new TrendLineChart({
    areaLabel: "Trend line chart sample",
    data: {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      datasets: [datasetsPhonesCustom],
    },
  });
  return (
    <TrendLineDarkContainer>
      <h2>Sales trends</h2>
      <TrendLineWidgetRow dataset={datasetsTablets}>
        <Chart canvasProps={{ style: { height: "60px" } }} {...configTablets} />
      </TrendLineWidgetRow>
      <TrendLineWidgetRow dataset={datasetsPhones}>
        <Chart canvasProps={{ style: { height: "60px" } }} {...configPhones} />
      </TrendLineWidgetRow>
    </TrendLineDarkContainer>
  );
};

const TrendLineWidgetRow = ({ dataset, ...props }) => {
  return (
    <div style={{ display: "flex" }}>
      {props.children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto 0 auto 12px",
          width: "62px",
        }}
      >
        <span style={{ fontWeight: 200, fontSize: 24 }}>
          {usNumberFormat(dataset.data[dataset.data.length - 1] as number)}
        </span>
        <span style={{ fontSize: 10, opacity: "0.6" }}>{dataset.label}</span>
      </div>
    </div>
  );
};
