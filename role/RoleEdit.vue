<!-- 添加角色对话框 -->
<template>
  <Modal
    title="创建角色"
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
      },
      token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
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
          var xhr = new XMLHttpRequest()
          var url = 'http://10.12.20.36:28091/auth-service/v1/roles'

          xhr.open('POST', url, true)
          xhr.setRequestHeader('K2_KEY', this.token)
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              this.$refs.formValidate.resetFields()
            }
          }
          xhr.send(JSON.stringify(this.role))
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
