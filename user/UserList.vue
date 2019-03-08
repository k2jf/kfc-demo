<!-- 用户列表 -->
<template>
  <div style="height: 100%;">
    <Table
      :columns="user.columns"
      :data="user.data"
      size="small"
      :loading="user.loading"
      class="margin-bottom"></Table>
    <Page
      :total="user.total"
      class="page-container"
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
// eslint-disable-next-line
import { Table, Page, Icon } from 'iview'

export default {
  name: 'UserList',
  components: {
    Table,
    Page
  },
  props: {
    currentRole: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    isReloadUserList: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      user: {
        page: 1,
        size: 10,
        total: 0,
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
                      this.deleteUser(params.row.name)
                    }
                  }
                },
                [
                  h(
                    'Icon',
                    {
                      props: {
                        type: 'ios-trash'
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
      },
      token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
    }
  },
  watch: {
    currentRole: {
      handler (curVal, oldVal) {
        if (curVal && curVal.id) {
          this.getUserList()
        }
      }
    },
    isReloadUserList: {
      handler (curVal, oldVal) {
        if (this.currentRole) {
          // 添加用户后刷新用户列表页面
          this.getUserList()
        }
      }
    }
  },
  mounted () {
    if (this.currentRole) {
      this.getUserList()
    }
  },
  methods: {
    // 删除用户
    deleteUser (name) {
      var xhr = new XMLHttpRequest()
      var url = `http://10.12.20.36:28091/auth-service/v1/roles/${this.currentRole.id}/remove`

      xhr.open('PUT', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.getUserList()
        }
      }
      xhr.send(JSON.stringify({ users: [{ name: name }] }))
    },
    // 获取资源列表
    getUserList () {
      this.user.loading = true
      let { page, size } = this.user
      let name = this.currentRole.name
      let xhr = new XMLHttpRequest()
      let url = `http://10.12.20.36:28091/auth-service/v1/users?page=${page}&size=${size}&rolename=${name}`

      xhr.open('GET', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.user.loading = false
          this.user.data = JSON.parse(xhr.responseText).result
          this.user.total = JSON.parse(xhr.responseText).pages.total
        }
      }
      xhr.send(null)
    },
    // 切换页数
    onPageChange (page) {
      this.user.page = page
      this.getUserList()
    }
  }
}
</script>
