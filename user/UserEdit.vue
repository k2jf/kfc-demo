<!-- 添加用户对话框 -->
<template>
  <Modal
    title="添加已有用户"
    width="800"
    v-model="isShowModal"
    @on-ok="onClickOk"
    @on-cancel="onClickCancel"
  >
    <Row>
      <Col span="8" offset="16">
      <Input class="margin-bottom" v-model="user.name"></Input>
      </Col>
    </Row>
    <div class="form-card">
      <Row :gutter="16">
        <Col class="form-panel" span="12">
        <p>已选择:</p>
        <Tag
          closable
          v-for="item in selectUser"
          :key="item.email + item.name">
          {{ item.name }}
        </Tag>
        </Col>
        <Col span="12">
        <Table
          :columns="user.columns"
          :data="getTableData"
          size="small"
          :height="280"
          :loading="user.loading"
          @on-selection-change="onSelectChange"></Table>
        </Col>
      </Row>
    </div>
  </Modal>
</template>

<script>
import { Modal, Input, Table, Tag, Row, Col } from 'iview'

export default {
  name: 'UserEdit',
  components: {
    Modal,
    Input,
    Table,
    Tag,
    Row,
    Col
  },
  props: {
    currentRole: {
      type: Object,
      required: true
    },
    isShowUserModal: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isShowModal: this.isShowUserModal,
      selectUser: [], // 选中资源
      operations: [], // 操作列表
      user: {
        loading: false,
        name: '',
        data: [],
        columns: [
          { type: 'selection', width: 40, align: 'center' },
          { title: '用户名', key: 'name', minWidth: 50 },
          { title: '邮箱', key: 'email', minWidth: 80 }
        ]
      },
      token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
    }
  },
  computed: {
    getTableData () {
      let name = this.user.name
      if (!name) return this.user.data
      return this.user.data.filter(item => item.name.includes(name))
    }
  },
  watch: {
    isShowUserModal: {
      handler (curVal, oldVal) {
        this.isShowModal = curVal
        // 清空选中参数
        this.selectUser.splice(0, this.selectUser.length)
        this.user.name = ''
        this.user.loading = false
        this.user.data.splice(0, this.user.data.length)
        if (curVal) {
          this.getUserList()
        }
      }
    }
  },
  methods: {
    // 添加用户
    onClickOk () {
      let xhr = new XMLHttpRequest()
      let users = []
      this.selectUser.forEach(item => {
        users.push({
          name: item.name
        })
      })
      let url = `http://10.12.20.36:28091/auth-service/v1/roles/${this.currentRole.id}/add`

      xhr.open('PUT', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.$emit('on-submit')
        }
      }
      xhr.send(JSON.stringify({ users: users }))
    },
    onClickCancel () {
      this.$emit('on-close')
    },
    getUserList () {
      this.user.loading = true
      let xhr = new XMLHttpRequest()
      let url = 'http://10.12.20.36:28091/auth-service/v1/users?type=all'

      xhr.open('GET', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.user.loading = false
          this.user.data = JSON.parse(xhr.responseText).result
        }
      }
      xhr.send(null)
    },
    onSelectChange (selection) {
      this.selectUser = selection
    }
  }
}
</script>

<style lang="css" scoped>
.form-card {
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
