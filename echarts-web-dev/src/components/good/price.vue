<template>
  <div id="price">
    <dv-border-box-12 class="second-onepart">
      <div id="priceCountry"></div>
    </dv-border-box-12>
    <dv-border-box-12 class="second-secondpart">
      <div id="priceChart"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  name: "price",
  data() {
    return {
      dataset1: [
        // 按进出口模式分类
        // {
        //   source: {
        //     dataLine1: [520, 433, 337, 219, 389, 360], // 直邮境内
        //     dataLine2: [312, 456, 339, 497, 505, 541], // 保税
        //     dataLine3: [377, 450, 518, 309, 290, 264], // 一般出口
        //     dataLine4: [365, 389, 419, 472, 480, 405], // 海外仓
        //     year: ["2016", "2017", "2018", "2019", "2020", "2021"]
        //   }
        // }
      ],
      dataset2: [
        // 按国家统计：该类商品货值前十的进出口国家的商品单价
        // 2016-2021
        {
          source: {
            // 原产国
            countryImp: [],
            // 出口国
            countryExp: [],
            // 原产国单价
            priceImp: [],
            // 出口国单价
            priceExp: []
          }
        },
        // 2016
        {
          source: {
            countryImp: [],
            countryExp: [],
            priceImp: [],
            priceExp: []
          }
        },
        // 2017
        {
          source: {
            countryImp: [],
            countryExp: [],
            priceImp: [],
            priceExp: []
          }
        },
        // 2018
        {
          source: {
            countryImp: [],
            countryExp: [],
            priceImp: [],
            priceExp: []
          }
        },
        // 2019
        {
          source: {
            countryImp: [],
            countryExp: [],
            priceImp: [],
            priceExp: []
          }
        },
        // 2020
        {
          source: {
            countryImp: [],
            countryExp: [],
            priceImp: [],
            priceExp: []
          }
        },
        // 2021
        {
          source: {
            countryImp: [],
            countryExp: [],
            priceImp: [],
            priceExp: []
          }
        }
      ]
    };
  },
  props: {
    modeSource: {
      type: Array,
      default: () => []
    },
    countrySource: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    modeSource: {
      handler(val) {
        let res = JSON.parse(JSON.stringify(val));
        if (res.length !== 0) {
          this.dataset1 = res;
          let data1 = JSON.parse(JSON.stringify(this.dataset1));
          this.$nextTick(() => {
            setTimeout(() => {
              let dom = this.$echarts.getInstanceByDom(
                document.getElementById("priceChart")
              );
              // 图表存在，更新数据
              if (dom !== null) {
                dom.setOption({
                  dataset: data1,
                  series: [
                    {
                      id: "directmail_in",
                      datasetIndex: 0,
                      encode: {
                        x: "year",
                        y: "dataLine1"
                      }
                    },
                    {
                      id: "bonded",
                      datasetIndex: 0,
                      encode: {
                        x: "year",
                        y: "dataLine2"
                      }
                    },
                    {
                      id: "directmail_out",
                      datasetIndex: 0,
                      encode: {
                        x: "year",
                        y: "dataLine3"
                      }
                    },
                    {
                      id: "overseaswarehouses",
                      datasetIndex: 0,
                      encode: {
                        x: "year",
                        y: "dataLine4"
                      }
                    }
                  ]
                });
              }
            }, 100);
          });
        }
      },
      deep: true, // 深度监听
      immediate: true // 初次监听即执行
    },
    countrySource: {
      handler(val) {
        let res = JSON.parse(JSON.stringify(val));
        if (res.length !== 0) {
          this.dataset2 = res;
          let dataset2 = JSON.parse(JSON.stringify(this.dataset2));
          // 获取默认展示最大值
          // let max = this.maxPrice(
          //   dataset2[0].source.priceImp,
          //   dataset2[0].source.priceExp
          // );
          // 获取默认展示x轴值
          let impx = dataset2[0].source.countryImp;
          let expx = dataset2[0].source.countryExp;
          this.$nextTick(() => {
            setTimeout(() => {
              let dom1 = this.$echarts.getInstanceByDom(
                document.getElementById("priceCountry")
              );
              let dom2 = this.$echarts.getInstanceByDom(
                document.getElementById("priceChart")
              );
              // 图表存在，更新数据
              if (dom1 !== null && dom2 !== null) {
                // 更新 country 图表
                dom1.setOption({
                  xAxis: [
                    {
                      id: "impxAxis",
                      data: impx
                    },
                    {
                      id: "expxAxis",
                      data: expx
                    }
                  ],
                  // yAxis: [
                  //   { id: "impyAxis", max: max },
                  //   { id: "expyAxis", max: max }
                  // ],
                  dataset: dataset2,
                  series: [
                    {
                      id: "imp",
                      datasetIndex: 0
                    },
                    {
                      id: "exp",
                      datasetIndex: 0
                    }
                  ]
                });
                let that = this;
                // 添加关联事件
                dom2.on("updateAxisPointer", function(params) {
                  if (params.axesInfo.length > 0) {
                    const datasetIndex = params.dataIndex + 1;
                    const impxAxis = dataset2[datasetIndex].source.countryImp;
                    const expxAxis = dataset2[datasetIndex].source.countryExp;
                    const year = datasetIndex + 2015;
                    // const impyAxis = dataset2[datasetIndex].source.priceImp;
                    // const expyAxis = dataset2[datasetIndex].source.priceExp;
                    // let max_yAxis = that.maxPrice(impyAxis, expyAxis);
                    dom1.setOption({
                      xAxis: [
                        {
                          id: "impxAxis",
                          data: impxAxis
                        },
                        {
                          id: "expxAxis",
                          data: expxAxis
                        }
                      ],
                      // yAxis: [
                      //   { id: "impyAxis", max: max_yAxis },
                      //   { id: "expyAxis", max: max_yAxis }
                      // ],
                      series: [
                        {
                          id: "imp",
                          datasetIndex: datasetIndex
                        },
                        {
                          id: "exp",
                          datasetIndex: datasetIndex
                        }
                      ],
                      graphic: {
                        elements: [
                          {
                            type: "text",
                            left: "center",
                            top: "40%",
                            style: {
                              text: year,
                              font: "bolder 70px monospace",
                              fill: "rgba(100, 100, 100, 0.25)"
                            },
                            z: 100
                          }
                        ]
                      }
                    });
                  } else {
                    dom1.setOption({
                      xAxis: [
                        {
                          id: "impxAxis",
                          data: impx
                        },
                        {
                          id: "expxAxis",
                          data: expx
                        }
                      ],
                      // yAxis: [
                      //   { id: "impyAxis", max: max },
                      //   { id: "expyAxis", max: max }
                      // ],
                      series: [
                        {
                          id: "imp",
                          datasetIndex: 0
                        },
                        {
                          id: "exp",
                          datasetIndex: 0
                        }
                      ],
                      graphic: {
                        elements: [
                          {
                            type: "text",
                            left: "center",
                            top: "40%",
                            style: {
                              text: "2016~2021",
                              font: "bolder 70px monospace",
                              fill: "rgba(100, 100, 100, 0.25)"
                            },
                            z: 100
                          }
                        ]
                      }
                    });
                  }
                });
              }
            }, 100);
          });
        }
      },
      deep: true, // 深度监听
      immediate: true // 初次监听即执行
    }
  },
  mounted() {
    this.price(); // 初始化
  },
  methods: {
    // 最大值
    // maxPrice(arr1, arr2) {
    //   let max1 = Math.max(...arr1);
    //   let max2 = Math.max(...arr2);
    //   let maxprice = Math.max(max1, max2);
    //   let max = Math.ceil(maxprice);
    //   if (max <= 100) {
    //     return 100 * 2;
    //   } else if (max > 100) {
    //     let int = Math.trunc(max / 100);
    //     let num = Math.round(max % 100);
    //     if (num == 0) {
    //       return int * 100 * 2;
    //     } else if (num > 0) {
    //       return (int + 1) * 100 * 2;
    //     }
    //   }
    // },
    price() {
      let priceChart = this.$echarts.init(
        document.getElementById("priceChart")
      );
      let priceCountry = this.$echarts.init(
        document.getElementById("priceCountry")
      );
      // 进出口模式商品单价
      let option1 = {
        title: {
          text: "进出口商品单价",
          left: "center",
          top: "3%",
          textStyle: {
            color: "whitesmoke",
            fontSize: "14px",
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
            align: "left"
          },
          axisPointer: {
            show: false
          }
        },
        legend: [
          {
            data: ["直邮境内", "保税"],
            right: "2%",
            bottom: "5%",
            textStyle: {
              color: "whitesmoke"
            }
          },
          {
            data: ["一般出口", "海外仓"],
            right: "2%",
            top: "5%",
            textStyle: {
              color: "whitesmoke"
            }
          }
        ],
        axisPointer: {
          link: [
            {
              xAxisIndex: "all"
            }
          ]
        },
        grid: [
          {
            top: "16%",
            left: "7%",
            right: "5%",
            height: "30%"
          },
          {
            top: "54%",
            left: "7%",
            right: "5%",
            height: "30%"
          }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: true },
            data: ["2016", "2017", "2018", "2019", "2020", "2021"],
            axisLabel: {
              color: "whitesmoke"
              // interval: 11 // x轴数据显示设置；0：则显示所有的；11：隔五个显示一个
            }
          },
          {
            gridIndex: 1,
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: true },
            data: ["2016", "2017", "2018", "2019", "2020", "2021"],
            axisLabel: {
              color: "whitesmoke"
              // interval: 11
            },
            position: "top"
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            name: "出口商品",
            type: "value",
            nameTextStyle: {
              color: "whitesmoke"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgb(255, 255, 255, 0.2)"]
              }
            },
            axisTick: {
              //y轴刻度线
              show: true
            },
            axisLine: {
              // y轴线
              show: true
            },
            axisLabel: {
              color: "whitesmoke"
            }
          },
          {
            gridIndex: 1,
            name: "进口商品",
            type: "value",
            inverse: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgb(255, 255, 255, 0.2)"]
              }
            },
            nameTextStyle: {
              color: "whitesmoke"
            },
            axisTick: {
              //y轴刻度线
              show: true
            },
            axisLine: {
              // y轴线
              show: true
            },
            axisLabel: {
              color: "whitesmoke"
            }
          }
        ],
        dataset: this.dataset1,
        series: [
          // 进口商品折线
          {
            id: "directmail_in",
            name: "直邮境内",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            lineStyle: {
              width: 1.5
            },
            itemStyle: {
              color: "rgb(237, 157, 70)"
            },
            areaStyle: {
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(237, 157, 70, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(237, 157, 70, 0)"
                  }
                ],
                global: false
              },
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          {
            id: "bonded",
            name: "保税",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            lineStyle: {
              width: 1.5
            },
            itemStyle: {
              color: "rgb(255, 105, 103)"
            },
            areaStyle: {
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(255, 105, 103, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(255, 105, 103, 0)"
                  }
                ],
                global: false
              },
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          // 出口商品折线
          {
            id: "directmail_out",
            name: "一般出口",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
              width: 1.5
            },
            itemStyle: {
              color: "rgb(0, 224, 255)"
            },
            areaStyle: {
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(0, 224, 255, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(0, 224, 255, 0)"
                  }
                ],
                global: false
              },
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          {
            id: "overseaswarehouses",
            name: "海外仓",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
              width: 1.5
            },
            itemStyle: {
              color: "rgb(146, 220, 103)"
            },
            areaStyle: {
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(146, 220, 103, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(146, 220, 103, 0)"
                  }
                ],
                global: false
              },
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          }
        ]
      };
      // 进出口国商品单价
      let option2 = {
        tooltip: {
          show: true,
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
            align: "left"
          }
        },
        legend: [
          {
            data: ["原产国/地区"],
            left: "center",
            bottom: "3%",
            textStyle: { color: "whitesmoke" },
            itemStyle: {
              color: "#EE9A04"
            }
          },
          {
            data: ["出口国/地区"],
            left: "center",
            top: "3%",
            textStyle: { color: "whitesmoke" },
            itemStyle: {
              color: "#D1F5E0"
            }
          }
        ],
        grid: {
          top: "10%",
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            id: "impxAxis",
            type: "category",
            data: this.dataset2[0].source.countryImp,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              color: "whitesmoke",
              interval: 0,
              fontSize: 13,
              // margin: 25,     // 与坐标轴距离
              // rotate: -45,     // 斜度
              formatter: value => {
                const str = value.split("");
                return str.join("\n");
              }
            }
          },
          {
            id: "expxAxis",
            type: "category",
            data: this.dataset2[0].source.countryExp,
            inverse: true, // 反向坐标轴
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              color: "whitesmoke",
              interval: 0,
              fontSize: 13,
              // margin: 25,
              // rotate: -45,
              formatter: value => {
                const str = value.split("");
                return str.join("\n");
              }
            }
          }
        ],
        yAxis: [
          {
            id: "impyAxis",
            type: "log",
            logBase: 10,
            max: 10000000,
            min: 1,
            name: "原产国/地区商品单价(￥)",
            nameLocation: "center",
            nameGap: 60,
            nameTextStyle: {
              color: "whitesmoke",
              fontSize: "15px"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgb(255, 255, 255, 0.2)"]
              }
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: "whitesmoke"
            }
          },
          {
            id: "expyAxis",
            type: "log",
            logBase: 10,
            max: 10000000,
            min: 1,
            inverse: true, // 反向坐标轴
            name: "出口国/地区商品单价(￥)",
            nameLocation: "center",
            nameRotate: -90,
            nameGap: 60,
            nameTextStyle: {
              color: "whitesmoke",
              fontSize: "15px"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgb(255, 255, 255, 0.2)"]
              }
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: "whitesmoke"
            }
          }
        ],
        dataset: this.dataset2,
        series: [
          {
            id: "imp",
            name: "原产国/地区",
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: "40%",
            encode: {
              x: "countryImp",
              y: "priceImp"
            },
            label: {
              show: true,
              position: "top",
              fontSize: 10,
              color: "#FF6967",
              textShadowBlur: 5,
              textShadowColor: "rgba(255, 255, 255, 0.5)"
            },
            itemStyle: {
              borderRadius: [20, 20, 0, 0],
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(238, 154, 4, 0.8)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(223, 87, 87, 0.3)"
                  }
                ]
              }
            }
          },
          {
            id: "exp",
            name: "出口国/地区",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            barWidth: "40%",
            encode: {
              x: "countryExp",
              y: "priceExp"
            },
            label: {
              show: true,
              position: "bottom",
              fontSize: 10,
              color: "#00F4FF",
              textShadowBlur: 5,
              textShadowColor: "rgba(255, 255, 255, 0.5)"
            },
            itemStyle: {
              borderRadius: [0, 0, 20, 20],
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.8,
                    color: "rgb(209, 245, 224, 0.8)"
                  },
                  {
                    offset: 0,
                    color: "rgb(2, 104, 122, 0.3)"
                  }
                ]
              }
            }
          }
        ],
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "40%",
              style: {
                text: "2016~2021",
                font: "bolder 70px monospace",
                fill: "rgba(100, 100, 100, 0.25)"
              },
              z: 100
            }
          ]
        }
      };
      priceChart.setOption(option1);
      setTimeout(function() {
        window.onresize = function() {
          priceChart.resize();
        };
      }, 200);
      priceCountry.setOption(option2);
      setTimeout(function() {
        window.onresize = function() {
          priceCountry.resize();
        };
      }, 200);
    }
  }
};
</script>
<style lang="scss">
#price {
  #priceCountry {
    width: 600px;
    height: 588px;
  }
  #priceChart {
    width: 600px;
    height: 346px;
  }
}
</style>
