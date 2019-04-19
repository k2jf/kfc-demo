<template>
  <Card class="container">
    <Split v-model="split">
      <div slot="left">
        <RoleInfo @on-role-change="getCurrentRole" />
      </div>
      <div slot="right">
        <Tabs
          type="line"
          v-model="currentTab">
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
    GroupList
  },
  data () {
    return {
      split: 0.2,
      currentTab: 'group',
      currentRole: null
    }
  },
  methods: {
    getCurrentRole (currentRole) {
      this.currentRole = currentRole
    }
  }
}
</script>

<style lang="css" scoped>
.ivu-tabs {
  height: 100%;
}
</style>
