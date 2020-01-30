import * as echarts from "echarts";

export const line_config = {
  title: {
    text: "堆叠区域图"
  },
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
    data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
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
  series: [
    {
      name: "邮件营销",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "联盟广告",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "视频广告",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: "直接访问",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: "搜索引擎",
      type: "line",
      stack: "总量",
      label: {
        normal: {
          show: true,
          position: "top"
        }
      },
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

var dataAxis = [
  "点",
  "击",
  "柱",
  "子",
  "或",
  "者",
  "两",
  "指",
  "在",
  "触",
  "屏",
  "上",
  "滑",
  "动",
  "能",
  "够",
  "自",
  "动",
  "缩",
  "放"
];
var data = [
  220,
  182,
  191,
  234,
  290,
  330,
  310,
  123,
  442,
  321,
  90,
  149,
  210,
  122,
  133,
  334,
  198,
  123,
  125,
  220
];
var yMax = 500;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}

export const bar_config = {
  title: {},
  xAxis: {
    data: dataAxis,
    axisLabel: {
      textStyle: {
        color: "#fff"
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
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
  dataZoom: [
    {
      type: "inside"
    }
  ],
  series: [
    {
      // For shadow
      type: "bar",
      itemStyle: {
        color: "rgba(0,0,0,0.0)"
      },
      barGap: "-100%",
      barCategoryGap: "40%",
      data: dataShadow,
      animation: false
    },
    {
      type: "bar",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#188df0" },
          { offset: 0.5, color: "#188df0" },
          { offset: 1, color: "#83bff6" }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#2378f7" },
            { offset: 0.7, color: "#2378f7" },
            { offset: 1, color: "#83bff6" }
          ])
        }
      },
      data: data
    }
  ]
};

export const pie_config = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: 10,
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
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
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ]
    }
  ]
};
