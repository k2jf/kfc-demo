<template>
  <i-modal
    :title="title"
    :loading="isModalLoading"
    v-model="isModalShow"
    @on-ok="onOkClick"
    @on-cancel="onCancelClick">
    <i-form
      :model="formModel"
      :rules="formRules"
      :label-width="80"
      ref="formRef">
      <i-form-item prop="username" label="用户名">
        <i-input
          placeholder="请输入用户名"
          :disabled="!isCreatePage"
          v-model="formModel.username" />
      </i-form-item>
      <i-form-item prop="email" label="邮箱">
        <i-input placeholder="请输入邮箱" v-model="formModel.email" />
      </i-form-item>
      <i-form-item
        prop="password"
        label="密码"
        v-if="isCreatePage">
        <i-input
          type="password"
          placeholder="请输入密码"
          v-model="formModel.password" />
      </i-form-item>
      <i-form-item
        prop="confirmPassword"
        label="确认密码"
        v-if="isCreatePage">
        <i-input
          type="password"
          placeholder="请输入确认密码"
          v-model="formModel.confirmPassword" />
      </i-form-item>
      <i-form-item prop="roles" label="角色">
        <i-select
          multiple
          :disabled="!isCreatePage"
          v-model="formModel.roles">
          <i-option
            :value="opt.id"
            v-for="opt in roleOpts"
            :key="opt.id">
            {{ opt.name }}
          </i-option>
        </i-select>
      </i-form-item>
      <i-form-item prop="roles" label="用户组">
        <i-select
          multiple
          :disabled="!isCreatePage"
          v-model="formModel.groups">
          <i-option
            :value="opt.id"
            v-for="opt in groupOpts"
            :key="opt.id">
            {{ opt.name }}
          </i-option>
        </i-select>
      </i-form-item>
    </i-form>
  </i-modal>
</template>

<script>
import { Modal, Form, FormItem, Input, Select, Option } from 'iview'

let prefixCls = 'kfc-user-form'

export default {
  name: 'KfcUserEdit',
  components: {
    'i-modal': Modal,
    'i-form': Form,
    'i-form-item': FormItem,
    'i-input': Input,
    'i-select': Select,
    'i-option': Option
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isCreatePage: !this.username,
      isModalLoading: true,
      isModalShow: this.value,
      formModel: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: '',
        groups: ''
      },
      formRules: {
        username: [
          { required: true, type: 'string', message: '用户名不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, type: 'string', message: '邮箱不能为空', trigger: 'change' }
        ],
        password: [
          { required: true, type: 'string', message: '密码不能为空', trigger: 'change' }
        ],
        confirmPassword: [
          { required: true, type: 'string', message: '确认密码不能为空', trigger: 'change' }
        ]
      },
      roleOpts: [],
      groupOpts: [],
      prefixCls: prefixCls
    }
  },
  computed: {
    title: function () {
      return this.isCreatePage ? '创建用户' : '修改用户'
    }
  },
  watch: {
    value (val) {
      this.isModalShow = val
    },
    username (val) {
      this.isCreatePage = !val

      if (this.isCreatePage) {
        this.formModel = {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          roles: '',
          groups: ''
        }

        this.$refs.formRef.resetFields()
        return
      }

      this.$axios.get(`/kmx/auth-service/v1/users/${val}`)
        .then(res => {
          this.formModel = res.data.result
        })
    }
  },
  mounted () {
    this.$axios.get('/kmx/auth-service/v1/roles?type=all')
      .then(res => {
        this.roleOpts = res.data.result
      })

    this.$axios.get('/kmx/auth-service/v1/groups?type=all')
      .then(res => {
        this.groupOpts = res.data.result
      })
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

          if (this.isCreatePage) {
            let formParams = JSON.parse(JSON.stringify(this.formModel))
            formParams.groups = formParams.groups ? formParams.groups.map(item => ({ name: item })) : []
            formParams.roles = formParams.roles ? formParams.roles.map(item => ({ name: item })) : []
            delete formParams.confirmPassword

            this.$axios.post('/kmx/auth-service/v1/users', formParams)
              .then(() => {
                this.$emit('on-ok')
              })
              .finally(() => {
                this.isModalLoading = false
                this.$nextTick(() => {
                  this.isModalLoading = true
                })
              })
            return
          }

          this.$axios.put(`/kmx/auth-service/v1/users/${this.formModel.username}`, { email: this.formModel.email })
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
