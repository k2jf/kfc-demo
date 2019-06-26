<!-- 添加用户组对话框 -->
<template>
  <Modal
    title="添加已有用户组"
    width="700"
    :maskClosable="false"
    :loading="isLoading"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel"
  >
    <Transfer
      :data="group.data"
      filterable
      :style="{width: '702px', margin: '0 auto'}"
      :list-style="{height: '400px', width: '300px'}"
      :target-keys="group.selectKeys"
      :selected-keys="group.selectKeys"
      :titles="group.titles"
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
  name: 'GroupEdit',
  components: {
    Modal,
    Transfer
  },
  props: {
    currentRole: {
      type: Object,
      required: true
    },
    isShowGroupModal: {
      type: Boolean,
      required: true
    },
    currentGroupList: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      isShowModal: this.isShowGroupModal,
      isLoading: true,
      group: {
        titles: ['未选用户组', '已选用户组'],
        data: [],
        selectKeys: []
      }
    }
  },
  watch: {
    isShowGroupModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal

        if (curVal) {
          this.getGroupList()
          this.group.selectKeys = [...this.currentGroupList]
          return
        }
        // 清空选中用户组
        this.group.selectKeys.splice(0, this.group.selectKeys.length)
      }
    },
    currentGroupList: {
      handler (curVal, oldVal) {
        this.group.selectKeys = [...curVal]
      }
    }
  },
  methods: {
    // 添加用户组
    onClickOk () {
      let rownerIds = this.group.selectKeys.join(',')
      if (!rownerIds) {
        this.$Message.warning('请选择用户组！')
        this.isLoading = false
        this.$nextTick(() => {
          this.isLoading = true
        })
        return
      }

      this.$axios.put(`${api.roles}/${this.currentRole.id}/rowners?rownerIds=${rownerIds}`).then(res => {
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
    getGroupList () {
      if (this.group.data.length) return
      // 获取所有用户组
      this.$axios.get(`${api.groups}`).then(res => {
        this.group.data = res.data.body.userGroups.map(item => {
          return {
            key: item.id,
            label: item.name
          }
        })
      })
    },
    handleChange (selection) {
      this.group.selectKeys = selection
    }
  }
}
</script>
