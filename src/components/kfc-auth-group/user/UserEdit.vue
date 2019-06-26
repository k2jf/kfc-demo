<!-- 添加用户对话框 -->
<template>
  <Modal
    title="添加已有用户"
    width="700"
    :maskClosable="false"
    :loading="isLoading"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel"
  >
    <Transfer
      :data="user.data"
      filterable
      :style="{width: '702px', margin: '0 auto'}"
      :list-style="{height: '400px', width: '300px'}"
      :target-keys="user.selectKeys"
      :selected-keys="user.selectKeys"
      :titles="user.titles"
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
  name: 'UserEdit',
  components: {
    Modal,
    Transfer
  },
  props: {
    currentGroup: {
      type: Object,
      required: true
    },
    isShowUserModal: {
      type: Boolean,
      required: true
    },
    currentUserList: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      isShowModal: this.isShowUserModal,
      isLoading: true,
      user: {
        titles: ['未选用户', '已选用户'],
        data: [],
        selectKeys: [...this.currentUserList]
      }
    }
  },
  watch: {
    isShowUserModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
        if (this.user.data.length) return
        this.getUserList()
      }
    },
    currentUserList: {
      handler (curVal, oldVal) {
        this.user.selectKeys = [...curVal]
      }
    }
  },
  methods: {
    // 添加用户
    onClickOk () {
      let userIds = this.user.selectKeys.join(',')
      if (!userIds) {
        this.$Message.warning('请选择用户！')
        this.isLoading = false
        this.$nextTick(() => {
          this.isLoading = true
        })
        return
      }

      this.$axios.put(`${api.groups}/${this.currentGroup.id}/users`, { userIds }).then(res => {
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
    getUserList () {
      // 获取所有用户
      this.$axios.get(`${api.users}`).then(res => {
        this.user.data = res.data.body.users.map(item => {
          return {
            key: item.id,
            label: item.name
          }
        })
      })
    },
    handleChange (selection) {
      this.user.selectKeys = selection
    }
  }
}
</script>
