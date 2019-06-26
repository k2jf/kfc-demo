<template>
  <Card class="container">
    <Split v-model="split">
      <div slot="left">
        <GroupInfo :isReloadGroupList="isReloadGroupList" @on-group-change="getCurrentGroup" />
      </div>
      <div slot="right">
        <Tabs
          type="line"
          v-model="currentTab">
          <TabPane
            label="详情"
            name="group"
            class="tab-pane">
            <GroupDetail
              :currentGroup="currentGroup"
              v-if="currentGroup"
              @on-modify-group="onModifyGroup" />
          </TabPane>
          <TabPane
            label="用户"
            name="user"
            class="tab-pane">
            <UserList :currentGroup="currentGroup" v-if="currentGroup" />
          </TabPane>
          <TabPane
            label="角色"
            name="role"
            class="tab-pane">
            <RoleList :currentGroup="currentGroup" v-if="currentGroup" />
          </TabPane>
        </Tabs>
      </div>
    </Split>
  </Card>
</template>

<script>
import { Split, Tabs, TabPane, Card } from 'iview'

import GroupInfo from './group'
import GroupDetail from './group/GroupDetail.vue'
import RoleList from './role'
import UserList from './user'

export default {
  name: 'UserGroups',
  components: {
    Split,
    Tabs,
    TabPane,
    Card,
    GroupInfo,
    RoleList,
    UserList,
    GroupDetail
  },
  data () {
    return {
      split: 0.2,
      currentTab: 'group',
      currentGroup: null,
      isReloadGroupList: false
    }
  },
  methods: {
    getCurrentGroup (currentGroup) {
      this.currentGroup = currentGroup
    },
    onModifyGroup (currentGroup) {
      this.currentGroup = currentGroup
      this.isReloadGroupList = !this.isReloadGroupList
    }
  }
}
</script>

<style lang="css" scoped>
.ivu-tabs {
  height: 100%;
}
</style>
