<!-- 添加权限对话框 -->
<template>
  <Modal
    title="添加权限"
    width="800"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel"
  >
    <Form
      :model="resourceData"
      :label-width="80"
      ref="formValidate">
      <FormItem label="角色名">
        {{ currentRole.name }}
      </FormItem>
      <FormItem label="资源类型" prop="type">
        <Select
          :transfer="true"
          style="width: 50%"
          v-model="resourceData.appResTypeId"
          @on-change="onTypeChange">
          <template v-for="item in resourceTypeList">
            <Option
              :value="item.appResTypeId"
              :key="item.appResTypeId">
              {{ item.appResTypeName }}
            </Option>
          </template>
        </Select>
      </FormItem>
      <FormItem label="资源列表" prop="type">
        <Input class="r-input" v-model="resourceData.appResInfoId"></Input>
      </FormItem>
      <div class="form-card">
        <Row :gutter="16">
          <Col class="form-panel" span="12">
          <p>已选择:</p>
          <Tag
            closable
            v-for="item in selectResource"
            :key="item.appResInfoId">
            {{ item.appResInfoName }}
          </Tag>
          </Col>
          <Col span="12">
          <Table
            :columns="resourceData.columns"
            :data="getTableData"
            size="small"
            :height="280"
            :loading="resourceData.loading"
            @on-selection-change="onSelectChange"></Table>
          </Col>
        </Row>
      </div>
      <FormItem label="操作" prop="type">
        <CheckboxGroup v-model="operationNames">
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
import { Modal, Input, Form, FormItem, Select, Option, Row, Col, Table, CheckboxGroup, Checkbox, Tag } from 'iview'

export default {
  name: 'ResourceEdit',
  components: {
    Modal,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Row,
    Col,
    Table,
    CheckboxGroup,
    Checkbox,
    Tag
  },
  props: {
    currentRole: {
      type: Object,
      required: true
    },
    isShowAuthModal: {
      type: Boolean,
      required: true
    },
    resourceTypeList: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      isShowModal: this.isShowAuthModal,
      selectResource: [], // 选中资源
      operations: [], // 操作列表
      operationNames: [], // 选中操作
      resourceData: {
        loading: false,
        appResInfoId: '',
        subjectType: 'role',
        appResTypeId: '',
        data: [],
        columns: [
          { type: 'selection', width: 40, align: 'center' },
          { title: '资源id', key: 'appResInfoId', minWidth: 50 },
          { title: '资源名称', key: 'appResInfoName', minWidth: 80 }
        ]
      },
      token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
    }
  },
  computed: {
    getTableData () {
      let appResInfoId = this.resourceData.appResInfoId
      if (!appResInfoId) return this.resourceData.data
      return this.resourceData.data.filter(item => item.appResInfoId.includes(appResInfoId))
    }
  },
  watch: {
    isShowAuthModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
        // 清空选中参数
        this.selectResource.splice(0, this.selectResource.length)
        this.operationNames.splice(0, this.operationNames.length)
        this.operations.splice(0, this.operations.length)
        this.resourceData.appResTypeId = ''
        this.resourceData.appResInfoId = ''
        this.resourceData.loading = false
        this.resourceData.data.splice(0, this.resourceData.data.length)
      }
    }
  },
  methods: {
    // 新建权限
    onClickOk () {
      let xhr = new XMLHttpRequest()
      let appResInfoId = this.selectResource.map(item => item.appResInfoId).join(',')
      let permission = {
        appResInfoId,
        appResTypeId: this.resourceData.appResTypeId,
        operationNames: this.operationNames,
        subjectId: this.currentRole.id,
        subjectType: 'role' }
      let url = 'http://10.12.20.36:28091/auth-service/v1/permissions'

      xhr.open('POST', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.$emit('on-submit', permission)
          this.$refs.formValidate.resetFields()
        }
      }
      xhr.send(JSON.stringify(permission))
    },
    onClickCancel () {
      this.$emit('on-close')
      this.$refs.formValidate.resetFields()
    },
    getResourceData () {
      this.resourceData.loading = true
      let { appResTypeId } = this.resourceData
      if (!appResTypeId) return
      let xhr = new XMLHttpRequest()
      let url = `http://10.12.20.36:28091/auth-service/v1/resourceinfos?type=all&appResTypeId=${encodeURIComponent(appResTypeId)}`

      xhr.open('GET', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.resourceData.loading = false
          this.resourceData.data = JSON.parse(xhr.responseText).result
          this.operations = this.resourceData.data[0].operations
        }
      }
      xhr.send(null)
    },
    onTypeChange () {
      // 清空选中参数
      this.selectResource.splice(0, this.selectResource.length)
      this.operationNames.splice(0, this.operationNames.length)
      this.resourceData.appResInfoId = ''
      this.getResourceData()
    },
    onSelectChange (selection) {
      this.selectResource = selection
    }
  }
}
</script>

<style lang="css" scoped>
.r-input {
  width: 40%;
  float: right;
}
.form-card {
  margin-left: 80px;
  height: 280px;
}
.form-panel {
  height: 280px;
  padding: 10px;
  border: 1px solid #dcdee2;
  border-radius: 3px;
  overflow: auto;
}
</style>
