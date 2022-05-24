<template>
  <div id="wordMore">
    <div id="wordMoreChart"></div>
  </div>
</template>
<script>
export default {
  name: "wordMore",
  data() {
    return {
      word: [
        // { name: "Sam S Club", value: 14371 },
        // { name: "Macys", value: 9832 },
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
          this.word = res;
          let word = JSON.parse(JSON.stringify(this.word));
          this.$nextTick(() => {
            setTimeout(() => {
              let dom = this.$echarts.getInstanceByDom(
                document.getElementById("wordMoreChart")
              );
              // 图表存在，更新数据
              if (dom !== null) {
                dom.setOption({
                  series: {
                    id: "wordCloud",
                    data: word
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
    this.wordCloud(); // 初始化
  },
  methods: {
    wordCloud() {
      let wordMoreChart = this.$echarts.init(
        document.getElementById("wordMoreChart")
      );
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff"
          },
          confine: true // 防止超出dom被遮挡
          // formatter: "{b}\t{c}"
        },
        series: {
          id: "wordCloud",
          type: "wordCloud",
          gridSize: 2,
          sizeRange: [12, 36], // 画布大小
          rotationRange: [-60, 30], // 数据翻转度
          textPadding: 0,
          shape: "pentagon", // 词云形状
          autoSize: {
            enable: true,
            minSize: 6
          },
          drawOutOfBound: true, //词云显示完整，超出画布的也显示
          textStyle: {
            color: () => {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255)
                ].join(",") +
                ")"
              );
            }
          },
          data: this.word
        }
      };
      wordMoreChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          wordMoreChart.resize();
        };
      }, 200);
    }
  }
};
</script>
<style lang="scss">
#wordMore {
  margin-left: 10px;
  #wordMoreChart {
    width: 286px;
    height: 396px;
  }
}
</style>
