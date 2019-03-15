import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import KFCFrame from '@/components/kfc-frame'
import TimeSeries from '@/components/kfc-timeseries-chart'
import Authorization from '@/components/kfc-auth'
import Jobs from '@/components/kfc-jobs'
// import DataTypeSelector from '@/components/kfc-datatype-selector'
import DataTypeSelector from '@/views/datatypeselector'
import fieldselector from '@/views/fieldselector'
import pasresults from '@/views/pasresults'
import ProjectList from '@/components/kfc-data-project'
import PasProjectDetail from '@/components/kfc-project-detail'
import DataCompleteness from '@/components/kfc-data-completeness'

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
        },
        {
          path: '/dataTypeSelector',
          name: 'dataTypeSelector',
          component: DataTypeSelector
        },
        {
          path: '/fieldselector',
          name: 'fieldselector',
          component: fieldselector
        },
        {
          path: '/completeness',
          name: 'completeness',
          component: DataCompleteness
        },
        {
          path: '/pasprojects',
          name: 'pasprojects',
          component: ProjectList
        },
        {
          path: '/pasprojectdetail',
          name: 'pasprojectdetail',
          component: PasProjectDetail
        },
        {
          path: '/pasjobs',
          name: 'pasjobs',
          component: Jobs
        },
        {
          path: '/pasresults',
          name: 'pasresults',
          component: pasresults
        }
      ]
    }
  ]
})
