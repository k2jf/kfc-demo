<!-- 用户列表 -->
<template>
  <div style="height: 100%;">
    <Row :gutter="16" class="margin-bottom">
      <Col span="14">
      <Button
        type="primary"
        @click="isShowUserModal = true"
      >
        添加已有用户
      </Button>
      </Col>
      <Col span="10">
      <Input
        placeholder="搜索用户"
        v-model="user.fuzzyName"
        @on-change="onSearchClick"></Input>
      </Col>
    </Row>
    <UserEdit
      :currentGroup="currentGroup"
      :isShowUserModal="isShowUserModal"
      :currentUserList="getCurrentUserList"
      v-if="currentGroup"
      @on-submit="onReloadList"
      @on-close="isShowUserModal = false" />
    <Table
      :columns="user.columns"
      :data="user.data"
      size="small"
      :loading="user.loading"
    ></Table>
    <ConfirmModal ref="confirmModal" @transfer-ok="onDeleteClick"></ConfirmModal>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Table, Icon, Row, Col, Button, Input } from 'iview'
import UserEdit from './UserEdit.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

import api from '../api'

export default {
  name: 'UserList',
  components: {
    Row,
    Col,
    Button,
    Input,
    Table,
    UserEdit,
    ConfirmModal
  },
  props: {
    currentGroup: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      isShowUserModal: false,
      id: null, // 删除id
      user: {
        fuzzyName: '',
        loading: false,
        data: [],
        columns: [
          { title: '用户名', key: 'name', minWidth: 110 },
          { title: '邮箱', key: 'email', minWidth: 130 },
          {
            title: '操作',
            width: 100,
            render: (h, params) => {
              return h(
                'span',
                {
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.showConfirmModal(params.row.id)
                    }
                  }
                },
                [
                  h(
                    'Icon',
                    {
                      props: {
                        type: 'ios-trash',
                        size: 16,
                        color: '#5cadff'
                      }
                    }
                  ),
                  h(
                    'span', '移除'
                  )
                ]
              )
            }
          }
        ]
      }
    }
  },
  computed: {
    getCurrentUserList () {
      return this.user.data.map(item => item.id)
    }
  },
  watch: {
    currentGroup: {
      handler (curVal, oldVal) {
        if (curVal && curVal.id) {
          this.getUserList()
        }
      }
    }
  },
  mounted () {
    if (this.currentGroup) {
      this.getUserList()
    }
  },
  methods: {
    // 删除用户
    onDeleteClick () {
      this.$axios.delete(`${api.groups}/${this.currentGroup.id}/users/${this.id}`).then(res => {
        this.$Message.success('删除成功！')
        this.getUserList()
      })
    },
    showConfirmModal (id) {
      this.id = id
      this.$refs.confirmModal.handleModal({
        content: '是否确认删除？'
      })
    },
    // 获取用户列表
    getUserList () {
      let id = this.currentGroup.id
      let url = `${api.users}?usrgrpId=${id}`

      this.user.loading = true

      if (this.user.fuzzyName) {
        url += `&fuzzyName=${this.user.fuzzyName}`
      }

      this.$axios.get(url).then(res => {
        this.user.data = res.data.body.users
      }).finally(() => {
        this.user.loading = false
      })
    },
    onSearchClick () {
      this.getUserList()
    },
    onReloadList () {
      this.isShowUserModal = false
      if (this.currentGroup) {
        // 添加用户后刷新用户列表页面
        this.getUserList()
      }
    }
  }
}
</script>
