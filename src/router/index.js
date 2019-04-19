import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import KFCFrame from '@/components/kfc-frame'
import TimeSeries from '@/views/timeseries'
import Authorization from '@/components/kfc-auth'
import Jobs from '@/components/kfc-jobs'
// import DataTypeSelector from '@/components/kfc-datatype-selector'
import DataTypeSelector from '@/views/datatypeselector'
import fieldselector from '@/views/fieldselector'
import pasresults from '@/views/pasresults'
import ProjectList from '@/components/kfc-data-project'
import pasprojectdetail from '@/views/pasprojectdetail'
import DataCompleteness from '@/components/kfc-data-completeness'
import KfcUserManage from '@/components/kfc-user-manage'
import Audit from '@/views/others/Audit'
import KFCModifyPassword from '@/components/kfc-frame/header/kfc-header-password.vue'
import KfcUser from '@/components/kfc-user'
import KfcAuthorization from '@/components/kfc-auth-manage'
import UserGroups from '@/components/kfc-user-groups'

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
          path: '/modify-password',
          name: 'modify-password',
          component: KFCModifyPassword
        },
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
          path: '/user',
          name: 'user',
          component: KfcUserManage
        },
        {
          path: '/auth',
          name: 'auth',
          component: Authorization
        },
        {
          path: '/user_1',
          name: 'user_1',
          component: KfcUser
        },
        {
          path: '/user-groups',
          name: 'user-groups',
          component: UserGroups
        },
        {
          path: '/auth_1',
          name: 'auth_1',
          component: KfcAuthorization
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
          component: pasprojectdetail
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
        },
        {
          path: '/audit',
          name: 'audit',
          component: Audit
        }
      ]
    }
  ]
})
