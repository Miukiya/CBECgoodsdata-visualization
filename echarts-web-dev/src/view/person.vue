<template>
  <div id="person">
    <div class="first">
      <dv-border-box-12 class="first-onepart">
        <relation-chart :data="nodeData"></relation-chart>
      </dv-border-box-12>
      <dv-border-box-12 class="first-secondpart">
        <company-pie :data="company_good"></company-pie>
      </dv-border-box-12>
    </div>
    <div class="second">
      <dv-border-box-12 class="second-onepart">
        <age-gender :data="ageNum"></age-gender>
      </dv-border-box-12>
      <dv-border-box-12 class="second-secondpart">
        <china-map :data="mapData"></china-map>
      </dv-border-box-12>
    </div>
  </div>
</template>
<script>
import RelationChart from "@/components/person/relationChart.vue";
import CompanyPie from "@/components/person/companyPie.vue";
import AgeGender from "@/components/person/ageGender.vue";
import ChinaMap from "@/components/person/chinaMap.vue";
import {
  getAge,
  getLogisticsList,
  getCompanyGood,
  getRelationNodes,
  getRelationLinks
} from "../request/personApi";
export default {
  name: "person",
  components: {
    RelationChart, // 注册时间-企业-商品关系图
    CompanyPie, // 年份-商品-企业雷达图
    AgeGender, // 消费者年龄性别图
    ChinaMap // 消费者能力分布图
  },
  data() {
    return {
      ageNum: [],
      mapData: [],
      company_good: [],
      nodeData: []
    };
  },
  created() {
    this.getPersonAgeNumber();
    this.getLogisticsListNumber();
    this.getPersonCompanyGood();
    this.getPersonRelatoinNodes();
  },
  mounted() {},
  methods: {
    // 获取消费者两性各年龄段人数
    getPersonAgeNumber() {
      getAge()
        .then(res => {
          this.ageNum = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取各地物流清单数量
    getLogisticsListNumber() {
      getLogisticsList()
        .then(res => {
          this.mapData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取商品企业货值贡献比值
    getPersonCompanyGood() {
      getCompanyGood()
        .then(res => {
          this.company_good = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取关系图 节点 关系
    getPersonRelatoinNodes() {
      let resultArr = [];
      let nodes = [];
      let links = [];
      getRelationNodes()
        .then(res => {
          nodes = res;
          resultArr.push({ nodes: nodes });
        })
        .catch(err => {
          console.log(err);
        });
      getRelationLinks()
        .then(res => {
          res.map(item => {
            let obj = {};
            obj.source = item.source;
            obj.target = item.target;
            links.push(obj);
          });
          resultArr.push({ links: links });
          this.nodeData = resultArr;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
#person {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: rgb(40, 44, 52);
  padding: 10px;
  .first {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 10px;
    width: calc(66% - 5px);
    height: calc(100%);
    .svg {
      .use {
        stroke-width: 5px !important;
      }
    }
    .first-onepart {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-bottom: 10px;
      width: calc(100%);
      height: calc(60%);
      .border-box-content {
        .first-onepart-end {
          .text {
            font-family: Microsoft Yahei;
            font-weight: normal;
            font-size: 14px;
            color: whitesmoke;
            padding: 0 20px;
          }
        }
      }
    }
    .first-secondpart {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: calc(100%);
      height: calc(40%);
    }
  }
  .second {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: calc(34% - 5px);
    height: calc(100%);
    .second-onepart {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-bottom: 10px;
      width: calc(100%);
      height: calc(36%);
    }
    .second-secondpart {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: calc(100%);
      height: calc(64%);
    }
  }
}
</style>
