<template>
  <div id="app">
    <div class="header">
      <div class="header-start">
        <div class="title-menu">
          <i class="el-icon-menu"></i>
          <span slot="title">成都市地方跨境通关商品可视化系统</span>
        </div>
      </div>
      <div class="header-end">
        <div class="button-menu">
          <el-button round plain type="primary" size="small" @click="item1"
            >商品画像</el-button
          >
          <el-button round plain type="primary" size="small" @click="item2"
            >企业与消费者画像</el-button
          >
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  methods: {
    item1() {
      this.$router.push({ path: "/" });
    },
    item2() {
      this.$router.push({ path: "/person" });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin: 15px; */
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: calc(100%);
    height: calc(5%);
    background-color: #545c64;
    padding: 10px 0;
    .header-start {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      width: calc(50%);
      padding-left: 20px;
      .title-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        font-family: Microsoft Yahei;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        .el-icon-menu {
          margin-right: 5px;
        }
      }
    }
    .header-end {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: column;
      width: calc(50%);
      padding-right: 20px;
      .button-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        .el-button {
          font-family: Microsoft Yahei;
        }
      }
    }
  }
}
</style>
