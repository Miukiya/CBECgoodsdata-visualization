<template>
  <div id="companyPie">
    <div id="newGoods"></div>
  </div>
</template>
<script>
export default {
  name: "companyPie",
  data() {
    return {
      // 2016
      goods_2016: [],
      company_good1_2016: [
        // { name: "企业1", value: 350 },
        // { name: "企业2", value: 500 },
        // { name: "企业3", value: 200 },
        // { name: "企业4", value: 250 },
        // { name: "企业5", value: 702 }
      ],
      company_good2_2016: [],
      company_good3_2016: [],
      company_good4_2016: [],
      // 2017
      goods_2017: [],
      company_good1_2017: [],
      company_good2_2017: [],
      company_good3_2017: [],
      company_good4_2017: [],
      // 2018
      goods_2018: [],
      company_good1_2018: [],
      company_good2_2018: [],
      company_good3_2018: [],
      company_good4_2018: [],
      // 2019
      goods_2019: [],
      company_good1_2019: [],
      company_good2_2019: [],
      company_good3_2019: [],
      company_good4_2019: [],
      // 2020
      goods_2020: [],
      company_good1_2020: [],
      company_good2_2020: [],
      company_good3_2020: [],
      company_good4_2020: [],
      // 2021
      goods_2021: [],
      company_good1_2021: [],
      company_good2_2021: [],
      company_good3_2021: [],
      company_good4_2021: [],
      // color
      colorList: ["#f5d4da", "#f5e0ba", "#f5eaa4", "#d1edc1", "#dceef1"]
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
          // 2016
          let title_2016 = [];
          this.goods_2016 = res[0].year_2016.goods_2016;
          this.company_good1_2016 = res[0].year_2016.company_good1_2016;
          this.company_good2_2016 = res[0].year_2016.company_good2_2016;
          this.company_good3_2016 = res[0].year_2016.company_good3_2016;
          this.company_good4_2016 = res[0].year_2016.company_good4_2016;
          let goods_2016 = JSON.parse(JSON.stringify(this.goods_2016));
          let company_good1_2016 = JSON.parse(
            JSON.stringify(this.company_good1_2016)
          );
          let company_good2_2016 = JSON.parse(
            JSON.stringify(this.company_good2_2016)
          );
          let company_good3_2016 = JSON.parse(
            JSON.stringify(this.company_good3_2016)
          );
          let company_good4_2016 = JSON.parse(
            JSON.stringify(this.company_good4_2016)
          );
          // 动态显示title
          title_2016.push({
            text: "各年份货值前四商品及各商品货值排序前五企业构成", // 副标
            top: "8%",
            right: "1%",
            textStyle: {
              color: "rgb(255, 255, 255, 0.8)",
              fontSize: "12px",
              fontWeight: "normal"
            }
          });
          goods_2016.forEach((good, idx) => {
            title_2016.push({
              textBaseline: "middle",
              left: ((idx + 0.45) * 100) / 4 + "%",
              bottom: 0,
              text: good,
              textStyle: {
                color: "whitesmoke",
                fontSize: "14px",
                fontWeight: "normal"
              }
            });
          });
          // 2017
          let title_2017 = [];
          this.goods_2017 = res[1].year_2017.goods_2017;
          this.company_good1_2017 = res[1].year_2017.company_good1_2017;
          this.company_good2_2017 = res[1].year_2017.company_good2_2017;
          this.company_good3_2017 = res[1].year_2017.company_good3_2017;
          this.company_good4_2017 = res[1].year_2017.company_good4_2017;
          let goods_2017 = JSON.parse(JSON.stringify(this.goods_2017));
          let company_good1_2017 = JSON.parse(
            JSON.stringify(this.company_good1_2017)
          );
          let company_good2_2017 = JSON.parse(
            JSON.stringify(this.company_good2_2017)
          );
          let company_good3_2017 = JSON.parse(
            JSON.stringify(this.company_good3_2017)
          );
          let company_good4_2017 = JSON.parse(
            JSON.stringify(this.company_good4_2017)
          );
          title_2017.push({
            text: "各年份货值前四商品及各商品货值排序前五企业构成", // 副标
            top: "8%",
            right: "1%",
            textStyle: {
              color: "rgb(255, 255, 255, 0.8)",
              fontSize: "12px",
              fontWeight: "normal"
            }
          });
          goods_2017.forEach((good, idx) => {
            title_2017.push({
              textBaseline: "middle",
              left: ((idx + 0.42) * 100) / 4 + "%",
              bottom: 0,
              text: good,
              textStyle: {
                color: "whitesmoke",
                fontSize: "14px",
                fontWeight: "normal"
              }
            });
          });
          // 2018
          let title_2018 = [];
          this.goods_2018 = res[2].year_2018.goods_2018;
          this.company_good1_2018 = res[2].year_2018.company_good1_2018;
          this.company_good2_2018 = res[2].year_2018.company_good2_2018;
          this.company_good3_2018 = res[2].year_2018.company_good3_2018;
          this.company_good4_2018 = res[2].year_2018.company_good4_2018;
          let goods_2018 = JSON.parse(JSON.stringify(this.goods_2018));
          let company_good1_2018 = JSON.parse(
            JSON.stringify(this.company_good1_2018)
          );
          let company_good2_2018 = JSON.parse(
            JSON.stringify(this.company_good2_2018)
          );
          let company_good3_2018 = JSON.parse(
            JSON.stringify(this.company_good3_2018)
          );
          let company_good4_2018 = JSON.parse(
            JSON.stringify(this.company_good4_2018)
          );
          title_2018.push({
            text: "各年份货值前四商品及各商品货值排序前五企业构成", // 副标
            top: "8%",
            right: "1%",
            textStyle: {
              color: "rgb(255, 255, 255, 0.8)",
              fontSize: "12px",
              fontWeight: "normal"
            }
          });
          goods_2018.forEach((good, idx) => {
            title_2018.push({
              textBaseline: "middle",
              left: ((idx + 0.4) * 100) / 4 + "%",
              bottom: 0,
              text: good,
              textStyle: {
                color: "whitesmoke",
                fontSize: "14px",
                fontWeight: "normal"
              }
            });
          });
          // 2019
          let title_2019 = [];
          this.goods_2019 = res[3].year_2019.goods_2019;
          this.company_good1_2019 = res[3].year_2019.company_good1_2019;
          this.company_good2_2019 = res[3].year_2019.company_good2_2019;
          this.company_good3_2019 = res[3].year_2019.company_good3_2019;
          this.company_good4_2019 = res[3].year_2019.company_good4_2019;
          let goods_2019 = JSON.parse(JSON.stringify(this.goods_2019));
          let company_good1_2019 = JSON.parse(
            JSON.stringify(this.company_good1_2019)
          );
          let company_good2_2019 = JSON.parse(
            JSON.stringify(this.company_good2_2019)
          );
          let company_good3_2019 = JSON.parse(
            JSON.stringify(this.company_good3_2019)
          );
          let company_good4_2019 = JSON.parse(
            JSON.stringify(this.company_good4_2019)
          );
          title_2019.push({
            text: "各年份货值前四商品及各商品货值排序前五企业构成", // 副标
            top: "8%",
            right: "1%",
            textStyle: {
              color: "rgb(255, 255, 255, 0.8)",
              fontSize: "12px",
              fontWeight: "normal"
            }
          });
          goods_2019.forEach((good, idx) => {
            title_2019.push({
              textBaseline: "middle",
              left: ((idx + 0.45) * 100) / 4 + "%",
              bottom: 0,
              text: good,
              textStyle: {
                color: "whitesmoke",
                fontSize: "14px",
                fontWeight: "normal"
              }
            });
          });
          // 2020
          let title_2020 = [];
          this.goods_2020 = res[4].year_2020.goods_2020;
          this.company_good1_2020 = res[4].year_2020.company_good1_2020;
          this.company_good2_2020 = res[4].year_2020.company_good2_2020;
          this.company_good3_2020 = res[4].year_2020.company_good3_2020;
          this.company_good4_2020 = res[4].year_2020.company_good4_2020;
          let goods_2020 = JSON.parse(JSON.stringify(this.goods_2020));
          let company_good1_2020 = JSON.parse(
            JSON.stringify(this.company_good1_2020)
          );
          let company_good2_2020 = JSON.parse(
            JSON.stringify(this.company_good2_2020)
          );
          let company_good3_2020 = JSON.parse(
            JSON.stringify(this.company_good3_2020)
          );
          let company_good4_2020 = JSON.parse(
            JSON.stringify(this.company_good4_2020)
          );
          title_2020.push({
            text: "各年份货值前四商品及各商品货值排序前五企业构成", // 副标
            top: "8%",
            right: "1%",
            textStyle: {
              color: "rgb(255, 255, 255, 0.8)",
              fontSize: "12px",
              fontWeight: "normal"
            }
          });
          goods_2020.forEach((good, idx) => {
            title_2020.push({
              textBaseline: "middle",
              left: ((idx + 0.2) * 100) / 4 + "%",
              bottom: 0,
              text: good,
              textStyle: {
                color: "whitesmoke",
                fontSize: "14px",
                fontWeight: "normal"
              }
            });
          });
          // 2021
          let title_2021 = [];
          this.goods_2021 = res[5].year_2021.goods_2021;
          this.company_good1_2021 = res[5].year_2021.company_good1_2021;
          this.company_good2_2021 = res[5].year_2021.company_good2_2021;
          this.company_good3_2021 = res[5].year_2021.company_good3_2021;
          this.company_good4_2021 = res[5].year_2021.company_good4_2021;
          let goods_2021 = JSON.parse(JSON.stringify(this.goods_2021));
          let company_good1_2021 = JSON.parse(
            JSON.stringify(this.company_good1_2021)
          );
          let company_good2_2021 = JSON.parse(
            JSON.stringify(this.company_good2_2021)
          );
          let company_good3_2021 = JSON.parse(
            JSON.stringify(this.company_good3_2021)
          );
          let company_good4_2021 = JSON.parse(
            JSON.stringify(this.company_good4_2021)
          );
          title_2021.push({
            text: "各年份货值前四商品及各商品货值排序前五企业构成", // 副标
            top: "8%",
            right: "1%",
            textStyle: {
              color: "rgb(255, 255, 255, 0.8)",
              fontSize: "12px",
              fontWeight: "normal"
            }
          });
          goods_2021.forEach((good, idx) => {
            title_2021.push({
              textBaseline: "middle",
              left: ((idx + 0.15) * 100) / 4 + "%",
              bottom: 0,
              text: good,
              textStyle: {
                color: "whitesmoke",
                fontSize: "14px",
                fontWeight: "normal"
              }
            });
          });
          this.$nextTick(() => {
            setTimeout(() => {
              let dom = this.$echarts.getInstanceByDom(
                document.getElementById("newGoods")
              );
              // 图表存在，更新数据
              if (dom !== null) {
                dom.setOption({
                  // 各年份数据
                  options: [
                    // 2016年对应option
                    {
                      title: title_2016,
                      series: [
                        // 第一组
                        {
                          data: [
                            {
                              value: company_good1_2016.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good1_2016.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第二组
                        {
                          data: [
                            {
                              value: company_good2_2016.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good2_2016.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第三组
                        {
                          data: [
                            {
                              value: company_good3_2016.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good3_2016.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第四组
                        {
                          data: [
                            {
                              value: company_good4_2016.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good4_2016.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        }
                      ]
                    },
                    // 2017年对应option
                    {
                      title: title_2017,
                      series: [
                        // 第一组
                        {
                          data: [
                            {
                              value: company_good1_2017.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good1_2017.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第二组
                        {
                          data: [
                            {
                              value: company_good2_2017.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good2_2017.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第三组
                        {
                          data: [
                            {
                              value: company_good3_2017.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good3_2017.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第四组
                        {
                          data: [
                            {
                              value: company_good4_2017.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good4_2017.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        }
                      ]
                    },
                    // 2018年对应option
                    {
                      title: title_2018,
                      series: [
                        // 第一组
                        {
                          data: [
                            {
                              value: company_good1_2018.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good1_2018.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第二组
                        {
                          data: [
                            {
                              value: company_good2_2018.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good2_2018.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第三组
                        {
                          data: [
                            {
                              value: company_good3_2018.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good3_2018.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第四组
                        {
                          data: [
                            {
                              value: company_good4_2018.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good4_2018.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        }
                      ]
                    },
                    // 2019年对应option
                    {
                      title: title_2019,
                      series: [
                        // 第一组
                        {
                          data: [
                            {
                              value: company_good1_2019.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good1_2019.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第二组
                        {
                          data: [
                            {
                              value: company_good2_2019.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good2_2019.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第三组
                        {
                          data: [
                            {
                              value: company_good3_2019.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good3_2019.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第四组
                        {
                          data: [
                            {
                              value: company_good4_2019.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good4_2019.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        }
                      ]
                    },
                    // 2020年对应option
                    {
                      title: title_2020,
                      series: [
                        // 第一组
                        {
                          data: [
                            {
                              value: company_good1_2020.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good1_2020.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第二组
                        {
                          data: [
                            {
                              value: company_good2_2020.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good2_2020.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第三组
                        {
                          data: [
                            {
                              value: company_good3_2020.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good3_2020.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第四组
                        {
                          data: [
                            {
                              value: company_good4_2020.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good4_2020.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        }
                      ]
                    },
                    // 2021年对应option
                    {
                      title: title_2021,
                      series: [
                        // 第一组
                        {
                          data: [
                            {
                              value: company_good1_2021.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good1_2021.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第二组
                        {
                          data: [
                            {
                              value: company_good2_2021.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good2_2021.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第三组
                        {
                          data: [
                            {
                              value: company_good3_2021.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good3_2021.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        },
                        // 第四组
                        {
                          data: [
                            {
                              value: company_good4_2021.map(item => {
                                let value = this.sqrtradarData(item.value);
                                return value;
                              }),
                              symbolSize: 8,
                              lineStyle: {
                                width: 1 // 折线样式
                              }
                            }
                          ]
                        },
                        {
                          data: company_good4_2021.map(item => {
                            return {
                              name: item.name,
                              value: item.value
                            };
                          })
                        }
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
    this.newGoods(); // 雷达图
  },
  methods: {
    sqrtradarData(data) {
      let arr = Math.sqrt(Math.sqrt(Math.sqrt(data)));
      return arr;
    },
    newGoods() {
      let newGoods = this.$echarts.init(document.getElementById("newGoods"));
      // 配置雷达指示器，注意有5个企业
      let indicator = [
        { name: "企业名", max: 12, unit: "￥" },
        { name: "企业名", max: 12, unit: "￥" },
        { name: "企业名", max: 12, unit: "￥" },
        { name: "企业名", max: 12, unit: "￥" },
        { name: "企业名", max: 12, unit: "￥" }
      ];
      let option = {
        timeline: {
          axisType: "category",
          data: ["2016", "2017", "2018", "2019", "2020", "2021"],
          autoPlay: true, // 自动播放
          playInterval: 2500, // 播放速度
          left: "2%",
          right: "25%",
          top: "2%"
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff"
          }
          // formatter: params => {
          //   if (params.componentType !== "timeline") {
          //     return params.name + ": " + params.value;
          //   }
          // }
        },
        // 雷达图
        radar: [
          {
            id: "good1",
            zlevel: 11,
            shape: "circle",
            scale: true,
            indicator: indicator,
            center: ["14%", "53%"],
            radius: "54%",
            axisNameGap: "0",
            startAngle: 90,
            axisName: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitArea: {
              areaStyle: {
                color: "rgba(32,126,255, 0.1)"
              }
            }
          },
          {
            id: "good2",
            zlevel: 11,
            shape: "circle",
            scale: true,
            indicator: indicator,
            center: ["38.3%", "53%"],
            radius: "54%",
            axisNameGap: "0",
            startAngle: 90,
            axisName: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitArea: {
              areaStyle: {
                color: "rgba(32,126,255, 0.1)"
              }
            }
          },
          {
            id: "good3",
            zlevel: 11,
            shape: "circle",
            scale: true,
            indicator: indicator,
            center: ["63%", "53%"],
            radius: "54%",
            axisNameGap: "0",
            startAngle: 90,
            axisName: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitArea: {
              areaStyle: {
                color: "rgba(32,126,255, 0.1)"
              }
            }
          },
          {
            id: "good4",
            zlevel: 11,
            shape: "circle",
            scale: true,
            indicator: indicator,
            center: ["88%", "53%"],
            radius: "54%",
            axisNameGap: "0",
            startAngle: 90,
            axisName: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(32,126,255, .5)"
              }
            },
            splitArea: {
              areaStyle: {
                color: "rgba(32,126,255, 0.1)"
              }
            }
          }
        ],
        series: [
          // 第一组
          {
            type: "radar",
            radarIndex: 0,
            symbolSize: 12,
            symbol: "circle",
            tooltip: {
              trigger: "none"
            },
            label: {
              show: true,
              color: "#00ffff", // 字体颜色
              formatter: params => {
                let data = Math.pow(Math.pow(Math.pow(params.value, 2), 2), 2);
                let value = Math.round(data);
                if (params.value !== 0) {
                  return value; // 数据显示
                } else {
                  return "";
                }
              },
              fontSize: 12
            },
            // itemStyle: {},
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(32,126,255, 0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(32,126,255, 0.1)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            zlevel: 20,
            z: 4
          },
          {
            type: "pie",
            startAngle: 90,
            clockwise: false, //逆时针
            radius: ["55%", "70%"],
            center: ["14%", "53%"],
            zlevel: -1,
            label: {
              position: "inside",
              formatter: "{b}",
              fontSize: 12,
              fontWeight: "bolder",
              rotate: "tangential", // 文字旋转
              color: "#000",
              // textShadowBlur: 3,
              // textShadowColor: "rgba(152, 81, 85, 0.3)",
              width: 50,
              overflow: "truncate" // 文字超出宽度截断
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: params => {
                return this.colorList[params.dataIndex];
              },
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.8)"
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          // 第二组
          {
            type: "radar",
            radarIndex: 1,
            symbolSize: 12,
            symbol: "circle",
            tooltip: {
              trigger: "none"
            },
            label: {
              show: true,
              color: "#00ffff", // 字体颜色
              formatter: params => {
                let data = Math.pow(Math.pow(Math.pow(params.value, 2), 2), 2);
                let value = Math.round(data);
                if (params.value !== 0) {
                  return value; // 数据显示
                } else {
                  return "";
                }
              },
              fontSize: 12
            },
            // itemStyle: {},
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(32,126,255, 0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(32,126,255, 0.1)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            zlevel: 20,
            z: 4
          },
          {
            type: "pie",
            startAngle: 90,
            clockwise: false, //逆时针
            radius: ["55%", "70%"],
            center: ["38.3%", "53%"],
            zlevel: -1,
            label: {
              position: "inside",
              formatter: "{b}",
              fontSize: 12,
              fontWeight: "bolder",
              rotate: "tangential", // 文字旋转
              color: "#000",
              // textShadowBlur: 3,
              // textShadowColor: "rgba(152, 81, 85, 0.3)",
              width: 50,
              overflow: "truncate" // 文字超出宽度截断
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: params => {
                return this.colorList[params.dataIndex];
              },
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.8)"
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          // 第三组
          {
            type: "radar",
            radarIndex: 2,
            symbolSize: 12,
            symbol: "circle",
            tooltip: {
              trigger: "none"
            },
            label: {
              show: true,
              color: "#00ffff", // 字体颜色
              formatter: params => {
                let data = Math.pow(Math.pow(Math.pow(params.value, 2), 2), 2);
                let value = Math.round(data);
                if (params.value !== 0) {
                  return value; // 数据显示
                } else {
                  return "";
                }
              },
              fontSize: 12
            },
            // itemStyle: {},
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(32,126,255, 0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(32,126,255, 0.1)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            zlevel: 20,
            z: 4
          },
          {
            type: "pie",
            startAngle: 90,
            clockwise: false, //逆时针
            radius: ["55%", "70%"],
            center: ["63%", "53%"],
            zlevel: -1,
            label: {
              position: "inside",
              formatter: "{b}",
              fontSize: 12,
              fontWeight: "bolder",
              rotate: "tangential", // 文字旋转
              color: "#000",
              // textShadowBlur: 3,
              // textShadowColor: "rgba(152, 81, 85, 0.3)",
              width: 50,
              overflow: "truncate" // 文字超出宽度截断
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: params => {
                return this.colorList[params.dataIndex];
              },
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.8)"
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          // 第四组
          {
            type: "radar",
            radarIndex: 3,
            symbolSize: 12,
            symbol: "circle",
            tooltip: {
              trigger: "none"
            },
            label: {
              show: true,
              color: "#00ffff", // 字体颜色
              formatter: params => {
                let data = Math.pow(Math.pow(Math.pow(params.value, 2), 2), 2);
                let value = Math.round(data);
                if (params.value !== 0) {
                  return value; // 数据显示
                } else {
                  return "";
                }
              },
              fontSize: 12
            },
            // itemStyle: {},
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(32,126,255, 0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(32,126,255, 0.1)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            zlevel: 20,
            z: 4
          },
          {
            type: "pie",
            startAngle: 90,
            clockwise: false, //逆时针
            radius: ["55%", "70%"],
            center: ["88%", "53%"],
            zlevel: -1,
            label: {
              position: "inside",
              formatter: "{b}",
              fontSize: 12,
              fontWeight: "bolder",
              rotate: "tangential", // 文字旋转
              color: "#000",
              // textShadowBlur: 3,
              // textShadowColor: "rgba(152, 81, 85, 0.3)",
              width: 50,
              overflow: "truncate" // 文字超出宽度截断
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: params => {
                return this.colorList[params.dataIndex];
              },
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.8)"
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        // 各年份数据
        options: [
          // 2016年对应option
          {
            title: {},
            series: [
              { data: [] },   // 系列1数据
              { data: [] },   // 系列2数据
              { data: [] },   // 系列3数据
              { data: [] },   // 系列4数据
              { data: [] },   // 系列5数据
              { data: [] },   // 系列6数据
              { data: [] },   // 系列7数据
              { data: [] }    // 系列8数据
            ]
          },
          // 2017年对应option
          {
            title: {},
            series: [
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] }
            ]
          },
          // 2018年对应option
          {
            title: {},
            series: [
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] }
            ]
          },
          // 2019年对应option
          {
            title: {},
            series: [
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] }
            ]
          },
          // 2020年对应option
          {
            title: {},
            series: [
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] }
            ]
          },
          // 2021年对应option
          {
            title: {},
            series: [
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] },
              { data: [] }
            ]
          }
        ]
      };
      newGoods.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          newGoods.resize();
        };
      }, 200);
    }
  }
};
</script>
<style lang="scss">
#companyPie {
  #newGoods {
    width: calc(100%);
    height: 379px;
  }
}
</style>
