<template>
  <div class="auth-split">
    <Split v-model="split">
      <div slot="left">
        <RoleInfo @on-role-change="getCurrentRole" />
      </div>
      <div slot="right">
        <Tabs
          type="line"
          v-model="currentTab">
          <div slot="extra">
            <Button
              type="primary"
              size="small"
              style="margin: 25px"
              v-if="currentTab === 'auth'"
              @click="isShowAuthModal = true"
            >
              添加权限
            </Button>
            <Button
              type="primary"
              size="small"
              style="margin: 25px"
              v-if="currentTab === 'user'"
              @click="isShowUserModal = true"
            >
              添加已有用户
            </Button>
          </div>
          <TabPane
            label="用户"
            name="user"
            class="user-pane">
            <UserList :currentRole="currentRole" :isReloadUserList="isReloadUserList" />
            <UserEdit
              :currentRole="currentRole"
              :isShowUserModal="isShowUserModal"
              v-if="currentRole"
              @on-submit="reloadUserList"
              @on-close="isShowUserModal = false" />
          </TabPane>
          <TabPane
            label="权限"
            name="auth"
            class="auth-pane">
            <ResourceInfo
              :currentRole="currentRole"
              :resourceTypeList="resourceTypeList"
              :permission="permission" />
            <ResourceEdit
              :currentRole="currentRole"
              :resourceTypeList="resourceTypeList"
              :isShowAuthModal="isShowAuthModal"
              v-if="currentRole"
              @on-submit="getPermission"
              @on-close="isShowAuthModal = false" />
          </TabPane>
        </Tabs>
      </div>
    </Split>
  </div>
</template>

<script>
import { Split, Button, Tabs, TabPane } from 'iview'

import RoleInfo from './role'
import ResourceInfo from './resource'
import UserList from './user'
import ResourceEdit from './resource/ResourceEdit.vue'
import UserEdit from './user/UserEdit.vue'

import { api } from './api'

export default {
  name: 'Authorization',
  components: {
    Split,
    Button,
    Tabs,
    TabPane,
    RoleInfo,
    ResourceInfo,
    ResourceEdit,
    UserList,
    UserEdit
  },
  data () {
    return {
      split: 0.2,
      currentTab: 'user',
      isShowAuthModal: false,
      isShowUserModal: false,
      isReloadUserList: false,
      currentRole: null,
      resourceTypeList: [],
      permission: null
    }
  },
  mounted () {
    // 获取资源类型列表
    this.$axios.get(`${api.resourceTypes}?type=all`).then(res => {
      this.resourceTypeList = res.data.result
    })
  },
  methods: {
    getCurrentRole (currentRole) {
      this.currentRole = currentRole
    },
    getPermission (permission) {
      this.isShowAuthModal = false
      this.permission = permission
    },
    reloadUserList () {
      this.isShowUserModal = false
      this.isReloadUserList = !this.isReloadUserList
    }
  }
}
</script>

<style lang="css" scoped>
.ivu-tabs {
  height: 100%;
}
</style>
