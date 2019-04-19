<!-- 添加用户组对话框 -->
<template>
  <Modal
    title="创建用户组"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel">
    <Form
      :model="group"
      :rules="rules"
      :label-width="80"
      ref="formValidate">
      <FormItem label="名称" prop="name">
        <Input v-model="group.name"></Input>
      </FormItem>
      <FormItem label="描述" prop="description">
        <Input
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请填写描述信息..."
          v-model="group.description"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { Modal, Input, Form, FormItem } from 'iview'

import api from '../api'

export default {
  name: 'GroupEdit',
  components: {
    Modal,
    Form,
    FormItem,
    Input
  },
  props: {
    isShowGroupModal: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isShowModal: this.isShowGroupModal,
      group: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    isShowGroupModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
      }
    }
  },
  methods: {
    // 新建用户组
    onClickOk () {
      this.$refs.formValidate.validate((valid) => {
        if (!valid) {
          this.$emit('on-close')
          return
        }

        this.$axios.post(`${api.groups}`, this.group).then(res => {
          this.$Message.success('新建成功！')
          this.$refs.formValidate.resetFields()
          this.$emit('on-submit')
        }).catch(() => {
          this.$emit('on-close')
        })
      })
    },
    onClickCancel () {
      this.$emit('on-close')
      this.$refs.formValidate.resetFields()
    }
  }
}
</script>
