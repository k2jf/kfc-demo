<template>
  <div :class="[prefixCls]">
    <div :class="[prefixCls + '-header']">
      <i-row>
        <i-col span="1">
          <span>用户名:</span>
        </i-col>
        <i-col span="4">
          <i-input v-model="filters.username" />
        </i-col>
        <i-col span="1">
          <p>邮箱:</p>
        </i-col>
        <i-col span="4">
          <i-input v-model="filters.email" />
        </i-col>
        <i-col span="4">
          <i-button type="primary" @click="onSearchClick">
            查询
          </i-button>
        </i-col>
        <i-col span="4">
          <i-button type="primary" @click="onAddClick">
            创建
          </i-button>
        </i-col>
      </i-row>
    </div>
    <div :class="[prefixCls + '-content']">
      <i-table
        stripe
        :columns="columns"
        :data="data" />
      <i-page
        :class="[prefixCls + '-page']"
        :current="pageNo"
        :page-size="pageSize"
        :total="total"
        show-total
        show-sizer
        @on-change="onPageNoChange"
        @on-page-size-change="onPageSizeChange" />
      <kfc-user-edit
        :username="editUsername"
        v-model="isUserEditShow"
        @on-ok="onUserEditOk"
        @on-cancel="onUserEditCancel" />
      <kfc-modify-password
        v-model="isModifyPasswordShow"
        @on-ok="onModifyPasswordOk"
        @on-cancel="onModifyPasswordCancel" />
      <kfc-delete-modal
        title="删除确认"
        :desc="'您确定要删除用户:' + deleteUsername"
        v-model="isDeleteModalShow"
        @on-ok="onDeleteModalClick"
      />
    </div>
  </div>
</template>

<script>
import { Row, Col, Button, Input, Table, Page } from 'iview'
import KfcCopyAction from './kfc-copy-action.vue'

import KfcUserEdit from './kfc-user-edit.vue'
import KfcModifyPassword from './kfc-modify-password.vue'
import KfcDeleteModal from './kfc-delete-modal.vue'

import Server from './server.js'

let prefixCls = 'kfc-user-manage'

export default {
  name: 'KfcUserList',
  components: {
    'i-row': Row,
    'i-col': Col,
    'i-input': Input,
    'i-button': Button,
    'i-table': Table,
    'i-page': Page,
    'kfc-user-edit': KfcUserEdit,
    'kfc-modify-password': KfcModifyPassword,
    'kfc-delete-modal': KfcDeleteModal
  },
  data () {
    return {
      filters: {
        username: '',
        email: ''
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '用户名', key: 'name' },
        { title: '邮箱', key: 'email' },
        { title: '操作',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h(KfcCopyAction, {
                props: {
                  username: params.row.username
                },
                style: {
                  marginRight: '5px'
                }
              }),
              h('a', {
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.isModifyPasswordShow = true
                  }
                }
              }, '修改密码'),
              h('a', {
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.isUserEditShow = true
                    this.editUsername = params.row.username
                  }
                }
              }, '编辑'),
              h('a', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.isDeleteModalShow = true
                    this.deleteUsername = params.row.username
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      isUserEditShow: false,
      isModifyPasswordShow: false,
      editUsername: null,
      isDeleteModalShow: false,
      deleteUsername: null,
      prefixCls: prefixCls
    }
  },
  mounted () {
    this.reload()
  },
  methods: {
    onSearchClick () {
      this.reload()
    },
    onAddClick () {
      this.isUserEditShow = true
      this.editUsername = null
    },
    onPageNoChange (pageNo) {
      this.pageNo = pageNo
      Server.getUserList(this.filters, this.pageNo, this.pageSize)
        .then(data => {
          this.data = data.data
          this.total = data.total
        })
    },
    onPageSizeChange (pageSize) {
      this.pageSize = pageSize
      Server.getUserList(this.filters, this.pageNo, this.pageSize)
        .then(data => {
          this.data = data.data
          this.total = data.total
        })
    },
    reload () {
      Server.getUserList(this.filters, this.pageNo, this.pageSize)
        .then(data => {
          this.data = data.data
          this.total = data.total
        })
    },
    onUserEditOk () {
      this.isUserEditShow = false
      this.reload()
    },
    onUserEditCancel () {
      this.isUserEditShow = false
    },
    onModifyPasswordOk () {
      this.isModifyPasswordShow = false
    },
    onModifyPasswordCancel () {
      this.isModifyPasswordShow = false
    },
    onDeleteModalClick () {
      this.isDeleteModalShow = false
      Server.deleteUser(this.deleteUsername)
        .then(() => {
          Server.getUserList(this.filters, this.pageNo, this.pageSize)
            .then(data => {
              this.data = data.data
              this.total = data.total
            })
        })
    }
  }
}
</script>
