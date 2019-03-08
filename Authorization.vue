<template>
  <div class="auth-split">
    <Split
      :value="0.2"
      :min="240"
      :max="250">
      <RoleInfo slot="left" @on-role-change="getCurrentRole" />
      <Tabs
        type="line"
        slot="right"
        v-model="currentTab">
        <div slot="extra">
          <Button
            type="primary"
            size="small"
            style="margin: 15px"
            v-if="currentTab === 'auth'"
            @click="isShowAuthModal = true"
          >
            添加权限
          </Button>
          <Button
            type="primary"
            size="small"
            style="margin: 15px"
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
      currentTab: 'user',
      isShowAuthModal: false,
      isShowUserModal: false,
      isReloadUserList: false,
      currentRole: null,
      resourceTypeList: [],
      permission: null,
      token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 获取资源类型列表
    init () {
      var xhr = new XMLHttpRequest()
      var url = 'http://10.12.20.36:28091/auth-service/v1/resourcetypes?type=all'

      xhr.open('GET', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.resourceTypeList = JSON.parse(xhr.responseText).result
        }
      }
      xhr.send(null)
    },
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
