<template>
  <div id="typeLinePie">
    <div id="typeChart"></div>
  </div>
</template>
<script>
export default {
  name: "typeLinePie",
  data() {
    return {
      source: [],
      checked: [],
      colorList: [
        "#ece8e5",
        "#bba492",
        "#d89962",
        "#c47674",
        "#f2c1c4",
        "#f4cfc9",
        "#f6e2e3",
        "#edeef3",
        "#fff1de",
        "#f4e5ba",
        "#b0d7f8",
        "#7facd6",
        "#7986ca",
        "#a5678e",
        "#e9b7d4",
        "#c0b9db",
        "#d3e7f0",
        "#a8dee0",
        "#86cacd",
        "#81bfb0",
        "#c4c09a",
        "#ffca8a"
      ]
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
        if (res.length === 24) {
          // 获取dataset source数组
          this.source = res.slice(0, 23);
          // 获取当前选中商品类型
          this.checked = res.slice(-1);
          let dataIndex = this.checked[0] - 1;
          this.$nextTick(() => {
            setTimeout(() => {
              this.setChartOption(this.source, dataIndex, res);
            }, 100);
          });
        }
      },
      deep: true, // 深度监听
      immediate: true // 初次监听即执行
    }
  },
  mounted() {
    this.typeChart(); // 商品大类
  },
  methods: {
    typeChart() {
      let typeChart = this.$echarts.init(document.getElementById("typeChart"));
      let option = {
        title: {},
        legend: [
          {
            id: "group1"
          },
          {
            id: "group2"
          }
        ],
        tooltip: {
          id: "typeData"
        },
        dataset: {
          id: "type",
          source: this.source
        },
        // 默认情况下，类目轴对应到 dataset 第一列
        xAxis: {
          id: "xAxis"
        },
        yAxis: {
          id: "yAxis"
        },
        grid: {
          top: "60%",
          left: "8%",
          right: "5%",
          bottom: "5%"
        },
        // 声明多个line系列，默认情况下，每个系列会自动对应到dataset的每一列
        series: []
      };
      typeChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          typeChart.resize();
        };
      }, 200);
    },

    // 重新渲染，更新数据
    setChartOption(source, dataIndex, res) {
      let typeList = [];
      let series = [];
      // 循环push所有商品类型与对应line series
      for (let i = 1; i < source.length; i++) {
        let arr = res[i];
        typeList.push(arr[0]);
        series.push({
          name: typeList[typeList.length - 1],
          type: "line",
          smooth: true,
          seriesLayoutBy: "row", // 系列被安放到dataset的行上面
          emphasis: { focus: "series" },
          symbol: "none", //取消折点圆圈
          lineStyle: {
            width: 1.2, //设置线条粗细
            color: this.colorList[i - 1] // 颜色对应
          },
          areaStyle: {
            color: {
              type: "linear", // 径向渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: this.colorRgb(this.colorList[i - 1]) + ", 0)"
                },
                {
                  offset: 0.3,
                  color: this.colorRgb(this.colorList[i - 1]) + ", 0)"
                }
              ],
              global: false
            },
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          }
        });
      }
      // 向series中push关联图表pie
      series.push({
        id: "pie",
        type: "pie",
        radius: ["40%", "45%"],
        center: ["27%", "32%"],
        minAngle: 5, // 设定最小角度
        emphasis: {
          focus: "self"
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.8)"
        },
        label: {
          lineHeight: 24,
          position: "center",
          // formatter: "{b}: {@2012} ({d}%)"
          formatter: params => {
            if (params.dataIndex === dataIndex) {
              return (
                "{p|" + params.percent + "%}" + "\n{nm|" + params.name + "}"
              );
            } else {
              return "";
            }
          },
          rich: {
            p: {
              color: "#fff",
              fontSize: 20,
              fontWeight: "bolder"
            },
            nm: {
              color: "#00f6ff",
              fontSize: 16,
              fontWeight: "bolder"
            }
          },
          textShadowBlur: 5,
          textShadowColor: "rgba(255, 255, 255, 0.5)"
        },
        labelLine: {
          show: false
        },
        encode: {
          itemName: "year",
          value: "2021",
          tooltip: "2021"
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.6)"
          }
        }
      });
      // 更新legend对象
      let newLegend = [];
      newLegend.push({
        id: "group1",
        orient: "vertical",
        top: "4%",
        right: "1%",
        data: typeList.slice(0, 11),
        textStyle: {
          color: "#f4e4a9"
        }
      });
      newLegend.push({
        id: "group2",
        orient: "vertical",
        top: "4%",
        right: "24%",
        data: typeList.slice(11),
        textStyle: {
          color: "#f4e4a9"
        }
      });
      // 配置项
      let option = {
        title: {
          text: "各大类商品总览",
          top: "3%",
          left: "3%",
          textStyle: {
            color: "whitesmoke",
            fontSize: "15px"
          }
        },
        // 默认情况下，类目轴对应到 dataset 第一列
        xAxis: {
          id: "xAxis",
          type: "category",
          boundaryGap: false,
          axisTick: {
            //x轴刻度线
            show: true
          },
          axisLine: {
            // x轴线
            show: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: "whitesmoke"
          }
        },
        yAxis: {
          id: "yAxis",
          type: "log",
          min: 1,
          logBase: 10,
          name: "单位：件",
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
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: ["rgb(255, 255, 255, 0.1)"]
            }
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
          }
        },
        grid: {
          top: "64%",
          left: "8%",
          right: "5%",
          bottom: "5%"
        },
        color: this.colorList,
        legend: newLegend,
        tooltip: {
          id: "typeData",
          trigger: "axis",
          confine: true,
          backgroundColor: "rgba(255,255,255,0.8)",
          // tooltip 放不下，分两列
          formatter: params => {
            let astr = "";
            params.forEach(ele => {
              const data = ele.data;
              const dimension = ele.dimensionNames;
              // 将data中的1值恢复到0值，1.5值恢复到1值
              for (let i = 1; i < data.length; i++) {
                if (data[i] === 1) {
                  data[i] = 0;
                } else if (data[i] === 1.5) {
                  data[i] = 1;
                }
              }
              dimension.map((item, i) => {
                if (ele.seriesName === item) {
                  // 存在即展示
                  astr +=
                    "<div style='display:block;height:21px;width:50%;float:left;'>" +
                    "<div style='display:block;width:21px;height:21px;float:left;'>" +
                    "<i style='width:10px;height:10px;display:inline-block;background:" +
                    ele.color +
                    ";border-radius:10px;'></i>" +
                    "</div>" +
                    "<span style='float:left;'>" +
                    "&nbsp;" +
                    ele.seriesName +
                    "&nbsp;&nbsp;" +
                    data[i] +
                    "</span>" +
                    "</div>";
                }
              });
            });
            const b = '<div style="width: 450px;">' + astr + "<div>";
            // return b;
          }
        },
        dataset: {
          id: "type",
          source: source
        },
        series: series
      };
      let dom = this.$echarts.getInstanceByDom(
        document.getElementById("typeChart")
      );
      // 图表存在，更新数据
      if (dom !== null) {
        dom.setOption(
          option,
          true // 选择不与之前的option合并，每次更新重新绘制图表
        );
        // 设置默认选中高亮部分
        dom.dispatchAction({
          type: "highlight",
          seriesIndex: 22,
          dataIndex: dataIndex
        });
        // 动态更新事件
        dom.on("updateAxisPointer", event => {
          const xAxisInfo = event.axesInfo[0];
          // 动态切换时，保持当前类型高亮
          dom.dispatchAction({
            type: "highlight",
            seriesIndex: 22,
            dataIndex: dataIndex
          });
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            dom.setOption({
              series: {
                id: "pie",
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
      }
    },

    // 16进制颜色码转rgb颜色码
    colorRgb(colorValue) {
      // 16进制颜色值的正则
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      var color = colorValue.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          var colorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "RGB(" + colorChange.join(",");
      } else {
        return color;
      }
    }
  }
};
</script>
<style lang="scss">
#typeLinePie {
  margin-bottom: 18px;
  #typeChart {
    width: 690px;
    height: 488px;
  }
}
</style>
