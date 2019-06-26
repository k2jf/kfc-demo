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
import { Table, Icon, Col, Row, Button, Input, Switch, DatePicker } from 'iview'
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
          { title: '起止时间',
            minWidth: 240,
            render: (h, params) => {
              return h('div', {
                class: this.getTimeStatus(params.index)
              }, [
                h(DatePicker, {
                  props: {
                    type: 'daterange',
                    transfer: true,
                    value: this.group.data[params.index].valiableTime,
                    disabled: !this.group.data[params.index].disabled
                  },
                  on: {
                    'on-change': (valiableTime) => {
                      this.group.data[params.index].effectTime = valiableTime[0]
                      this.group.data[params.index].expireTime = valiableTime[1]
                      this.group.data[params.index].valiableTime = valiableTime
                      this.onStatusChange(params.index)
                    }
                  }
                })
              ])
            }
          },
          { title: '是否启用',
            minWidth: 100,
            render: (h, params) => {
              return h('div', [
                h(Switch, {
                  props: {
                    value: params.row.disabled,
                    size: 'small'
                  },
                  on: {
                    'on-change': (isDisabled) => {
                      this.group.data[params.index].disabled = isDisabled
                      this.onStatusChange(params.index)
                    }
                  }
                })
              ])
            }
          },
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
      this.$axios.delete(`${api.rowners}/${this.id}/roles?roleIds=${this.currentRole.id}`).then(res => {
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
      let groupData = null
      let roleId = this.currentRole.id
      let url = `${api.groups}?roleId=${roleId}`

      this.group.loading = true

      if (this.group.fuzzyName) {
        url += `&fuzzyName=${this.group.fuzzyName}`
      }

      this.$axios.get(url).then(res => {
        groupData = res.data.body.userGroups
      }).then(() => {
        this.$axios.get(`${api.roles}/${roleId}/rowners`).then(resData => {
          let groupDetail = resData.data.body.roles
          groupData.forEach(groupItem => {
            let item = groupDetail.find(item => item.ownerId === groupItem.id && item.roleId === roleId)
            groupItem.disabled = item.disabled === undefined ? false : item.disabled
            groupItem.effectTime = item.effectTime || new Date()
            groupItem.expireTime = item.expireTime || new Date()
            groupItem.valiableTime = [new Date(item.effectTime), new Date(item.expireTime)]
          })
        }).then(() => {
          this.group.data = groupData
        })
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
    },
    // 修改用户组对应角色起止时间是否可用状态
    onStatusChange (index) {
      let { id, effectTime, expireTime, disabled } = this.group.data[index]
      effectTime = Number(new Date(effectTime))
      expireTime = Number(new Date(expireTime))
      let url = `${api.rowners}/${id}/roles?action=config&roleIds=${this.currentRole.id}`
      this.$axios.put(url, { effectTime, expireTime, disabled })
    },
    getTimeStatus (index) {
      let valiableTime = this.group.data[index].valiableTime
      let now = Number(new Date())
      let expireTime = Number(valiableTime[1])
      if (expireTime < now) return 'time-disabled'
      return ''
    }
  }
}
</script>
