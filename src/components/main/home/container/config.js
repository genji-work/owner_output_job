import * as echarts from "echarts";

export const colors = [
  "#F93A4A",
  "#0ABC80",
  "#1677FF",
  "#ff6565",
  "#00B7F4",
  "#4876FF",
  "#ff8f1f",
  "#00BFD0",
  "#5260FF",
  "#FF6010",
  "#c19030",
  "#454955",
  "#FFEEEF",
  "#FFEEEE",
  "#FFECE3",
  "#FFEFDF",
  "#FFF3D9",
  "#D4FFF1",
  "#DDFCFF",
  "#E0F7FF",
  "#E7F1FF",
  "#EBEFFF",
  "#EDEEFF",
  "#F1F1F1"
];

export const WeekMap = {
  Sun: "周日",
  Mon: "周一",
  Tue: "周二",
  Wed: "周三",
  Thu: "周四",
  Fri: "周五",
  Sat: "周六"
};

export const line_config = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {
    data: ["PV", "IP"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: []
};

export const bar_config = {
  title: {},
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  xAxis: {
    data: [],
    axisLabel: {
      textStyle: {
        color: "#999"
      }
    },
    axisTick: {
      show: true
    },
    axisLine: {
      show: true
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: "#999"
      }
    }
  },
  series: [
    {
      type: "bar",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#83bff6" },
          { offset: 0.5, color: "#188df0" },
          { offset: 1, color: "#188df033" }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.7, color: "#2378f7" },
            { offset: 1, color: "#2378f7" }
          ])
        }
      },
      data: []
    }
  ]
};

let i = 0;

export const pie_config = {
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: 10,
    data: []
  },
  series: [
    {
      type: "pie",
      radius: ["50%", "70%"],
      label: {
        normal: {
          show: false,
          position: "center"
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "30",
            fontWeight: "bold"
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: function() {
            return colors[i++];
          },
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      data: []
    }
  ]
};
