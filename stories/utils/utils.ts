export const customOptions = {
  defaultColor: "#605E5C",
  layout: {
    padding: {
      left: 0,
      right: 32,
      top: 0,
      bottom: 0,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "#979593",
          maxTicksLimit: 8,
        },
        gridLines: {
          color: "#484644",
          zeroLineColor: "#484644",
        },
        scaleLabel: {
          display: true,
          labelString: "Sales",
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: "#979593",
        },
        gridLines: {
          color: "#484644",
        },
        scaleLabel: {
          display: true,
          labelString: "Product category",
        },
      },
    ],
  },
};
