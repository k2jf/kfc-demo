<!-- 角色信息 -->
<template>
  <div slot="left">
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
      currentRole: null,
      token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    getRoleList () {
      var xhr = new XMLHttpRequest()
      var url = 'http://10.12.20.36:28091/auth-service/v1/roles?type=all'

      if (this.rolename) {
        url += `&rolename=${this.rolename}`
      }

      xhr.open('GET', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.roleData = JSON.parse(xhr.responseText).result
          if (this.currentRole) return
          this.currentRole = this.roleData[0]
          this.$emit('on-role-change', this.currentRole)
        }
      }
      xhr.send(null)
    },
    // 新建成功更新角色列表
    onReloadList () {
      this.isShowRoleModal = false
      setTimeout(this.getRoleList(), 3000)
    },
    // 选择角色
    onChangeRole (id) {
      this.currentRole = this.roleData.find(item => item.id === id)
      this.$emit('on-role-change', this.currentRole)
    },
    // 删除角色
    onDeleteRole (id) {
      var xhr = new XMLHttpRequest()
      var url = `http://10.12.20.36:28091/auth-service/v1/roles/${id}`

      xhr.open('DELETE', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          // 删除的角色为当前选中角色当前选中角色设置为null
          if (this.currentRole.id === id) {
            this.currentRole = null
          }
          this.getRoleList()
        }
      }
      xhr.send(null)
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
