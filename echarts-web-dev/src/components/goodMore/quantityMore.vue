<template>
  <div id="quantity">
    <div id="quantityMoreChart"></div>
  </div>
</template>
<script>
export default {
  name: "quantity",
  data() {
    return {
      quantityData: []
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data: {
      handler(val) {
        let res = JSON.parse(JSON.stringify(val));
        if (res.length !== 0) {
          this.quantityData = res;
          let quantityData = JSON.parse(JSON.stringify(this.quantityData));
          this.$nextTick(() => {
            setTimeout(() => {
              let dom = this.$echarts.getInstanceByDom(
                document.getElementById("quantityMoreChart")
              );
              let data = this.rate(quantityData);
              // 图表存在，更新数据
              if (dom !== null) {
                dom.setOption({
                  series: [
                    {
                      id: "quantityBar",
                      data: quantityData
                    },
                    {
                      id: "quantityRate",
                      data: this.logData(data)
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
    }
  },
  created() {},
  mounted() {
    this.totalQuantityChart(); // 初始化
  },
  methods: {
    // 增长率实际rate值
    rate(arrData) {
      let increaseRate = [0];
      for (let i = 0; i < arrData.length - 1; i++) {
        if (arrData[i] == undefined) {
          if (arrData[i + 1] == undefined) {
            increaseRate.push(0);
          } else if (arrData[i + 1] > 0) {
            increaseRate.push(100);
          }
        } else {
          let rate = ((arrData[i + 1] - arrData[i]) / arrData[i]) * 100;
          increaseRate.push(rate);
        }
      }
      return increaseRate;
    },
    logData(data) {
      let arr = data;
      if (arr.length !== 0) {
        // 将0处理成1，将负数处理成10^(x)，以适应对数轴
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === 0) {
            arr[i] = 1;
          } else if (arr[i] < 0) {
            arr[i] = Math.pow(10, arr[i] / 50);
          } else if (arr[i] > 100000) {
            arr[i] = 100000;
          }
        }
      }
      return arr;
    },
    totalQuantityChart() {
      // 基于准备好的dom，初始化echarts实例
      let quantityMoreChart = this.$echarts.init(
        document.getElementById("quantityMoreChart")
      );
      //  绘制图标配置
      let option = {
        title: {
          text: "2016-2021年通关商品总数量及增长率",
          left: "center",
          bottom: "3%",
          textStyle: {
            color: "whitesmoke",
            fontSize: "13px"
          }
        },
        legend: [
          {
            data: ["商品总数量"],
            left: "50%",
            top: "5%",
            textStyle: {
              color: "whitesmoke"
            },
            itemStyle: {
              color: "#FF313D"
            }
          },
          {
            data: ["增长率"],
            right: "50%",
            top: "5%",
            textStyle: {
              color: "whitesmoke"
            },
            itemStyle: {
              color: "#00F6FF"
            }
          }
        ],
        tooltip: {
          show: true,
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff"
          },
          formatter: params => {
            let value = 0;
            let data = params.data;
            let type = params.componentSubType;
            let name = params.seriesName;
            let color = params.color;
            let year = params.name;
            if (type === "line" && data === 1) {
              value = value.toFixed(2) + "%";
            } else if (type === "line" && data < 1) {
              // 恢复原增长率
              let rateOriginal = Math.log10(data) * 50;
              value = rateOriginal.toFixed(2) + "%";
            } else if (type === "line" && data > 1) {
              value = data.toFixed(2) + "%";
            } else if (type === "bar") {
              // 柱状图 颜色设置
              color = "#FF313D";
              value = data.toFixed(2);
            }
            let astr =
              "<div style='display:block;height:21px;width:100%;'>" +
              "<div style='float:left;'>" +
              year +
              "</div>" +
              "<span style='float:right;'>" +
              "&nbsp;" +
              name +
              "&nbsp;&nbsp;" +
              value +
              "</span>" +
              "<div style='display:block;width:21px;height:21px;float:right;'>" +
              "<i style='width:10px;height:10px;display:inline-block;background:" +
              color +
              ";border-radius:10px;'></i>" +
              "</div>" +
              "<div>";
            let b = "";
            if (type === "line") {
              b = '<div style="width: 200px;">' + astr + "<div>";
            } else if (type === "bar") {
              b = '<div style="width: 250px;">' + astr + "<div>";
            }
            return b;
          }
        },
        xAxis: {
          type: "category",
          data: ["2016", "2017", "2018", "2019", "2020", "2021"],
          axisLabel: {
            color: "whitesmoke"
          }
        },
        yAxis: [
          {
            id: "quantityBar",
            type: "log",
            max: 100000000,
            min: 1,
            logBase: 10,
            name: "商品总数量（件）",
            nameTextStyle: {
              color: "whitesmoke"
            },
            axisLabel: {
              color: "whitesmoke",
              formatter: (value, index) => {
                value = value === 1 ? 0 : value;
                if (value < 1000) {
                  return value;
                } else if (value >= 1000 && value < 10000) {
                  value = value / 1000 + "k";
                  return value;
                } else if (value >= 10000 && value < 10000000) {
                  value = value / 10000 + "w";
                  return value;
                } else if (value >= 10000000) {
                  value = value / 10000000 + "kw";
                  return value;
                }
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgb(255, 255, 255, 0.2)"]
              }
            }
          },
          {
            id: "quantityRate",
            type: "log",
            max: 100000,
            min: 0.001,
            logBase: 10,
            name: "增长率",
            nameTextStyle: {
              color: "whitesmoke"
            },
            axisLabel: {
              color: "whitesmoke",
              formatter: (value, index) => {
                value = value === 1 ? 0 : value;
                if (value < 1 && value !== 0) {
                  // 负增长率
                  let num = Math.log10(value);
                  switch (num) {
                    case -1:
                      value = -50 + "%";
                      break;
                    case -2:
                      value = -100 + "%";
                      break;
                    case -3:
                      value = -1 + "k%";
                      break;
                  }
                } else if (value == 0 || (value > 1 && value < 1000)) {
                  // 正增长率
                  value = value + "%";
                } else if (value >= 1000 && value < 10000) {
                  value = value / 1000 + "k%";
                } else if (value >= 10000) {
                  value = value / 10000 + "w%";
                }
                return value;
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgb(255, 255, 255, 0.2)"]
              }
            }
          }
        ],
        grid: {
          top: "21%",
          bottom: "21%",
          left: "12%",
          right: "12%"
        },
        series: [
          {
            id: "quantityBar",
            name: "商品总数量",
            data: this.quantityData,
            type: "bar",
            barWidth: "20%",
            label: {
              show: true,
              formatter: params => {
                let value = params.data;
                if (value >= 10000000) {
                  value = (value / 10000000).toFixed(1) + "kw";
                } else if (value >= 10000 && value < 10000000) {
                  value = (value / 10000).toFixed(1) + "w";
                } else if (value >= 1000 && value < 10000) {
                  value = (value / 1000).toFixed(1) + "k";
                }
                return value;
              },
              position: "top",
              color: "#fbffa9",
              fontSize: 12,
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
                    offset: 0.3,
                    color: "rgb(255, 49, 61, 0.8)"
                  },
                  {
                    offset: 1,
                    color: "rgb(76, 103, 235, 0.3)"
                  }
                ]
              }
            }
          },
          {
            id: "quantityRate",
            name: "增长率",
            data: [],
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: "#00F6FF"
            },
            lineStyle: {
              width: 1.5
            },
            label: {
              position: "top"
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
                    color: "rgb(0,246,255,0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(0,246,255, 0)"
                  }
                ],
                global: false
              },
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            },
            markLine: {
              data: [
                {
                  name: "正负增长分界",
                  // 对数轴 y = 1就是 0 正负增长分界线
                  yAxis: 1
                }
              ],
              label: {
                show: false
              },
              lineStyle: {
                color: "#fcff79"
              },
              silent: true
            },
            smooth: true
          }
        ]
      };
      // 窗口大小自适应方案
      quantityMoreChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          quantityMoreChart.resize();
        };
      }, 150);
    }
  }
};
</script>
<style lang="scss">
#quantity {
  #quantityMoreChart {
    width: 667px;
    height: 317px;
  }
}
</style>
