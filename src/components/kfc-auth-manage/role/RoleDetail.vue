<template>
  <div style="overflow:auto">
    <Form
      :model="role"
      :label-width="80"
      :rules="rules"
      ref="formValidate">
      <FormItem prop="name" label="名称:">
        <Input placeholder="请输入名称" v-model="role.name" />
      </FormItem>
      <FormItem label="描述:">
        <Input
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请填写描述信息..."
          v-model="role.description"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSaveClick">
          保存
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'iview'

import api from '../api'

export default {
  name: 'RoleDetail',
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  props: {
    currentRole: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      role: { ...this.currentRole },
      rules: {
        name: [
          { required: true, type: 'string', message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    currentRole: {
      handler (curVal, oldVal) {
        this.role = { ...curVal }
      }
    }
  },
  methods: {
    onSaveClick () {
      this.$refs.formValidate.validate((valid) => {
        if (!valid) {
          return
        }
        this.$axios.put(`${api.roles}/${this.role.id}`, this.role)
          .then(() => {
            this.$emit('on-modify-role', this.role)
            this.$Message.success('修改成功！')
          })
      })
    }
  }
}
</script>
