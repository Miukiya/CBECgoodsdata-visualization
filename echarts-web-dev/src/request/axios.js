import axios from 'axios'             // 引入axios
import qs from 'qs'  // 引入qs模块，序列化post类型数据
import Vue from 'vue'

Vue.prototype.$axios = axios     // 全局注册axios

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,    // 请求base url
  timeout: 5000    // 请求超时时间
})

// const rLoading = function () {
//   const loading = this.$loading({
//     lock: true,
//     text: '数据加载中...',
//     spinner: 'el-icon-loading',
//     target: '.sub-main',
//     body: true,
//     customClass: 'mask'
//   })
//   setTimeout(() => {
//     loading.close()
//   }, 5000)
//   return loading
// }

// request拦截器：对axios请求配置做统一处理
service.interceptors.request.use(
  config => {
    // post 请求参数放在data中，get请求参数放在params中
    config.method === 'post'
      ? config.data = qs.stringify({ ...config.data })
      : config.params = { ...config.params }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },

  error => {
    this.$message({
      message: "error",
      type: "warn"
    })
    Promise.reject(error)
  }
)

// respone拦截器：对响应做处理
service.interceptors.response.use(
  // 成功请求到数据
  response => {
    // console.log(response)
    // 对后端传过来的数据进行处理
    if (response.data) {
      return response.data
    } else {
      this.$message({
        message: "没有数据项！",
        type: "warn"
      })
    }
  },
  // 响应错误处理
  error => {
    console.log('error')
    console.log(error)
    console.log(JSON.stringify(error))

    let text = JSON.parse(JSON.stringify(error)).response.status === 404
      ? '404'
      : '网络异常，请重试'
    this.$message({
      type: 'warn',
      message: text
    })
    return Promise.reject(error)
  }
)

// 将axios实例暴露出去
export default service
