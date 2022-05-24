import Vue from 'vue'
import Router from 'vue-router'
import good from '@/view/good'
import person from '@/view/person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'good',
      component: good
    },
    {
      path: '/person',
      name: 'person',
      component: person
    }
  ]
})
