<!-- 用户组列表 -->
<template>
  <div style="height: 100%;">
    <Row :gutter="16" class="margin-bottom">
      <Col span="14">
      <Button type="primary" @click="isShowGroupModal = true">
        添加已有用户组
      </Button>
      </Col>
      <Col span="10">
      <Input
        placeholder="搜索用户组"
        v-model="group.fuzzyName"
        @on-change="onSearchClick"></Input>
      </Col>
    </Row>
    <GroupEdit
      :currentRole="currentRole"
      :isShowGroupModal="isShowGroupModal"
      :currentGroupList="getCurrentGroupList"
      v-if="currentRole"
      @on-submit="onReloadList"
      @on-close="isShowGroupModal = false" />
    <Table
      :columns="group.columns"
      :data="group.data"
      size="small"
      :loading="group.loading"
      class="margin-bottom"></Table>
    <ConfirmModal ref="confirmModal" @transfer-ok="onDeleteClick"></ConfirmModal>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Table, Icon, Col, Row, Button, Input } from 'iview'
import GroupEdit from './GroupEdit.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

import api from '../api'

export default {
  name: 'GroupList',
  components: {
    Table,
    Row,
    Col,
    Button,
    Input,
    GroupEdit,
    ConfirmModal
  },
  props: {
    currentRole: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      isShowGroupModal: false,
      id: null, // 删除id
      group: {
        fuzzyName: '',
        loading: false,
        data: [],
        columns: [
          { title: '名称', key: 'name', minWidth: 110 },
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
    getCurrentGroupList () {
      return this.group.data.map(item => item.id)
    }
  },
  watch: {
    currentRole: {
      handler (curVal, oldVal) {
        if (curVal && curVal.id) {
          this.getGroupList()
        }
      }
    }
  },
  mounted () {
    if (this.currentRole) {
      this.getGroupList()
    }
  },
  methods: {
    // 删除用户组
    onDeleteClick () {
      this.$axios.delete(`${api.rowners}/${this.id}/roles/${this.currentRole.id}`).then(res => {
        this.$Message.success('删除成功！')
        this.getGroupList()
      })
    },
    showConfirmModal (id) {
      this.id = id
      this.$refs.confirmModal.handleModal({
        content: '是否确认删除？'
      })
    },
    // 获取用户组列表
    getGroupList () {
      let roleId = this.currentRole.id
      let url = `${api.groups}?roleId=${roleId}`

      this.group.loading = true

      if (this.group.fuzzyName) {
        url += `&fuzzyName=${this.group.fuzzyName}`
      }

      this.$axios.get(url).then(res => {
        this.group.data = res.data.body.userGroups
      }).finally(() => {
        this.group.loading = false
      })
    },
    onSearchClick () {
      this.getGroupList()
    },
    onReloadList () {
      this.isShowGroupModal = false
      if (this.currentRole) {
        // 添加用户组后刷新用户组列表页面
        this.getGroupList()
      }
    }
  }
}
</script>
