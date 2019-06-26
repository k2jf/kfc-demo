<template>
  <Card class="container">
    <Split v-model="split">
      <div slot="left">
        <RoleInfo :isReloadRoleList="isReloadRoleList" @on-role-change="getCurrentRole" />
      </div>
      <div slot="right">
        <Tabs
          type="line"
          v-model="currentTab">
          <TabPane
            label="详情"
            name="role"
            class="tab-pane">
            <RoleDetail
              :currentRole="currentRole"
              v-if="currentRole"
              @on-modify-role="onModifyRole" />
          </TabPane>
          <TabPane
            label="用户组"
            name="group"
            class="tab-pane">
            <GroupList :currentRole="currentRole" />
          </TabPane>
          <TabPane
            label="权限"
            name="auth"
            class="tab-pane">
            <ResourceInfo :currentRole="currentRole" />
          </TabPane>
        </Tabs>
      </div>
    </Split>
  </Card>
</template>

<script>
import { Split, Tabs, TabPane, Card } from 'iview'

import RoleInfo from './role'
import RoleDetail from './role/RoleDetail.vue'
import ResourceInfo from './resource'
import GroupList from './group'

export default {
  name: 'Authorization',
  components: {
    Split,
    Tabs,
    TabPane,
    Card,
    RoleInfo,
    ResourceInfo,
    GroupList,
    RoleDetail
  },
  data () {
    return {
      split: 0.2,
      currentTab: 'role',
      currentRole: null,
      isReloadRoleList: false
    }
  },
  methods: {
    getCurrentRole (currentRole) {
      this.currentRole = currentRole
    },
    onModifyRole (currentRole) {
      this.currentRole = currentRole
      this.isReloadRoleList = !this.isReloadRoleList
    }
  }
}
</script>

<style lang="css" scoped>
.ivu-tabs {
  height: 100%;
}
</style>
