<template>
  <div id="age-gender">
    <div id="ageGenderChart"></div>
  </div>
</template>
<script>
export default {
  name: "ageGender",
  data() {
    return {
      maleData: [], // 男性各年龄段人数
      femaleData: [], // 女性各年龄段人数
      totalData: [], // 各年龄段总人数
      maleTotal: 0, // 男性总人数
      femaleTotal: 0, // 女性总人数
      colorList: ["#cfb2a9", "#d53a35"]
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
          this.maleData = res[0].male;
          this.femaleData = res[1].female;
          let maleData = JSON.parse(JSON.stringify(this.maleData));
          let femaleData = JSON.parse(JSON.stringify(this.femaleData));
          maleData.forEach(item => {
            this.maleTotal += item;
          });
          femaleData.forEach(item => {
            this.femaleTotal += item;
          });
          for (let i = 0; i < maleData.length; i++) {
            this.totalData[i] = maleData[i] + femaleData[i];
          }
          let totalData = JSON.parse(JSON.stringify(this.totalData));
          this.$nextTick(() => {
            setTimeout(() => {
              let dom = this.$echarts.getInstanceByDom(
                document.getElementById("ageGenderChart")
              );
              // 图表存在，更新数据
              if (dom !== null) {
                dom.setOption({
                  series: [
                    {
                      id: "totalBar",
                      data: totalData
                    },
                    {
                      id: "maleBar",
                      data: maleData
                    },
                    {
                      id: "femaleBar",
                      data: femaleData
                    },
                    {
                      id: "pie",
                      data: [
                        { name: "Male", value: this.maleTotal },
                        { name: "Female", value: this.femaleTotal }
                      ]
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
    this.ageGenderChart(); // 年龄性别分布
  },
  methods: {
    ageGenderChart() {
      let ageGenderChart = this.$echarts.init(
        document.getElementById("ageGenderChart")
      );
      let option = {
        title: {
          text: "消费者年龄性别分布图",
          left: "center",
          top: "5%",
          textStyle: {
            color: "whitesmoke",
            fontSize: "15px"
          }
        },
        grid: {
          left: "12%",
          right: "5%",
          top: "24%",
          bottom: "18%"
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderColor: "#344170",
          textStyle: {
            color: "#fff",
            align: "left"
          },
          axisPointer: {
            // type: "cross",
            // label: {
            //   backgroundColor: "#283b56"
            // }
            show: false
          }
        },
        legend: [
          {
            top: "8%",
            left: "6%",
            data: ["消费者总数量"],
            textStyle: {
              color: "whitesmoke",
              fontSize: "12px"
            },
            itemStyle: {
              color: "#5cc0ff"
            }
          },
          {
            bottom: "4%",
            left: "6%",
            data: ["男消费者数量"],
            textStyle: {
              color: "whitesmoke",
              fontSize: "12px"
            },
            itemStyle: {
              color: "#ffd08b"
            }
          },
          {
            bottom: "4%",
            left: "25%",
            data: ["女消费者数量"],
            textStyle: {
              color: "whitesmoke",
              fontSize: "12px"
            },
            itemStyle: {
              color: "#4ad7a0"
            }
          },
          {
            top: "8%",
            right: "20%",
            data: ["Male"],
            textStyle: {
              color: "whitesmoke",
              fontSize: "12px"
            },
            itemStyle: {
              color: "#cfb2a9"
            }
          },
          {
            top: "8%",
            right: "6%",
            data: ["Female"],
            textStyle: {
              color: "whitesmoke",
              fontSize: "12px"
            },
            itemStyle: {
              color: "#d53a35"
            }
          }
        ],
        xAxis: {
          type: "category",
          data: [
            "18岁以下",
            "18-30岁",
            "31-45岁",
            "46-55岁",
            "56-70岁",
            "70岁以上"
          ],
          axisLabel: {
            color: "whitesmoke"
          }
        },
        yAxis: {
          type: "log",
          min: 250,
          logBase: 10,
          name: "Number",
          nameTextStyle: {
            color: "whitesmoke"
          },
          axisLabel: {
            color: "whitesmoke",
            formatter: (value, index) => {
              if (value >= 10000) {
                value = value / 10000 + "万人";
                return value;
              } else if (value < 10000 && value >= 1000) {
                value = value / 1000 + "k人";
                return value;
              } else if (value < 1000) {
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
        series: [
          {
            id: "totalBar",
            name: "消费者总数量", // 柱状图
            type: "bar",
            barWidth: "20%",
            data: this.totalData,
            emphasis: {
              focus: "series",
              blurScope: "coordinateSystem"
            },
            label: {
              show: true,
              formatter: params => {
                let value = params.data;
                if (value >= 10000) {
                  value = Math.round(value / 10000) + "w";
                } else if (value < 10000) {
                  value = (value / 1000).toFixed(1) + "k";
                }
                return value;
              },
              position: "top",
              color: "#fbffa9",
              fontSize: 10,
              textShadowBlur: 5,
              textShadowColor: "rgba(255, 255, 255, 0.5)"
            },
            itemStyle: {
              borderRadius: [20, 20, 0, 0],
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(76, 103, 235, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(92, 192, 255, 0.8)"
                  }
                ],
                global: false
              }
            }
          },
          {
            id: "maleBar",
            name: "男消费者数量",
            type: "bar",
            barWidth: "20%",
            data: this.maleData,
            emphasis: {
              focus: "series",
              blurScope: "coordinateSystem"
            },
            label: {
              show: true,
              formatter: params => {
                let value = params.data;
                if (value >= 10000) {
                  value = Math.round(value / 10000) + "w";
                } else if (value < 10000) {
                  value = (value / 1000).toFixed(1) + "k";
                }
                return value;
              },
              position: "top",
              color: "#fbffa9",
              fontSize: 10,
              textShadowBlur: 5,
              textShadowColor: "rgba(255, 255, 255, 0.5)"
            },
            itemStyle: {
              borderRadius: [20, 20, 0, 0],
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
                    color: "rgb(255, 208, 139, 0.8)"
                  }
                ],
                global: false
              }
            }
          },
          {
            id: "femaleBar",
            name: "女消费者数量",
            type: "bar",
            barWidth: "20%",
            data: this.femaleData,
            emphasis: {
              focus: "series",
              blurScope: "coordinateSystem"
            },
            label: {
              show: true,
              formatter: params => {
                let value = params.data;
                if (value >= 10000) {
                  value = Math.round(value / 10000) + "w";
                } else if (value < 10000) {
                  value = (value / 1000).toFixed(1) + "k";
                }
                return value;
              },
              position: "top",
              color: "#fbffa9",
              fontSize: 10,
              textShadowBlur: 5,
              textShadowColor: "rgba(255, 255, 255, 0.5)"
            },
            itemStyle: {
              borderRadius: [20, 20, 0, 0],
              color: {
                type: "linear", // 线性渐变
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(0, 104, 153, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgb(74, 215, 160, 0.8)"
                  }
                ],
                global: false
              }
            }
          },
          {
            id: "pie",
            name: "消费者性别占比",
            type: "pie",
            center: ["80%", "28%"],
            radius: "25%",
            itemStyle: {
              color: params => {
                return this.colorList[params.dataIndex];
              },
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            label: {
              show: true,
              position: "inside",
              fontSize: 12,
              fontWeight: "normal",
              color: "whitesmoke",
              formatter: "{d}%",
              textShadowBlur: 5,
              textShadowColor: "rgba(0, 0, 0, 0.9)"
            },
            labelLine: {
              show: false
            },
            data: [
              { name: "Male", value: this.maleTotal },
              { name: "Female", value: this.femaleTotal }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      ageGenderChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          ageGenderChart.resize();
        };
      }, 200);
    }
  }
};
</script>
<style lang="scss">
#age-gender {
  #ageGenderChart {
    width: calc(100%);
    height: 382px;
  }
}
</style>
