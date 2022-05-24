<template>
  <div id="word">
    <div id="wordChart"></div>
  </div>
</template>
<script>
export default {
  name: "word",
  data() {
    return {
      word: [
        // { name: "Sam S Club", value: 14371 },
        // { name: "Macys", value: 9832 }
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
                document.getElementById("wordChart")
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
      let wordChart = this.$echarts.init(document.getElementById("wordChart"));
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff"
          },
          confine: true
          // formatter: "{b}\t{c}"
        },
        series: {
          id: "wordCloud",
          type: "wordCloud",
          gridSize: 2,
          sizeRange: [10, 50], // 画布大小
          rotationRange: [0, 0], // 数据翻转度
          textPadding: 0,
          // shape: 'square',   // 词云形状
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
      wordChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          wordChart.resize();
        };
      }, 200);
    }
  }
};
</script>
<style lang="scss">
#word {
  #wordChart {
    width: 690px;
    height: 171px;
  }
}
</style>
