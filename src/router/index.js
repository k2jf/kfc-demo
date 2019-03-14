import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import KFCFrame from '@/components/kfc-frame'
import TimeSeries from '@/components/kfc-timeseries-chart'
import Authorization from '@/components/kfc-auth'

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
          path: '/timeseries',
          name: 'timeseries',
          component: TimeSeries
        },
        {
          path: '/auth',
          name: 'auth',
          component: Authorization
        }
      ]
    }
  ]
})
