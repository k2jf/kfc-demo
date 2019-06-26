<!-- 添加角色对话框 -->
<template>
  <Modal
    title="添加已有角色"
    width="700"
    :maskClosable="false"
    :loading="isLoading"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel"
  >
    <Transfer
      :data="role.data"
      filterable
      :style="{width: '702px', margin: '0 auto'}"
      :list-style="{height: '400px', width: '300px'}"
      :target-keys="role.selectKeys"
      :selected-keys="role.selectKeys"
      :titles="role.titles"
      @on-change="handleChange"
      @on-dblclick="handleChange">
    </Transfer>
  </Modal>
</template>

<script>
import { Modal } from 'iview'
import Transfer from '@/components/kfc-transfer'

import api from '../api'

export default {
  name: 'RoleEdit',
  components: {
    Modal,
    Transfer
  },
  props: {
    currentGroup: {
      type: Object,
      required: true
    },
    isShowRoleModal: {
      type: Boolean,
      required: true
    },
    currentRoleList: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      isShowModal: this.isShowRoleModal,
      isLoading: true,
      role: {
        data: [],
        selectKeys: [...this.currentRoleList],
        titles: ['未选角色', '已选角色']
      }
    }
  },
  watch: {
    isShowRoleModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
        if (this.role.data.length) return
        this.getRoleList()
      }
    },
    currentRoleList: {
      handler (curVal, oldVal) {
        this.role.selectKeys = [...curVal]
      }
    }
  },
  methods: {
    // 添加角色
    onClickOk () {
      let roleIds = this.role.selectKeys.join(',')
      if (!roleIds) {
        this.$Message.warning('请选择角色！')
        this.isLoading = false
        this.$nextTick(() => {
          this.isLoading = true
        })
        return
      }

      this.$axios.put(`${api.rowners}/${this.currentGroup.id}/roles?roleIds=${roleIds}`).then(res => {
        this.$Message.success('添加成功！')
        this.$emit('on-submit')
      }).finally(() => {
        this.isLoading = false
        this.$nextTick(() => {
          this.isLoading = true
        })
      })
    },
    onClickCancel () {
      this.$emit('on-close')
    },
    getRoleList () {
      this.$axios.get(`${api.roles}`).then(res => {
        this.role.data = res.data.body.roles.map(item => {
          return {
            key: item.id,
            label: item.name
          }
        })
      })
    },
    handleChange (selection) {
      this.role.selectKeys = selection
    }
  }
}
</script>
