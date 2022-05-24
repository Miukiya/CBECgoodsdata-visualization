<template>
  <div id="typeMore">
    <div id="typeMoreChart"></div>
  </div>
</template>
<script>
export default {
  name: "typeMore",
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
      ],
      path_arrow_top: "path://M948 698L533.4 283.3c-5.7-5.7-13.3-8.8-21.4-8.8s-15.7 3.2-21.4 8.8L76 698c-8.6 8.6-11.2 21.6-6.5 32.9 4.7 11.3 15.7 18.6 27.9 18.6h829.3c12.2 0 23.2-7.4 27.9-18.6 4.6-11.3 2.1-24.3-6.6-32.9z",
      path_arrow_bottom: "path://M76 326L490.6 740.7c5.7 5.7 13.3 8.79999999 21.4 8.8s15.69999999-3.2 21.4-8.8L948 326c8.6-8.6 11.2-21.59999999 6.5-32.9-4.7-11.3-15.69999999-18.6-27.9-18.6l-829.3 0c-12.2 0-23.2 7.4-27.9 18.6-4.6 11.3-2.1 24.3 6.6 32.9z"
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
          let valueList = res.slice(-1);
          this.checked = valueList[0];
          this.$nextTick(() => {
            setTimeout(() => {
              this.setChartOption(this.source, this.checked, res);
            }, 100);
          });
        }
      },
      deep: true, // 深度监听
      immediate: true // 初次监听即执行
    }
  },
  mounted() {
    this.typeChart(); // 初始化
  },
  methods: {
    typeChart() {
      let typeMoreChart = this.$echarts.init(
        document.getElementById("typeMoreChart")
      );
      let option = {
        title: {},
        legend: {
          id: "legend"
        },
        tooltip: {
          id: "typeData"
        },
        dataset: {
          id: "type",
          source: this.source
        },
        xAxis: {
          id: "xAxis"
        },
        yAxis: {
          id: "yAxis"
        },
        grid: {
          id: "grid",
          zlevel: 1
        },
        // 声明多个line系列，默认情况下，每个系列会自动对应到dataset的每一列
        series: []
      };
      // pie图表关联事件
      typeMoreChart.on("updateAxisPointer", function(event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          typeMoreChart.setOption({
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
      typeMoreChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          typeMoreChart.resize();
        };
      }, 200);
    },

    // 更新数据，重新渲染函数
    setChartOption(source, checked, res) {
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
              type: "linear", // 线性渐变
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
        zlevel: 2,
        radius: "32%",
        center: ["40%", "25%"],
        minAngle: 15, // 设定最小角度
        emphasis: {
          focus: "self"
        },
        itemStyle: {
          // borderRadius: 5,
          color: params => {
            return this.colorList[params.dataIndex];
          },
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.8)"
        },
        label: {
          formatter: "{b}：({d}%)",
          position: "outer",
          alignTo: "labelLine",
          color: "#f4e4a9",
          fontSize: 11
        },
        labelLine: {
          length2: "6%"
        },
        encode: {
          itemName: "year",
          value: "2021",
          tooltip: "2021"
        }
      });
      // 抽取未选中值
      let unchecked = typeList.concat(checked).filter(function(item, i, arr) {
        return arr.indexOf(item) === arr.lastIndexOf(item);
      });
      let unselected = {};
      unchecked.filter(item => {
        unselected[item] = false;
      });
      // 更新legend对象
      let newLegend = {
        id: "legend",
        type: "scroll",
        orient: "vertical",
        right: "2%",
        top: "10%",
        bottom: "5%",
        itemGap: 15, // 图例每项之间的距离
        pageIcons: {
          // 设置icon SVG路径
          vertical: [
            this.path_arrow_top,
            this.path_arrow_bottom
          ]
        },
        pageIconSize: 16,
        pageButtonPosition: "start", // 图例控制块位置
        pageIconColor: "#66d9ef", // 翻页按钮颜色
        pageTextStyle: {
          // 图例页信息的文字样式
          color: "whitesmoke",
          fontWeight: "bold",
          fontFamily: "serif",
          fontSize: 14
        },
        data: typeList,
        selected: unselected,
        textStyle: {
          color: "#c2a5e7",
          fontSize: "14px"
        }
      };
      let dom = this.$echarts.getInstanceByDom(
        document.getElementById("typeMoreChart")
      );
      // 图表存在，更新数据
      if (dom !== null) {
        dom.setOption(
          {
            title: {
              text: "各大类商品总览",
              right: "7%",
              top: "3%",
              textStyle: {
                color: "whitesmoke",
                fontSize: "14px"
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
                    return value + " 件";
                  } else if (value >= 1000 && value < 10000) {
                    value = value / 1000 + "k 件";
                    return value;
                  } else if (value >= 10000 && value < 10000000) {
                    value = value / 10000 + "w 件";
                    return value;
                  } else if (value >= 10000000) {
                    value = value / 10000000 + "kw 件";
                    return value;
                  }
                }
              }
            },
            grid: {
              id: "grid",
              zlevel: 1,
              top: "54%",
              left: "8%",
              right: "27%",
              bottom: "10%"
            },
            color: this.colorList,
            legend: newLegend,
            tooltip: {
              id: "typeData",
              trigger: "axis",
              confine: true,
              backgroundColor: "rgba(0,0,0,0.5)",
              textStyle: {
                color: "#fff"
              },
              position: ["60%", "60%"], // 悬浮框位置
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
                return b;
              }
            },
            dataset: {
              id: "type",
              source: source
            },
            series: series
          },
          true // 选择不与之前的option合并，每次更新重新绘制图表
        );
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
#typeMore {
  #typeMoreChart {
    width: 886px;
    height: 396px;
  }
}
</style>
