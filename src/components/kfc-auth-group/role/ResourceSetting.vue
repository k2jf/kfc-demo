<!-- 批量编辑权限对话框 -->
<template>
  <Modal
    title="角色用户组关联设置"
    width="600"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel"
  >
    <Form :model="resource" :label-width="120">
      <FormItem label="批量设置起止时间">
        <DatePicker
          type="daterange"
          placement="bottom-start"
          placeholder="请选择起止时间"
          style="width: 200px"
          v-model="resource.valiableTime"></DatePicker>
      </FormItem>
      <FormItem label="批量生效失效">
        <CheckboxGroup v-model="resource.isDisabled" @on-change="onDisableChange">
          <Checkbox
            :label="item"
            :value="item"
            v-for="item in disableList"
            :key="item"></Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { Modal, Form, FormItem, DatePicker, CheckboxGroup, Checkbox } from 'iview'

import api from '../api'

export default {
  name: 'ResourceSetting',
  components: {
    Modal,
    Form,
    FormItem,
    DatePicker,
    CheckboxGroup,
    Checkbox
  },
  props: {
    currentGroup: {
      type: Object,
      required: true
    },
    isShowSettingModal: {
      type: Boolean,
      required: true
    },
    roleIdList: {
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
      disableList: ['是', '否'],
      resource: {
        isDisabled: [],
        effectTime: null,
        expireTime: null,
        valiableTime: null
      }
    }
  },
  watch: {
    isShowSettingModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
        // 清空选中参数
        this.resource.isDisabled = []
        this.resource.effectTime = null
        this.resource.expireTime = null
      }
    }
  },
  methods: {
    // 是否启用单选，都不选则不批量修改生效状态
    onDisableChange (status) {
      if (!status.length) return
      this.resource.isDisabled = [status.pop()]
    },
    // 批量设置起止时间或者是否可用
    onClickOk () {
      let { isDisabled, valiableTime } = this.resource
      let disabled = isDisabled.length ? isDisabled[0] : null
      let roleIds = this.roleIdList.join(',')
      let configParams = {}
      let url = `${api.rowners}/${this.currentGroup.id}/roles?action=config&roleIds=${roleIds}`

      if (disabled === null && !valiableTime[0]) {
        this.$Message.warning('请修改配置！')
        this.$emit('on-close')
        return
      }

      if (disabled !== null) {
        disabled = disabled === '是'
        configParams.disabled = disabled
      }

      if (valiableTime !== null && valiableTime[0]) {
        configParams.effectTime = Number(valiableTime[0])
        configParams.expireTime = Number(valiableTime[1])
      }

      this.$axios.put(url, configParams).then(res => {
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
