<!-- 角色列表 -->
<template>
  <div style="height: 100%;">
    <Row :gutter="16" class="margin-bottom">
      <Col span="14">
      <Button
        type="primary"
        @click="isShowRoleModal = true"
      >
        添加已有角色
      </Button>
      </Col>
      <Col span="10">
      <Input
        placeholder="搜索角色"
        v-model="role.fuzzyName"
        @on-change="onSearchClick"></Input>
      </Col>
    </Row>
    <RoleEdit
      :currentGroup="currentGroup"
      :isShowRoleModal="isShowRoleModal"
      :currentRoleList="getCurrentRoleList"
      v-if="currentGroup"
      @on-submit="onReloadList"
      @on-close="isShowRoleModal = false" />
    <Table
      :columns="role.columns"
      :data="role.data"
      size="small"
      :loading="role.loading"
      class="margin-bottom"></Table>
    <ConfirmModal ref="confirmModal" @transfer-ok="onDeleteClick"></ConfirmModal>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Table, Icon, Col, Row, Button, Input } from 'iview'
import RoleEdit from './RoleEdit.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

import api from '../api'

export default {
  name: 'RoleList',
  components: {
    Row,
    Col,
    Button,
    Input,
    Table,
    RoleEdit,
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
      isShowRoleModal: false,
      id: null, // 删除id
      role: {
        fuzzyName: '',
        loading: false,
        data: [],
        columns: [
          { title: '角色', key: 'name', minWidth: 110 },
          { title: '描述', key: 'description', minWidth: 130 },
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
    getCurrentRoleList () {
      return this.role.data.map(item => item.id)
    }
  },
  watch: {
    currentGroup: {
      handler (curVal, oldVal) {
        if (curVal && curVal.id) {
          this.getRoleList()
        }
      }
    }
  },
  mounted () {
    if (this.currentGroup) {
      this.getRoleList()
    }
  },
  methods: {
    // 删除角色
    onDeleteClick () {
      this.$axios.delete(`${api.groups}/${this.currentGroup.id}/roles/${this.id}`).then(res => {
        this.$Message.success('删除成功！')
        this.getRoleList()
      })
    },
    showConfirmModal (id) {
      this.id = id
      this.$refs.confirmModal.handleModal({
        content: '是否确认删除？'
      })
    },
    // 获取角色列表
    getRoleList () {
      let groupId = this.currentGroup.id
      let url = `${api.roles}?usrgrpId=${groupId}`

      this.role.loading = true

      if (this.role.fuzzyName) {
        url += `&fuzzyName=${this.role.fuzzyName}`
      }

      this.$axios.get(url).then(res => {
        this.role.data = res.data.body.roles
        this.role.loading = false
      })
    },
    onSearchClick () {
      this.getRoleList()
    },
    onReloadList () {
      this.isShowRoleModal = false
      if (this.currentGroup) {
        // 添加角色后刷新角色列表页面
        this.getRoleList()
      }
    }
  }
}
</script>
