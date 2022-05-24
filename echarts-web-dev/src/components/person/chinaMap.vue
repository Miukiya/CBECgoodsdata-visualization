<template>
  <div id="map">
    <div id="china-map"></div>
  </div>
</template>
<script>
export default {
  name: "chinaMap",
  data() {
    return {
      // 坐标
      geoCoordMap: {
        // 宜宾: [104.56, 29.77],
        // 成都: [104.06, 30.67]
        // 海门: [121.15, 31.89],
        // 鄂尔多斯: [109.781327, 39.608266],
        // 招远: [120.38, 37.35, 142],
        // 舟山: [122.207216, 29.985295],
        // 吉林: [126.57, 43.87],
        // 阳江: [111.95, 21.85],
        // 西宁: [101.74, 36.56],
        // 呼和浩特: [111.65, 40.82],
        // 廊坊: [116.7, 39.53],
        // 合肥: [117.27, 31.86],
        // 武汉: [114.31, 30.52],
        // 大庆: [125.03, 46.58],
        // 淮安: [119.15, 33.5],
        // 泰州: [119.9, 32.49],
        // 南宁: [108.33, 22.84],
        // 营口: [122.18, 40.65],
        // 惠州: [114.4, 23.09],
        // 江阴: [120.26, 31.91],
        // 蓬莱: [120.75, 37.8],
        // 韶关: [113.62, 24.84],
        // 嘉峪关: [98.289152, 39.77313],
        // 广州: [113.23, 23.16],
        // 延安: [109.47, 36.6],
        // 太原: [112.53, 37.87],
        // 清远: [113.01, 23.7],
        // 中山: [113.38, 22.52],
        // 昆明: [102.73, 25.04]
      },
      // 对应值
      valueData: [
        // { name: "海门", value: 76 },
        // { name: "鄂尔多斯", value: 288 },
        // { name: "招远", value: 18 },
        // { name: "舟山", value: 345 },
        // { name: "吉林", value: 528 },
        // { name: "阳江", value: 45 },
        // { name: "西宁", value: 63 },
        // { name: "宜宾", value: 314 },
        // { name: "呼和浩特", value: 29 },
        // { name: "成都", value: 577 },
        // { name: "廊坊", value: 412 },
        // { name: "合肥", value: 503 },
        // { name: "武汉", value: 543 },
        // { name: "大庆", value: 321 },
        // { name: "淮安", value: 237 },
        // { name: "泰州", value: 498 },
        // { name: "南宁", value: 467 },
        // { name: "营口", value: 342 },
        // { name: "惠州", value: 478 },
        // { name: "江阴", value: 356 },
        // { name: "蓬莱", value: 287 },
        // { name: "韶关", value: 274 },
        // { name: "嘉峪关", value: 323 },
        // { name: "广州", value: 599 },
        // { name: "延安", value: 407 },
        // { name: "太原", value: 568 },
        // { name: "清远", value: 237 },
        // { name: "中山", value: 348 },
        // { name: "昆明", value: 479 }
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
          this.valueData = res;
          let valueData = JSON.parse(JSON.stringify(this.valueData));
          // 获取坐标
          this.$axios.get("/static/china_coordinate.json").then(res => {
            this.geoCoordMap = JSON.parse(JSON.stringify(res.data));
            let geoCoordMap = JSON.parse(JSON.stringify(this.geoCoordMap));
            if (Object.keys(geoCoordMap).length !== 0) {
              // 赋值渲染
              this.setChinaMap(geoCoordMap, valueData);
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
    this.chinaMap(); // 所在地
  },
  methods: {
    // 消费能力分布图：按物流单量统计
    chinaMap() {
      let chinaMap = this.$echarts.init(document.getElementById("china-map"));
      let option = {
        // 标题
        title: [
          {
            id: "main",
            text: "2016-2021年进口商品消费者能力一览",
            subtext: "国内各地区物流清单数量分布", // 副标
            top: "3%",
            left: "3%",
            textStyle: {
              color: "whitesmoke",
              fontSize: "15px"
            }
          },
          {
            id: "list_1",
            text: "> 30万：成都、上海",
            bottom: "12%",
            left: "3%",
            textStyle: {
              color: "#fef5cb",
              fontSize: "12px"
            }
          },
          {
            id: "list_2",
            text: "> 20万：北京、重庆、温州",
            bottom: "8%",
            left: "3%",
            textStyle: {
              color: "#fef5cb",
              fontSize: "12px"
            }
          },
          {
            id: "list_3",
            text: "> 10万：深圳、广州、福州、杭州、苏州、天津、南京",
            bottom: "4%",
            left: "3%",
            textStyle: {
              color: "#fef5cb",
              fontSize: "12px"
            }
          }
        ],
        // 这个是重点配置区：地图区域样式
        geo: {
          map: "china", // 表示中国地图
          roam: false, // 滚动缩放
          silent: true,
          layoutCenter: ["50%", "50%"], // 左右、上下距离的百分比
          layoutSize: "100%", // map百分比大小
          // label: {
          //   show: true
          // },
          // map样式
          itemStyle: {
            areaColor: "#f3f1ec",
            borderColor: "#ccd6d7",
            borderWidth: 1.2
          }
        },
        visualMap: {
          show: true,
          top: "3%",
          right: "3%",
          type: "continuous",
          orient: "horizontal", // 横向
          text: ["单量大", "单量小"],
          textStyle: {
            color: "whitesmoke"
          },
          min: 0,
          max: 150000,
          seriesIndex: 0,
          calculable: true,
          itemWidth: 12,
          inRange: {
            color: ["blue", "blue", "green", "yellow", "red"]
          }
        },
        series: {
          id: "chinamap",
          name: "进口商品单量",
          type: "heatmap",
          coordinateSystem: "geo", // 对应上方配置
          pointSize: 9,
          blurSize: 6, // 每个点模糊的大小
          minOpacity: 0.05, // 最小的透明度
          maxOpacity: 1 // 最大的透明度
          // 标签样式
          // itemStyle: {}
        }
      };
      chinaMap.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          chinaMap.resize();
        };
      }, 200);
    },

    // 图表渲染
    setChinaMap(geoCoordMap, valueData) {
      // 将坐标与值对应并反映在地图上
      let convertData = data => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      let dom = this.$echarts.getInstanceByDom(
        document.getElementById("china-map")
      );
      // 图表存在，更新数据
      if (dom !== null) {
        dom.setOption({
          series: {
            id: "chinamap",
            data: convertData(valueData)
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
#map {
  #china-map {
    width: calc(100%);
    height: 592px;
  }
}
</style>
