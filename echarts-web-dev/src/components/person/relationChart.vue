<template>
  <div id="relation">
    <div id="relationChart"></div>
    <div class="first-onepart-end">
      <el-row>
        <el-col :span="9"><div class="text" v-text="message"></div></el-col>
        <el-col :span="5">
          <el-select
            size="small"
            v-model="value1"
            placeholder="查询注册时间"
            @change="selectChild1"
            style="margin-bottom: 50px"
            :disabled="isAbled1"
            clearable
            filterable
          >
            <el-option
              v-for="item in timeValue"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            size="small"
            v-model="value2"
            placeholder="查询企业"
            @change="selectChild2"
            style="margin-bottom: 50px"
            :disabled="isAbled2"
            clearable
            filterable
          >
            <el-option
              v-for="item in companyValue"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            size="small"
            v-model="value3"
            placeholder="查询商品"
            @change="selectChild3"
            style="margin-bottom: 50px"
            :disabled="isAbled3"
            clearable
            filterable
          >
            <el-option
              v-for="item in goodValue"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "relationChart",
  data() {
    return {
      value1: null,
      value2: null,
      value3: null,
      isAbled1: false,
      isAbled2: false,
      isAbled3: false,
      timeValue: [],
      companyValue: [],
      goodValue: [],
      nodes: [
        // {
        //   id: "1",
        //   name: "2015之前"
        // },
        // { id: "2", name: "2016-2019" },
        // { id: "3", name: "2020以后" },
        // // 企业坐标 原点(0, 150) r=300
        // {
        //   id: "101",
        //   name: "企业1"
        // },
        // {
        //   id: "102",
        //   name: "企业2"
        // },
        // {
        //   id: "103",
        //   name: "企业3"
        // },
        // { id: "104", name: "企业4" },
        // {
        //   id: "105",
        //   name: "企业5"
        // },
        // {
        //   id: "106",
        //   name: "企业6"
        // },
        // {
        //   id: "107",
        //   name: "企业7"
        // },
        // {
        //   id: "108",
        //   name: "企业8"
        // },
        // {
        //   id: "109",
        //   name: "企业9"
        // },
        // {
        //   id: "110",
        //   name: "企业10"
        // },
        // // 商品坐标 原点(0, 0) r=400
        // {
        //   id: "2001",
        //   name: "商品1"
        // },
        // {
        //   id: "2002",
        //   name: "商品2"
        // },
        // {
        //   id: "2003",
        //   name: "商品3"
        // },
        // {
        //   id: "2004",
        //   name: "商品4"
        // },
        // { id: "2005", name: "商品5" },
        // {
        //   id: "2006",
        //   name: "商品6"
        // },
        // {
        //   id: "2007",
        //   name: "商品7"
        // },
        // {
        //   id: "2008",
        //   name: "商品8"
        // },
        // {
        //   id: "2009",
        //   name: "商品9"
        // }
      ],
      links: [
        // {
        //   source: "101",
        //   target: "2009",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.6
        //   }
        // },
        // {
        //   source: "101",
        //   target: "2001",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.1
        //   }
        // },
        // {
        //   source: "105",
        //   target: "2001",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.3
        //   }
        // },
        // {
        //   source: "102",
        //   target: "2003",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.1
        //   }
        // },
        // {
        //   source: "102",
        //   target: "2004",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.1
        //   }
        // },
        // {
        //   source: "107",
        //   target: "2003",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.3
        //   }
        // },
        // {
        //   source: "102",
        //   target: "2002",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.2
        //   }
        // },
        // {
        //   source: "104",
        //   target: "2002",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.2
        //   }
        // },
        // {
        //   source: "104",
        //   target: "2005",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0
        //   }
        // },
        // {
        //   source: "103",
        //   target: "2004",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.1
        //   }
        // },
        // {
        //   source: "103",
        //   target: "2007",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.2
        //   }
        // },
        // {
        //   source: "104",
        //   target: "2003",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.1
        //   }
        // },
        // {
        //   source: "105",
        //   target: "2003",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.2
        //   }
        // },
        // {
        //   source: "104",
        //   target: "2006",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.1
        //   }
        // },
        // {
        //   source: "106",
        //   target: "2005",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.1
        //   }
        // },
        // {
        //   source: "104",
        //   target: "2001",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.2
        //   }
        // },
        // {
        //   source: "105",
        //   target: "2008",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.1
        //   }
        // },
        // {
        //   source: "106",
        //   target: "2007",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.1
        //   }
        // },
        // {
        //   source: "106",
        //   target: "2009",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.2
        //   }
        // },
        // {
        //   source: "107",
        //   target: "2006",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.2
        //   }
        // },
        // {
        //   source: "107",
        //   target: "1",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.2
        //   }
        // },
        // {
        //   source: "106",
        //   target: "2",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.2
        //   }
        // },
        // {
        //   source: "105",
        //   target: "2",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: -0.2
        //   }
        // },
        // {
        //   source: "104",
        //   target: "2",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0
        //   }
        // },
        // {
        //   source: "102",
        //   target: "2",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.2
        //   }
        // },
        // {
        //   source: "103",
        //   target: "3",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.2
        //   }
        // },
        // {
        //   source: "101",
        //   target: "3",
        //   lineStyle: {
        //     opacity: 0.9,
        //     width: 1,
        //     curveness: 0.2
        //   }
        // }
      ],
      message:
        "本研究数据选自在相应时间段内注册的、商品货值总额前十的企业与企业货值前五的商品"
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
          this.nodes = res[0].nodes;
          this.links = res[1].links;
          let time = [];
          let company = [];
          let good = [];
          // 设置节点坐标 类型
          let num1 = 0;
          let num2 = 0;
          this.nodes.map(item => {
            let id = item.id;
            if (id.length == 1) {
              time.push({ value: item.name });
              // 注册时间节点
              item.category = 0; // 类型数组对应索引
              item.symbolSize = 5;
              if (id === "1") {
                item.x = 1000;
                item.y = 1200;
              } else if (id === "2") {
                item.x = 1968;
                item.y = 1200;
              } else if (id === "3") {
                item.x = 2936;
                item.y = 1200;
              }
            } else if (id.length !== 1 && /^1/.test(id)) {
              company.push({ value: item.name });
              // 企业节点
              item.category = 1;
              item.symbolSize = 5;
              let x = 1000 + num1 * 80;
              num1++;
              item.x = x;
              item.y = 750;
            } else if (id.length !== 1 && /^2/.test(id)) {
              good.push({ value: item.name });
              // 商品节点
              item.category = 2;
              item.symbolSize = 5;
              let x = num2 * 48;
              num2++;
              item.x = x;
              item.y = 0;
            }
          });
          // 设置关系线弧度
          this.links.map(item => {
            let lineStyleObj = {};
            lineStyleObj.opacity = 0.9;
            lineStyleObj.width = 0.5;
            lineStyleObj.curveness = 0.1;
            item.lineStyle = lineStyleObj;
          });
          this.timeValue = time;
          this.companyValue = company;
          this.goodValue = good;
          let nodes = JSON.parse(JSON.stringify(this.nodes));
          let links = JSON.parse(JSON.stringify(this.links));
          this.$nextTick(() => {
            setTimeout(() => {
              let dom = this.$echarts.getInstanceByDom(
                document.getElementById("relationChart")
              );
              // 图表存在，更新数据
              if (dom !== null) {
                dom.setOption({
                  series: {
                    id: "relation",
                    data: nodes,
                    links: links
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
    this.relationChart(); // 初始化
  },
  methods: {
    relationChart() {
      let relationChart = this.$echarts.init(
        document.getElementById("relationChart")
      );
      let categories = ["注册时间", "企业名称", "商品名称"];
      let option = {
        tooltip: {
          enterable: true,
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
            align: "left"
          }
        },
        legend: {
          // orient: "vertical", // 竖向
          data: categories.map(a => {
            return a;
          }),
          left: "center",
          bottom: "5%",
          textStyle: {
            color: "whitesmoke"
          }
        },
        // animationEasingUpdate: "quinticInOut",
        color: [
          "#00fac1", // 注册时间
          "#FCFF79", // 企业名称
          "#00FFFF" // 商品名称
        ],
        series: {
          id: "relation",
          type: "graph",
          categories: categories.map(c => ({ name: c })),
          layout: "none",
          data: this.nodes,
          links: this.links,
          roam: false,
          zoom: 1.1,
          // symbolRotate: 10,
          label: {
            show: true,
            position: "insideBottom",
            color: "whitesmoke",
            fontSize: "12px",
            distance: 8,
            // rotate: 30,
            // width: 20,
            // overflow: "truncate",   // 文字截断
            formatter: params => {
              let res = params.data;
              if (res.id.length == 1) {
                // 注册时间
                return res.name;
              } else {
                let str = res.name.split("");
                // 将字符串截断
                let name = str.slice(0, 4);
                if (str.length > 4) {
                  name.push("..");
                }
                let strout = name.join("\n");
                return strout;
              }
            }
            // offset: [5, 20],   // 文字偏移 [横, 纵]
            // backgroundColor: "red"   // 文字块背景色
          },
          emphasis: {
            focus: "adjacency"
          },
          edgeSymbol: ["circle"], // 边两端的标记类型
          edgeSymbolSize: [4, 8], // 边两端的标记大小
          edgeLabel: {
            fontSize: 20
          },
          autoCurveness: 0.01 // 多条边时自动计算曲率
        }
      };
      relationChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          relationChart.resize();
        };
      }, 200);
    },

    // 获取relationChart子图节点
    linkNames(id) {
      let nodes = JSON.parse(JSON.stringify(this.nodes));
      let links = JSON.parse(JSON.stringify(this.links));
      // 返回source
      let sourceId = links.map(n => {
        return n.source;
      });
      // 返回target
      let targetId = links.map(n => {
        return n.target;
      });
      let middleId = []; // 中层nodesId
      let outerId = []; // 外层nodesId
      let childId = []; // 子图节点Id
      let childNodes = []; // 子图节点data
      if (id.length === 1) {
        // 注册时间节点
        // 获取中间nodesId
        for (let i = 0; i < targetId.length; i++) {
          if (id === targetId[i]) {
            middleId.push(sourceId[i]);
          }
        }
        // 获取外层nodesId
        for (let i = 0; i < middleId.length; i++) {
          for (let j = 0; j < sourceId.length; j++) {
            if (middleId[i] === sourceId[j]) {
              outerId.push(targetId[j]);
            }
          }
        }
        // 子图Id 连接 去重
        childId = Array.from(new Set(middleId.concat(outerId)));
      } else if (id.length !== 1 && /^1/.test(id)) {
        // 企业节点
        for (let i = 0; i < sourceId.length; i++) {
          if (id === sourceId[i]) {
            outerId.push(targetId[i]);
          }
        }
        outerId.push(id);
        childId = Array.from(new Set(outerId));
      } else if (id.length !== 1 && /^2/.test(id)) {
        // 商品节点
        for (let i = 0; i < targetId.length; i++) {
          if (id === targetId[i]) {
            middleId.push(sourceId[i]);
          }
        }
        for (let i = 0; i < middleId.length; i++) {
          for (let j = 0; j < sourceId.length; j++) {
            if (middleId[i] === sourceId[j]) {
              if (targetId[j].length === 1) {
                outerId.push(targetId[j]);
              }
            }
          }
        }
        childId = Array.from(new Set(middleId.concat(outerId)));
        childId.push(id);
      } else {
        this.$message({
          message: "没有该节点！",
          type: "error"
        });
      }
      // 获取子图节点的data
      for (let n = 0; n < childId.length; n++) {
        for (let m = 0; m < nodes.length; m++) {
          if (childId[n] === nodes[m].id) {
            childNodes.push(nodes[m]);
          }
        }
      }
      return childNodes;
    },

    // 注册时间选择器
    selectChild1(value) {
      let data = [];
      let nodes = JSON.parse(JSON.stringify(this.nodes));
      if (value === "") {
        data = nodes;
        this.isAbled2 = false;
        this.isAbled3 = false;
      } else if (value.length !== 0) {
        let id = "";
        nodes.map(item => {
          if (item.name === value) {
            id = item.id;
          }
        });
        data = this.linkNames(id);
        this.isAbled2 = true;
        this.isAbled3 = true;
      }
      // 判断图表实例是否存在
      let relationChart = this.$echarts.getInstanceByDom(
        document.getElementById("relationChart")
      );
      if (relationChart !== null) {
        // 如果存在，更新子图
        if (value === "") {
          relationChart.setOption({
            series: {
              id: "relation",
              data: data,
              zoom: 1.1
            }
          });
        } else if (value.length !== 0) {
          relationChart.setOption({
            series: {
              id: "relation",
              data: data,
              zoom: 0.85
            }
          });
        }
      }
    },

    // 企业选择器
    selectChild2(value) {
      let data = [];
      let nodes = JSON.parse(JSON.stringify(this.nodes));
      if (value === "") {
        data = nodes;
        this.isAbled1 = false;
        this.isAbled3 = false;
      } else if (value.length !== 0) {
        let id = "";
        nodes.map(item => {
          if (item.name === value) {
            id = item.id;
          }
        });
        data = this.linkNames(id);
        this.isAbled1 = true;
        this.isAbled3 = true;
      }
      // 判断图表实例是否存在
      let relationChart = this.$echarts.getInstanceByDom(
        document.getElementById("relationChart")
      );
      if (relationChart !== null) {
        // 如果存在，更新子图
        if (value === "") {
          relationChart.setOption({
            series: {
              id: "relation",
              data: data,
              zoom: 1.1
            }
          });
        } else if (value.length !== 0) {
          relationChart.setOption({
            series: {
              id: "relation",
              data: data,
              zoom: 0.85
            }
          });
        }
      }
    },

    // 商品选择器
    selectChild3(value) {
      let data = [];
      let nodes = JSON.parse(JSON.stringify(this.nodes));
      if (value === "") {
        data = nodes;
        this.isAbled1 = false;
        this.isAbled2 = false;
      } else if (value.length !== 0) {
        let id = "";
        nodes.map(item => {
          if (item.name === value) {
            id = item.id;
          }
        });
        data = this.linkNames(id);
        this.isAbled1 = true;
        this.isAbled2 = true;
      }
      // 判断图表实例是否存在
      let relationChart = this.$echarts.getInstanceByDom(
        document.getElementById("relationChart")
      );
      if (relationChart !== null) {
        // 如果存在，更新子图
        if (value === "") {
          relationChart.setOption({
            series: {
              id: "relation",
              data: data,
              zoom: 1.1
            }
          });
        } else if (value.length !== 0) {
          relationChart.setOption({
            series: {
              id: "relation",
              data: data,
              zoom: 0.85
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="scss">
#relation {
  #relationChart {
    width: calc(100%);
    height: 513px;
  }
}
</style>
