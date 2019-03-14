import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import KFCFrame from '@/components/kfc-frame'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'demo',
      component: KFCFrame,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/page2',
          name: 'page2',
          component: Home
        }
      ]
    }
  ]
})
