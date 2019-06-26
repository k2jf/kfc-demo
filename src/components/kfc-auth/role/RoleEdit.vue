<!-- 添加角色对话框 -->
<template>
  <Modal
    title="创建角色"
    :maskClosable="false"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel">
    <Form
      :model="role"
      :rules="ruleValidate"
      :label-width="80"
      ref="formValidate">
      <FormItem label="名称" prop="name">
        <Input v-model="role.name"></Input>
      </FormItem>
      <FormItem label="描述" prop="description">
        <Input
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请填写描述信息..."
          v-model="role.description"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { Modal, Input, Form, FormItem } from 'iview'

import { api } from '../api'

export default {
  name: 'RoleEdit',
  components: {
    Modal,
    Form,
    FormItem,
    Input
  },
  props: {
    isShowRoleModal: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isShowModal: this.isShowRoleModal,
      role: {
        name: '',
        description: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    isShowRoleModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
      }
    }
  },
  methods: {
    // 新建角色
    onClickOk () {
      this.$refs.formValidate.validate((valid) => {
        this.$emit('on-submit')
        if (valid) {
          this.$axios.post(`${api.roles}`, this.role).then(res => {
            this.$refs.formValidate.resetFields()
          })
        }
      })
    },
    onClickCancel () {
      this.$emit('on-close')
      this.$refs.formValidate.resetFields()
    }
  }
}
</script>
