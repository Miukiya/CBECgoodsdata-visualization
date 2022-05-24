<template>
  <div id="goodsValue">
    <div id="goodsValueChart"></div>
  </div>
</template>
<script>
export default {
  name: "goodsValue",
  data() {
    return {
      // polarData
      polarData: [],
      // 2016
      goodsValue1: [],
      // 2017
      goodsValue2: [],
      // 2018
      goodsValue3: [],
      // 2019
      goodsValue4: [],
      // 2020
      goodsValue5: [],
      // 2021
      goodsValue6: []
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
          this.polarData = res[0];
          this.goodsValue1 = res[1];
          this.goodsValue2 = res[2];
          this.goodsValue3 = res[3];
          this.goodsValue4 = res[4];
          this.goodsValue5 = res[5];
          this.goodsValue6 = res[6];
          let polarData = JSON.parse(JSON.stringify(this.polarData));
          let goods_2016 = JSON.parse(JSON.stringify(this.goodsValue1));
          let goods_2017 = JSON.parse(JSON.stringify(this.goodsValue2));
          let goods_2018 = JSON.parse(JSON.stringify(this.goodsValue3));
          let goods_2019 = JSON.parse(JSON.stringify(this.goodsValue4));
          let goods_2020 = JSON.parse(JSON.stringify(this.goodsValue5));
          let goods_2021 = JSON.parse(JSON.stringify(this.goodsValue6));
          let polarData_sqrt = this.sqrtpolarData(polarData);
          this.$nextTick(() => {
            setTimeout(() => {
              let dom = this.$echarts.getInstanceByDom(
                document.getElementById("goodsValueChart")
              );
              // 图表存在，更新数据
              if (dom !== null) {
                dom.setOption({
                  dataset: [
                    {
                      id: "polar",
                      source: {
                        polarData: polarData_sqrt,
                        year: ["2016", "2017", "2018", "2019", "2020", "2021"]
                      }
                    },
                    {
                      id: "rank_2016",
                      source: {
                        barData: goods_2016.map(a => {
                          return a.value;
                        }),
                        goodsName: goods_2016.map(a => {
                          return a.name;
                        })
                      }
                    },
                    {
                      id: "rank_2017",
                      source: {
                        barData: goods_2017.map(a => {
                          return a.value;
                        }),
                        goodsName: goods_2017.map(a => {
                          return a.name;
                        })
                      }
                    },
                    {
                      id: "rank_2018",
                      source: {
                        barData: goods_2018.map(a => {
                          return a.value;
                        }),
                        goodsName: goods_2018.map(a => {
                          return a.name;
                        })
                      }
                    },
                    {
                      id: "rank_2019",
                      source: {
                        barData: goods_2019.map(a => {
                          return a.value;
                        }),
                        goodsName: goods_2019.map(a => {
                          return a.name;
                        })
                      }
                    },
                    {
                      id: "rank_2020",
                      source: {
                        barData: goods_2020.map(a => {
                          return a.value;
                        }),
                        goodsName: goods_2020.map(a => {
                          return a.name;
                        })
                      }
                    },
                    {
                      id: "rank_2021",
                      source: {
                        barData: goods_2021.map(a => {
                          return a.value;
                        }),
                        goodsName: goods_2021.map(a => {
                          return a.name;
                        })
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
    }
  },
  mounted() {
    this.goodsValueChart(); // 初始化
  },
  methods: {
    // 对总货值开根号，以适应数值差过大
    sqrtpolarData(data) {
      let arr = [];
      data.map(item => {
        let n_sqrt3 = Math.sqrt(Math.sqrt(Math.sqrt(item)));
        arr.push(n_sqrt3);
      });
      return arr;
    },
    goodsValueChart() {
      let goodsValueChart = this.$echarts.init(
        document.getElementById("goodsValueChart")
      );
      let option = {
        title: {
          text: "进\n出\n口\n前\n十\n名\n商\n品",
          left: "24%",
          top: "20%",
          textStyle: {
            color: "whitesmoke",
            fontWeight: "normal"
          }
        },
        tooltip: {
          show: true,
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff"
          },
          formatter: params => {
            let astr = "";
            let value = 0;
            let data = params.data;
            let index = params.componentIndex;
            let name = params.seriesName;
            let color = params.color;
            if (this.polarData.length !== 0) {
              if (index === 0) {
                let year = params.name;
                // 总货值原值
                switch (year) {
                  case "2016":
                    value = this.polarData[0];
                    break;
                  case "2017":
                    value = this.polarData[1];
                    break;
                  case "2018":
                    value = this.polarData[2];
                    break;
                  case "2019":
                    value = this.polarData[3];
                    break;
                  case "2020":
                    value = this.polarData[4];
                    break;
                  case "2021":
                    value = this.polarData[5];
                    break;
                  default:
                    value = undefined;
                }
                astr =
                  "<div style='display:block;height:21px;width:100%;'>" +
                  "<div style='float:left;'>" +
                  data[1] +
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
              } else if (index === 1) {
                color = "#B1E6FF";
                value = data[0];
                name = data[1];
                astr =
                  "<div style='display:block;height:21px;width:100%;'>" +
                  "<div style='display:block;width:21px;height:21px;float:left;'>" +
                  "<i style='width:10px;height:10px;display:inline-block;background:" +
                  color +
                  ";border-radius:10px;'></i>" +
                  "</div>" +
                  "<span style='float:left;'>" +
                  "&nbsp;" +
                  name +
                  "&nbsp;&nbsp;" +
                  value +
                  "</span>" +
                  "<div>";
              }
            }
            let b = "";
            if (index === 0) {
              b = '<div style="width: 200px;">' + astr + "<div>";
            } else if (index === 1) {
              b = '<div style="width: 420px;">' + astr + "<div>";
            }
            return b;
          },
          confine: true // 防止超出dom被遮挡
        },
        legend: {
          width: 100,
          show: true,
          right: "1%",
          top: "3%",
          textStyle: {
            color: "whitesmoke"
          }
        },
        // 极坐标
        polar: {
          z: 2,
          center: ["12%", "54%"], // 极坐标系的圆心坐标：[横坐标, 纵坐标]
          radius: "75%" // 极坐标半径
        },
        angleAxis: {
          type: "category",
          data: ["2016", "2017", "2018", "2019", "2020", "2021"],
          axisLabel: {
            color: "whitesmoke"
          }
        },
        radiusAxis: {
          name: "货值（￥）",
          nameLocation: "end",
          axisLine: {
            lineStyle: {
              color: "whitesmoke"
            }
          },
          axisLabel: {
            show: false,
            formatter: (value, index) => {
              value = value / 10000000 + "kw";
              return value;
            }
          }
        },
        xAxis: {
          axisLabel: {
            color: "whitesmoke"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["rgb(255, 255, 255, 0.2)"]
            }
          }
        },
        yAxis: {
          type: "category",
          axisLabel: {
            color: "whitesmoke", // 字体颜色
            overflow: "truncate", // 字体截断
            width: "70", // 文本显示宽度
            margin: 90, // 距离右侧图形距离
            align: "left",
            formatter: (params, index) => {
              // console.log(index);
              return [`{a${10 - index}|${10 - index}}   ${params}`].join("\n");
            },
            rich: {
              a1: {
                color: "#fff",
                backgroundColor: "red",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a2: {
                color: "#fff",
                backgroundColor: "orange",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a3: {
                color: "#fff",
                backgroundColor: "blue",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a4: {
                color: "#fff",
                backgroundColor: "#708090",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a5: {
                color: "#fff",
                backgroundColor: "#708090",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a6: {
                color: "#fff",
                backgroundColor: "#708090",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a7: {
                color: "#fff",
                backgroundColor: "#708090",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a8: {
                color: "#fff",
                backgroundColor: "#708090",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a9: {
                color: "#fff",
                backgroundColor: "#708090",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              },
              a10: {
                color: "#fff",
                backgroundColor: "#708090",
                width: 15,
                height: 15,
                align: "center",
                borderRadius: 15
              }
            }
          }
        },
        grid: {
          z: 1,
          top: "10%",
          left: "35%",
          right: "15%",
          bottom: "12%"
        },
        dataset: [
          // 极坐标货值
          {
            id: "polar",
            source: {
              polarData: this.polarData,
              year: ["2016", "2017", "2018", "2019", "2020", "2021"]
            }
          },
          // 2016
          {
            id: "rank_2016",
            source: {
              barData: [],
              goodsName: []
            }
          },
          // 2017
          {
            id: "rank_2017",
            source: {
              barData: [],
              goodsName: []
            }
          },
          // 2018
          {
            id: "rank_2018",
            source: {
              barData: [],
              goodsName: []
            }
          },
          // 2019
          {
            id: "rank_2019",
            source: {
              barData: [],
              goodsName: []
            }
          },
          // 2020
          {
            id: "rank_2020",
            source: {
              barData: [],
              goodsName: []
            }
          },
          // 2021
          {
            id: "rank_2021",
            source: {
              barData: [],
              goodsName: []
            }
          }
        ],
        series: [
          // 极坐标
          {
            id: "polar",
            type: "bar",
            coordinateSystem: "polar",
            datasetIndex: 0,
            barWidth: "60%",
            encode: {
              radius: "polarData"
            },
            name: "总货值",
            stack: "a",
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#B1E6FF"
            }
          },
          // 排序
          {
            id: "rank",
            type: "bar",
            datasetIndex: 6,
            encode: {
              x: "barData",
              y: "goodsName"
            },
            label: {
              show: true,
              position: "right",
              formatter: params => {
                return params.value[0] + "￥";
              },
              fontWeight: "bold",
              fontSize: 14,
              color: "#00fac1",
              textShadowBlur: 5,
              textShadowColor: "rgba(255, 255, 255, 0.5)"
            },
            itemStyle: {
              borderRadius: [0, 20, 20, 0],
              color: {
                type: "linear", // 线性渐变
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0.5,
                    color: "rgb(177, 230, 255, 0.9)"
                  },
                  {
                    offset: 1,
                    color: "rgb(63, 172, 229, 0.3)"
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
              right: "1%",
              bottom: "12%",
              style: {
                text: "2021",
                font: "bolder 80px monospace",
                fill: "rgba(100, 100, 100, 0.25)"
              },
              z: 100
            }
          ]
        }
      };
      goodsValueChart.on("click", function(params) {
        if (params.componentType !== "graphic") {
          const year = params.value[1];
          if (year - 1) {
            const datasetIndex = year - 2015;
            goodsValueChart.setOption({
              yAxis: { type: "category" },
              series: {
                id: "rank",
                datasetIndex: datasetIndex
              },
              graphic: {
                elements: [
                  {
                    type: "text",
                    right: "1%",
                    bottom: "12%",
                    style: {
                      text: year,
                      font: "bolder 80px monospace",
                      fill: "rgba(100, 100, 100, 0.25)"
                    },
                    z: 100
                  }
                ]
              }
            });
          }
        }
      });
      goodsValueChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          goodsValueChart.resize();
        };
      }, 200);
    }
  }
};
</script>
<style lang="scss">
#goodsValue {
  #goodsValueChart {
    width: calc(100%);
    height: 257px;
  }
}
</style>
