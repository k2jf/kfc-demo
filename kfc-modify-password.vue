<template>
  <i-modal
    title="修改密码"
    :loading="isModalLoading"
    v-model="isModalShow"
    @on-ok="onOkClick"
    @on-cancel="onCancelClick">
    <i-form
      :model="formModel"
      :rules="formRules"
      :label-width="80"
      ref="formRef">
      <i-form-item prop="password" label="新密码">
        <i-input
          type="password"
          placeholder="请输入新密码"
          v-model="formModel.password" />
      </i-form-item>
      <i-form-item prop="confirmPassword" label="确认密码">
        <i-input
          type="password"
          placeholder="请输入确认密码"
          v-model="formModel.confirmPassword" />
      </i-form-item>
    </i-form>
  </i-modal>
</template>

<script>
import { Modal, Form, FormItem, Input } from 'iview'

let prefixCls = 'kfc-user-form'

export default {
  name: 'KfcModifyPassword',
  components: {
    'i-modal': Modal,
    'i-form': Form,
    'i-form-item': FormItem,
    'i-input': Input
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isModalLoading: true,
      isModalShow: this.value,
      formModel: {
        password: '',
        confirmPassword: ''
      },
      formRules: {
        password: [
          { required: true, type: 'string', message: '密码不能为空', trigger: 'change' }
        ],
        confirmPassword: [
          { required: true, type: 'string', message: '确认密码不能为空', trigger: 'change' }
        ]
      },
      prefixCls: prefixCls
    }
  },
  watch: {
    value (val) {
      this.isModalShow = val
    }
  },
  mounted () {
  },
  methods: {
    onOkClick () {
      this.$refs.formRef.validate()
        .then(isSuccess => {
          if (!isSuccess) {
            this.isModalLoading = false
            this.$nextTick(() => {
              this.isModalLoading = true
            })
          }

          this.$axios.put(`/kmx/auth-service/v1/users/${this.formModel.username}`, { password: this.formModel.password })
            .then(() => {
              this.$emit('on-ok')
            })
            .finally(() => {
              this.isModalLoading = false
              this.$nextTick(() => {
                this.isModalLoading = true
              })
            })
        })
    },
    onCancelClick () {
      this.$emit('on-cancel')
    }
  }
}
</script>
