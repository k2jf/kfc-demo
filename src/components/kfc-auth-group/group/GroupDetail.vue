<template>
  <div style="overflow:auto">
    <Form
      :model="group"
      :label-width="80"
      :rules="rules"
      ref="formValidate">
      <FormItem prop="name" label="名称:">
        <Input placeholder="请输入名称" v-model="group.name" />
      </FormItem>
      <FormItem label="描述:">
        <Input
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请填写描述信息..."
          v-model="group.description"></Input>
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
  name: 'GroupDetail',
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  props: {
    currentGroup: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      group: { ...this.currentGroup },
      rules: {
        name: [
          { required: true, type: 'string', message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    currentGroup: {
      handler (curVal, oldVal) {
        this.group = { ...curVal }
      }
    }
  },
  methods: {
    onSaveClick () {
      this.$refs.formValidate.validate((valid) => {
        if (!valid) {
          return
        }
        this.$axios.put(`${api.groups}/${this.group.id}`, this.group).then(res => {
          this.$emit('on-modify-group', this.group)
          this.$Message.success('修改成功！')
        })
      })
    }
  }
}
</script>
