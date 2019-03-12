<!-- 角色信息 -->
<template>
  <div style="height: 100%">
    <div class="auth-edit-pane">
      <Button
        type="default"
        long
        class="margin-bottom"
        @click="isShowRoleModal = true">
        创建角色
      </Button>
      <Input
        placeholder="搜索角色"
        class="margin-bottom"
        v-model="rolename"
        @on-change="onSearchClick" />
      <RoleEdit
        :isShowRoleModal="isShowRoleModal"
        class="margin-bottom"
        @on-submit="onReloadList"
        @on-close="isShowRoleModal = false" />
    </div>
    <RoleList
      :roleData="roleData"
      :currentRole="currentRole"
      @on-select="onChangeRole"
      @on-delete="onDeleteRole" />
  </div>
</template>

<script>
import { Input, Button } from 'iview'
import RoleEdit from './RoleEdit.vue'
import RoleList from './RoleList.vue'

import { api } from '../api'

export default {
  name: 'RoleInfo',
  components: {
    Button,
    Input,
    RoleEdit,
    RoleList
  },
  data () {
    return {
      isShowRoleModal: false,
      rolename: '',
      roleData: null,
      currentRole: null
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    getRoleList () {
      // var xhr = new XMLHttpRequest()
      let url = `${api.roles}?type=all`

      if (this.rolename) {
        url += `&rolename=${this.rolename}`
      }

      this.$axios.get(url).then(res => {
        this.roleData = res.data.result
        if (this.currentRole) return
        this.currentRole = this.roleData[0]
        this.$emit('on-role-change', this.currentRole)
      })
    },
    // 新建成功更新角色列表
    onReloadList () {
      this.isShowRoleModal = false
      setTimeout(this.getRoleList(), 5000)
    },
    // 选择角色
    onChangeRole (id) {
      this.currentRole = this.roleData.find(item => item.id === id)
      this.$emit('on-role-change', this.currentRole)
    },
    // 删除角色
    onDeleteRole (id) {
      this.$axios.delete(`${api.roles}/${id}`).then(res => {
        // 删除的角色为当前选中角色当前选中角色设置为null
        if (this.currentRole.id === id) {
          this.currentRole = null
        }
        this.getRoleList()
      })
    },
    onSearchClick () {
      this.getRoleList()
    }
  }
}
</script>

<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 6px;
}
</style>
