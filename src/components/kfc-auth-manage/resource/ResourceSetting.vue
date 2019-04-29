<!-- 批量编辑权限对话框 -->
<template>
  <Modal
    title="资源设置"
    width="600"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel"
  >
    <Form :label-width="120">
      <FormItem label="批量设置操作">
        <CheckboxGroup v-model="permissions">
          <Checkbox
            :label="item"
            v-for="item in operations"
            :key="item"></Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { Modal, Form, FormItem, CheckboxGroup, Checkbox } from 'iview'

import api from '../api'

export default {
  name: 'ResourceSetting',
  components: {
    Modal,
    Form,
    FormItem,
    CheckboxGroup,
    Checkbox
  },
  props: {
    currentRole: {
      type: Object,
      required: true
    },
    isShowSettingModal: {
      type: Boolean,
      required: true
    },
    resourceIdList: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    operations: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      isShowModal: this.isShowSettingModal,
      permissions: []
    }
  },
  watch: {
    isShowSettingModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
        // 清空选中参数
        this.permissions.splice(0, this.permissions.length)
      }
    }
  },
  methods: {
    // 批量设置权限
    onClickOk () {
      let operations = this.permissions.join(',')
      if (!operations) {
        this.$Message.warning('请修改操作权限！')
        this.$emit('on-close')
        return
      }

      let resourceIds = this.resourceIdList.join(',')
      let url = `${api.roles}/${this.currentRole.id}/permissions?resourceIds=${resourceIds}&operations=${operations}&action=config`

      this.$axios.put(url).then(res => {
        this.$Message.success('修改成功！')
        this.$emit('on-submit')
      }).catch(() => {
        this.$emit('on-close')
      })
    },
    onClickCancel () {
      this.$emit('on-close')
    }
  }
}
</script>
