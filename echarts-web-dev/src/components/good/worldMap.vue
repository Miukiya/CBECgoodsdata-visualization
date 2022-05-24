<template>
  <div id="map">
    <div id="worldMap"></div>
  </div>
</template>
<script>
export default {
  name: "worldMap",
  data() {
    return {
      geoCoordArr: [],
      geoCoordMap: {
        // 经度 纬度
        // 成都: [104.06, 30.67],
        // 莫斯科: [37.35, 64.06644390441474],
        // 华盛顿: [-77.013222, 38.913611],
        // 英国: [-3.435973, 55.378051],
        // 堪培拉: [149.08, -30.460652],
        // 东京: [138.253, 36.305]
      },
      coordPath: [
        // { coordsName: ["成都", "成都", 5000] },
        // { coordsName: ["成都", "莫斯科", 9637] },
        // { coordsName: ["成都", "华盛顿", 13049] },
        // { coordsName: ["成都", "英国", 8605] },
        // { coordsName: ["成都", "堪培拉", 6912] },
        // { coordsName: ["成都", "东京", 10579] }
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
        if (res.length !== 0) {
          this.coordPath = res;
          // 处理进出口国经纬度坐标
          let arr = [];
          let geoCoordObj = {};
          res.map(item => {
            arr.push(item.coordsName[1]);
          });
          this.geoCoordArr = arr;
          this.$axios.get("/static/world_coordinate.json").then(res => {
            let obj = JSON.parse(JSON.stringify(res.data));
            for (let i = 0; i < this.geoCoordArr.length; i++) {
              let name = this.geoCoordArr[i];
              geoCoordObj[name] = obj[name];
            }
            if (Object.keys(geoCoordObj).length !== 0) {
              // 赋值渲染
              this.setWorldMap(geoCoordObj);
            } else {
              this.$message({
                message: "未获取坐标！",
                type: "error"
              });
            }
          });
        }
      },
      deep: true, // 深度监听
      immediate: true // 初次监听即执行
    }
  },
  mounted() {
    this.worldMap(); // 初始化
  },
  methods: {
    worldMap() {
      let worldMap = this.$echarts.init(document.getElementById("worldMap"));
      let geo = {
        map: "world",
        aspectScale: 0.8,
        silent: true, // 禁用地图hover事件
        roam: false,
        zoom: 1.2, // 默认显示级别
        layoutSize: "138%",
        layoutCenter: ["50%", "45%"], // 宽 高
        // label: {},
        itemStyle: {
          areaColor: "#ABCDEF99",
          borderColor: "#1E90FF",
          borderWidth: 1,
          shadowColor: "#1E90FF",
          shadowOffsetX: 0,
          shadowOffsetY: 4,
          shadowBlur: 10
        }
      };
      let option = {
        // 标题
        title: {
          text: "商品进出口总额地缘分布",
          left: "center",
          bottom: "3%",
          textStyle: {
            color: "whitesmoke",
            fontSize: "12px",
            fontWeight: "normal"
          }
        },
        tooltip: {
          show: true,
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff"
          },
          formatter: p => {
            let dataCon = p.data;
            let textCon = "";
            if (p.componentSubType == "effectScatter") {
              if (dataCon.name === "成都") {
                textCon = `${dataCon.name}`;
              } else {
                textCon = `${dataCon.name}\t${dataCon.value[2]}￥`;
              }
              return textCon;
            }
          }
        },
        geo: geo,
        series: []
      };
      worldMap.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          worldMap.resize();
        };
      }, 200);
    },

    // 重新渲染方法
    setWorldMap(geoCoordObj) {
      this.geoCoordMap = JSON.parse(JSON.stringify(geoCoordObj));
      // 路径数据
      let data = JSON.parse(JSON.stringify(this.coordPath));
      // 坐标
      let geoCoordMap = JSON.parse(JSON.stringify(this.geoCoordMap));
      // push 线路开始地点-结束地点
      let convertData = function(data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let dataItem = data[i];
          let fromCoord = geoCoordMap[dataItem.coordsName[0]]; // 开始地点
          let toCoord = geoCoordMap[dataItem.coordsName[1]]; // 结束地点
          if (fromCoord && toCoord) {
            res.push({
              coords: [fromCoord, toCoord]
            });
          }
        }
        return res;
      };
      if (data && geoCoordMap) {
        let series = [];
        // 遍历线路
        [["成都", data]].forEach((item, i) => {
          series.push(
            {
              name: item[0],
              type: "lines",
              zlevel: 1,
              data: convertData(item[1]), // 开始到结束的数据
              effect: {
                show: true,
                period: 6, // 特效动画时间，单位s
                trailLength: 0.1, // 特效尾迹的长度。0-1，值越大尾迹越长
                color: "#E5FF9A", // 移动箭头的颜色
                symbol: "arrow", // 箭头的svg
                symbolSize: 1 // 特效标记的大小
              },
              lineStyle: {
                color: "#E5FF9A", // 线条的颜色
                width: 0,
                curveness: 0.2 // 弧度
              }
            },
            {
              // 出发地信息
              name: item[0],
              type: "lines",
              zlevel: 2,
              data: convertData(item[1]),
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: "arrow",
                symbolSize: 3
              },
              lineStyle: {
                color: "#E5FF9A",
                width: 1.5,
                opacity: 0.2,
                curveness: 0.2
              }
            },
            {
              // 目的地信息
              name: item[0],
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              rippleEffect: {
                brushType: "stroke"
              },
              symbolSize: val => {
                return val[2] / 30000000; // 动态控制value显示大小
              },
              data: item[1].map(p => {
                let dataItem = p.coordsName;
                let value = geoCoordMap[dataItem[1]].concat(dataItem[2]);
                return {
                  name: dataItem[1],
                  value: value
                };
              }),
              itemStyle: {
                color: "#E5FF9A" // 目的地散点颜色
              }
            }
          );
        });
        let dom = this.$echarts.getInstanceByDom(
          document.getElementById("worldMap")
        );
        // 图表存在，更新数据
        if (dom !== null && series.length > 0) {
          dom.setOption({
            series: series
          });
        }
      }
    }
  }
};
</script>
<style lang="scss">
#map {
  #worldMap {
    width: calc(100%);
    height: 302px;
  }
}
</style>
