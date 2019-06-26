<!-- 角色信息 -->
<template>
  <div>
    <Button
      type="default"
      long
      class="margin-bottom btn-add"
      @click="isShowRoleModal = true">
      创建角色
    </Button>
    <Input
      placeholder="搜索角色"
      class="margin-bottom"
      v-model="fuzzyName"
      @on-change="onSearchClick" />
    <RoleEdit
      :isShowRoleModal="isShowRoleModal"
      class="margin-bottom"
      @on-submit="onReloadList"
      @on-close="isShowRoleModal = false" />
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

import api from '../api'

export default {
  name: 'RoleInfo',
  components: {
    Button,
    Input,
    RoleEdit,
    RoleList
  },
  props: {
    isReloadRoleList: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      isShowRoleModal: false,
      fuzzyName: '',
      roleData: null,
      currentRole: null
    }
  },
  watch: {
    isReloadRoleList: {
      handler (curVal, oldVal) {
        this.getRoleList()
      }
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    getRoleList () {
      let url = this.fuzzyName ? `${api.roles}?fuzzyName=${this.fuzzyName}` : `${api.roles}`

      this.$axios.get(url).then(res => {
        this.roleData = res.data.body.roles
        if (this.currentRole) return
        this.currentRole = this.roleData[0]
        this.$emit('on-role-change', this.currentRole)
      })
    },
    // 新建成功更新角色列表
    onReloadList () {
      this.isShowRoleModal = false
      this.getRoleList()
    },
    // 选择角色
    onChangeRole (id) {
      this.currentRole = this.roleData.find(item => item.id === id)
      this.$emit('on-role-change', this.currentRole)
    },
    // 删除角色
    onDeleteRole (id) {
      this.$axios.delete(`${api.roles}/${id}`).then(res => {
        this.$Message.success('删除成功！')
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
