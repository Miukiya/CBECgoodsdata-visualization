// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';             // 引入组件库
import dataV from '@jiaminghi/data-view';       // 引入 dataV组件
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';              // 引入echarts
import 'echarts-wordcloud';                      // 引入词云库
import geoJsonChina from '@/utils/china.json';        // 引入中国地图
import geoJsonWorld from '@/utils/world.json';        // 引入世界地图

echarts.registerMap('china', geoJsonChina);           // 注册地图
echarts.registerMap('world', geoJsonWorld);

Vue.use(ElementUI);
Vue.use(dataV);

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;               // 在原型链上注册eharts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
