<template>
  <Modal
    :title="isEditMode ? '编辑' : '新增'"
    :mask-closable="false"
    v-model="showModal"
  >
    <div style="text-align:center">
      <Form
        :model="formItem"
        :label-width="140"
        label-position="right"
        style="width: 90%"
        :rules="ruleValidate"
        ref="form">
        <FormItem label="通知内容" prop="content">
          <Input
            type="textarea"
            :rows="5"
            placeholder="请输入通知内容"
            v-model="formItem.content" />
        </FormItem>
        <FormItem label="时间范围" prop="dateRange">
          <DatePicker
            type="datetimerange"
            placeholder="选择时间范围"
            style="width: 100%;"
            v-model="formItem.dateRange" />
          <!--<DatePicker :options="{disabledDate: (date) => date.valueOf() < Date.now() - 86400000}"
                      type="datetimerange"
                      placeholder="选择时间范围"
                      v-model="formItem.dateRange"
                      style="width: 100%;"/>
          -->
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请填写备注"
            v-model="formItem.remark" />
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button
        size="large"
        @click="cancel">
        取消
      </Button>
      <Button
        type="primary"
        size="large"
        @click="ok">
        确定
      </Button>
    </div>
  </Modal>
</template>

<script>
import { Modal, Form, FormItem, Input, Button, DatePicker } from 'iview'
import { setAnnounce, addAnnounce } from '../api'

export default {
  name: 'ModalAddAnnounce',
  components: {
    Modal, Form, FormItem, Input, Button, DatePicker
  },
  data () {
    return {
      showModal: false,
      isEditMode: false,
      formItem: {
        dateRange: [],
        content: '',
        remark: ''
      },
      ruleValidate: {
        content: [
          { required: true, message: '请输入内容，最少20字', trigger: 'blur' },
          { type: 'string', max: 100, message: '内容字数不超过100字', trigger: 'blur' }
        ],
        dateRange: [
          { required: true, type: 'array', message: '请选择时间范围', trigger: 'blur' },
          { validator: (rule, value, cb) => {
            if (!(value && value.length === 2)) {
              cb(new Error('请选择时间范围'))
            } else {
              if (!value[0].getTime || !value[1].getTime) {
                cb(new Error('请选择时间范围'))
              }
            }
            cb()
          },
          trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* public */ openForAdd () {
      this.isEditMode = false
      this.formItem = {
        dateRange: [],
        content: '',
        remark: ''
      }
      this.showModal = true
    },

    /* public */ openForEdit (formItem) {
      this.isEditMode = true
      this.formItem = formItem
      this.showModal = true
    },

    ok () {
      this.$refs['form'].validate(good => {
        if (good) {
          if (this.isEditMode) {
            setAnnounce(this.formItem).then(data => {
              /* direct call */ this.$parent.reloadTable()
              this.$Message.info('已保存')
              this.showModal = false
            })
          } else {
            addAnnounce(this.formItem).then(data => {
              this.$parent.reloadTable()
              this.$Message.success('添加成功')
              this.showModal = false
            })
          }
        }
      })
    },

    cancel () {
      this.showModal = false
    }

  }
}
</script>

<style scoped>

</style>
