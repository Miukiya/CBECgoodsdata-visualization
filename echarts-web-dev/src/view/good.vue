<template>
  <div id="goodPage">
    <div class="good">
      <div class="typebox">
        <el-row>
          <el-col :span="2">
            <div class="all">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAll"
                >全选</el-checkbox
              >
            </div>
          </el-col>
          <el-col :span="22">
            <div class="others">
              <el-row>
                <el-checkbox-group
                  v-model="checkTypes"
                  @change="handleCheckType"
                >
                  <el-col v-for="item in types" :key="item.id" :span="2">
                    <el-checkbox :label="item"></el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="contentSingle" v-if="isShowSingle">
        <div class="first">
          <div class="first-row1">
            <div class="first-row1-item1">
              <dv-border-box-12 class="first-row1-onepart">
                <total-quantity :data="singleQuantity"></total-quantity>
              </dv-border-box-12>
              <dv-border-box-12 class="first-row1-secondpart">
                <world-map :data="singleWorld"></world-map>
              </dv-border-box-12>
            </div>
            <dv-border-box-12 class="first-row1-item2">
              <type-line-pie :data="singleType"></type-line-pie>
              <word :data="singleWord"></word>
            </dv-border-box-12>
          </div>
          <dv-border-box-12 class="first-row2">
            <goods-value :data="singleValue"></goods-value>
          </dv-border-box-12>
        </div>
        <price
          class="second"
          :modeSource="singlePrice"
          :countrySource="singleCountryPrice"
        ></price>
      </div>
      <div class="contentMore" v-if="isShowMore">
        <div class="first">
          <dv-border-box-12 class="first-onepart">
            <value-more :data="moreValue"></value-more>
          </dv-border-box-12>
          <dv-border-box-12 class="first-secondpart">
            <quantity-more :data="moreQuantity"></quantity-more>
          </dv-border-box-12>
        </div>
        <div class="second">
          <div class="second-onepart">
            <dv-border-box-12 class="second-onepart-item1">
              <type-more :data="moreType"></type-more>
            </dv-border-box-12>
            <dv-border-box-12 class="second-onepart-item2">
              <word-more :data="moreWord"></word-more>
            </dv-border-box-12>
          </div>
          <dv-border-box-12 class="second-secondpart">
            <map-more :data="moreWorld"></map-more>
          </dv-border-box-12>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const typeOptions = [
  "动物和动物产品",
  "蔬菜产品",
  "动植物油脂",
  "预制食品",
  "矿物产品",
  "化学品及相关行业",
  "塑料/橡胶",
  "生皮、皮、皮革和毛皮",
  "木材和木制品",
  "木材或其他纤维材料浆",
  "纺织品",
  "鞋类/头饰",
  "石头/玻璃",
  "天然或养殖珍珠",
  "贱金属",
  "机械/电气",
  "运输",
  "精密仪器",
  "武器和弹药",
  "杂项制成品",
  "艺术作品",
  "特殊交易品及未分类商品"
];
import Word from "@/components/good/word.vue";
import Price from "@/components/good/price.vue";
import WorldMap from "@/components/good/worldMap.vue";
import GoodsValue from "@/components/good/goodsValue.vue";
import TypeLinePie from "@/components/good/typeLinePie.vue";
import TotalQuantity from "@/components/good/totalQuantity.vue";
import QuantityMore from "@/components/goodMore/quantityMore.vue";
import TypeMore from "@/components/goodMore/typeMore.vue";
import WordMore from "@/components/goodMore/wordMore.vue";
import ValueMore from "@/components/goodMore/valueMore.vue";
import MapMore from "@/components/goodMore/mapMore.vue";
import {
  getSingleQuantity,
  getMoreQuantity,
  getSingleValue,
  getSingleValueRank,
  getMoreValue,
  getMoreValueRank,
  getMoreType,
  getType,
  getSingleWorldMap,
  getMoreWorldMap,
  getWord,
  getSinglePirce,
  getSingleCountryPirce
} from "../request/goodApi";
export default {
  name: "goodPage",
  components: {
    Word, // 词云
    Price, // 商品单价
    WorldMap, // 商品进出口总额地缘分布
    GoodsValue, // 货值
    TypeLinePie, // 商品类别
    TotalQuantity, // 商品总数
    QuantityMore,
    TypeMore,
    WordMore,
    ValueMore,
    MapMore
  },
  data() {
    return {
      isShowMore: false,
      isShowSingle: false,
      checkAll: false,
      checkTypes: [],
      types: [],
      isIndeterminate: false,
      singleQuantity: [], // 单类商品数量
      moreQuantity: [], // 多类商品数量
      singleValue: [], // 单类商品货值
      moreValue: [], // 多类商品货值
      singleType: [], // 单类商品类别
      moreType: [], // 多类商品类别
      singleWorld: [], // 单类商品各国进出口总额
      moreWorld: [], // 多类商品各国进出口总额
      singleWord: [], // 单类商品词云
      moreWord: [], // 多类商品词云
      singlePrice: [], // 单类商品单价(进出口模式)
      singleCountryPrice: [] // 单类商品单价(国家)
    };
  },
  created() {
    this.showPage();
    // 全选传入值：typeOptions
    this.getMoreGoodQuantity(typeOptions);
    this.getMoreGoodValue(typeOptions);
    this.getMoreGoodType(typeOptions, typeOptions);
    this.getMoreGoodWorldMap(typeOptions);
    this.getMoreGoodWord(typeOptions);
  },
  mounted() {},
  methods: {
    showPage() {
      // 如果是全选:
      this.types = typeOptions;
      this.checkTypes = typeOptions;
      this.checkAll = true;
      this.isShowMore = true;
      // this.types = typeOptions;
      // this.checkTypes = ["动物和动物产品","蔬菜产品","动植物油脂"];
      // this.isIndeterminate = true;
      // this.isShowMore = true;
    },

    // 获取单类商品数量
    getSingleGoodQuantity(value) {
      this.singleQuantity = [];
      let params = { id: value };
      getSingleQuantity(params)
        .then(res => {
          let arr = res.slice(1);
          // 将0值转化为undefined，以适应对数轴
          for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i] === 0 ? undefined : arr[i];
          }
          this.singleQuantity = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取多类商品数量
    getMoreGoodQuantity(value) {
      this.moreQuantity = [];
      let params = { id: value };
      getMoreQuantity(params)
        .then(res => {
          let arr = res.slice(1);
          // 将0值转化为undefined，以适应对数轴
          for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i] === 0 ? undefined : arr[i];
          }
          this.moreQuantity = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取单类商品货值
    getSingleGoodValue(value) {
      this.singleValue = [];
      let data = [];
      let params = { id: value };
      // 2016-2021年总货值
      getSingleValue(params)
        .then(res => {
          this.$set(data, 0, res.slice(1));
        })
        .catch(err => {
          console.log(err);
        });
      // 各年货值排名前十的商品
      getSingleValueRank(params)
        .then(res => {
          res.map(item => {
            data.push(item.rank);
          });
          this.singleValue = data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取多类商品货值
    getMoreGoodValue(value) {
      this.moreValue = [];
      let polar = [];
      let rank = [];
      let params = { id: value };
      // 2016-2021年总货值
      getMoreValue(params)
        .then(res => {
          polar = res.slice(1);
          rank.push(polar);
        })
        .catch(err => {
          console.log(err);
        });
      // 各年货值排名前十的商品
      getMoreValueRank(params)
        .then(res => {
          res.map(item => {
            rank.push(item.rank);
          });
          this.moreValue = rank;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取单类商品 各类数量
    getSingleGoodType(typeList, value) {
      this.singleType = [];
      let params = { id: typeList };
      getMoreType(params)
        .then(res => {
          let arr = res;
          // 将0值转换为1，1值转换为1.5，以适应对数轴
          for (let i = 1; i <= 22; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              if (arr[i][j] === 0) {
                arr[i][j] = 1;
              } else if (arr[i][j] === 1) {
                arr[i][j] = 1.5;
              }
            }
          }
          this.singleType = arr;
        })
        .catch(err => {
          console.log(err);
        });
      let valueId = { id: value };
      getType(valueId)
        .then(res => {
          let dataIndex = res[0].id;
          this.singleType.push(dataIndex);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取多类商品 各类数量
    getMoreGoodType(typeList, value) {
      this.moreType = [];
      let params = { id: typeList };
      getMoreType(params)
        .then(res => {
          let arr = res;
          // 将0值转换为1，1值转换为1.5，以适应对数轴
          for (let i = 1; i <= 22; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              if (arr[i][j] === 0) {
                arr[i][j] = 1;
              } else if (arr[i][j] === 1) {
                arr[i][j] = 1.5;
              }
            }
          }
          this.moreType = arr;
          this.moreType.push(value);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取单类商品各国进出口总额
    getSingleGoodWorldMap(value) {
      this.singleWorld = [];
      let params = { id: value };
      getSingleWorldMap(params)
        .then(res => {
          this.singleWorld = res;
          // this.$set(this, 'singleWorld', res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取多类商品各国进出口总额
    getMoreGoodWorldMap(value) {
      this.moreWorld = [];
      let params = { id: value };
      getMoreWorldMap(params)
        .then(res => {
          this.moreWorld = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取单类商品词云
    getSingleGoodWord(value) {
      this.singleWord = [];
      let params = { id: value };
      getWord(params)
        .then(res => {
          this.singleWord = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取多类商品词云
    getMoreGoodWord(value) {
      this.moreWord = [];
      let params = { id: value };
      getWord(params)
        .then(res => {
          this.moreWord = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取单类商品单价（进出口模式）
    getSingleGoodPrice(value) {
      this.singlePrice = [];
      let params = { id: value };
      getSinglePirce(params)
        .then(res => {
          this.singlePrice = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取单类商品单价（国家）
    getSingleGoodCountryPrice(value) {
      this.singleCountryPrice = [];
      let params = { id: value };
      getSingleCountryPirce(params)
        .then(res => {
          this.singleCountryPrice = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleCheckAll(val) {
      this.checkTypes = val ? typeOptions : [];
      this.isIndeterminate = false;
      if (this.checkAll === true) {
        // 全选
        (this.isShowMore = true), (this.isShowSingle = false);
        this.getMoreGoodQuantity(typeOptions);
        this.getMoreGoodValue(typeOptions);
        this.getMoreGoodType(typeOptions, typeOptions);
        this.getMoreGoodWorldMap(typeOptions);
        this.getMoreGoodWord(typeOptions);
      } else if (this.checkAll === false) {
        (this.isShowMore = false), (this.isShowSingle = false);
      }
    },

    handleCheckType(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.types.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.types.length;
      if (checkedCount === 1) {
        // 单选
        (this.isShowSingle = true), (this.isShowMore = false);
        this.getSingleGoodQuantity(value[0]);
        this.getSingleGoodValue(value[0]);
        this.getSingleGoodType(typeOptions, value[0]);
        this.getSingleGoodWorldMap(value[0]);
        this.getSingleGoodWord(typeOptions);
        this.getSingleGoodPrice(value[0]);
        this.getSingleGoodCountryPrice(value[0]);
      } else if (checkedCount > 1) {
        // 多选
        (this.isShowMore = true), (this.isShowSingle = false);
        this.getMoreGoodQuantity(value);
        this.getMoreGoodValue(value);
        this.getMoreGoodType(typeOptions, value);
        this.getMoreGoodWorldMap(value);
        this.getMoreGoodWord(value);
      } else if (checkedCount === 0) {
        (this.isShowMore = false), (this.isShowSingle = false);
      }
    }
  }
};
</script>

<style lang="scss">
#goodPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  // background: 淡黄：#ffef92 深蓝：#5378a2;
  background: rgb(40, 44, 52);
  padding: 0 10px;
  .good {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 8px;
    width: calc(100%);
    .typebox {
      width: calc(100%);
      height: calc(6%);
      margin-bottom: 1px;
      padding: 3px 0;
      .el-checkbox__label {
        font-size: 12px !important;
        padding-left: 6px !important;
        line-height: 20px !important;
      }
      .others {
        .el-row {
          width: calc(100%);
          .el-checkbox-group {
            text-align: left;
            .el-col-2 {
              width: calc(9%);
            }
          }
        }
      }
    }
    .contentSingle {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: calc(100%);
      height: calc(94%);
      .first {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: calc(67%);
        height: calc(100%);
        margin-right: 10px;
        .first-row1 {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          width: calc(100%);
          height: calc(73%);
          margin-bottom: 10px;
          .first-row1-item1 {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: calc(42%);
            height: calc(100%);
            margin-right: 10px;
            .first-row1-onepart {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: row;
              width: calc(100%);
              height: calc(55%);
              margin-bottom: 10px;
            }
            .first-row1-secondpart {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: row;
              width: calc(100%);
              height: calc(45%);
            }
          }
          .first-row1-item2 {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: calc(58%);
            height: calc(100%);
            .el-card__body {
              padding: 10px;
            }
          }
        }
        .first-row2 {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          width: calc(100%);
          height: calc(27%);
        }
      }
      .second {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: calc(33%);
        height: calc(100%);
        .second-onepart {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: row;
          width: calc(100%);
          height: calc(60%);
          margin-bottom: 10px;
        }
        .second-secondpart {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: row;
          width: calc(100%);
          height: calc(40%);
        }
      }
    }
    .contentMore {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: calc(100%);
      height: calc(94%);
      .first {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        margin-right: 10px;
        width: calc(36%);
        height: calc(100%);
        .first-onepart {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          margin-bottom: 10px;
          width: calc(100%);
          height: calc(70%);
          .el-card__body {
            padding: 10px 0;
          }
        }
        .first-secondpart {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          width: calc(100%);
          height: calc(30%);
        }
      }
      .second {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: calc(64%);
        height: calc(100%);
        .second-onepart {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          margin-bottom: 10px;
          width: calc(100%);
          height: calc(40%);
          .second-onepart-item1 {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: calc(75%);
            height: calc(100%);
          }
          .second-onepart-item2 {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: calc(25%);
            height: calc(100%);
          }
        }
        .second-secondpart {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          height: calc(60%);
        }
      }
    }
  }
}
</style>
