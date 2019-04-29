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
      <Button
        type="primary"
        style="margin-left: 10px"
        @click="showSettingModal"
      >
        批量编辑
      </Button>
      <Button
        type="primary"
        style="margin-left: 10px"
        @click="showConfirmModal(getSelectedIds.join(','))"
      >
        批量删除
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
    <ResourceSetting
      :currentGroup="currentGroup"
      :isShowSettingModal="isShowSettingModal"
      :roleIdList="getSelectedIds"
      v-if="currentGroup"
      @on-submit="onReloadList"
      @on-close="isShowSettingModal = false" />
    <Table
      :columns="role.columns"
      :data="role.data"
      size="small"
      :loading="role.loading"
      class="margin-bottom"
      @on-selection-change="onSelectionChange"></Table>
    <ConfirmModal ref="confirmModal" @transfer-ok="onDeleteClick"></ConfirmModal>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Table, Icon, Col, Row, Button, Input, Switch, DatePicker } from 'iview'
import RoleEdit from './RoleEdit.vue'
import ResourceSetting from './ResourceSetting.vue'
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
    ResourceSetting,
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
      isShowSettingModal: false,
      isShowRoleModal: false,
      id: null, // 删除id
      role: {
        fuzzyName: '',
        loading: false,
        data: [],
        selections: [],
        columns: [
          { type: 'selection', width: 60, align: 'center' },
          { title: '角色', key: 'roleName', minWidth: 80 },
          { title: '起止时间',
            minWidth: 240,
            render: (h, params) => {
              return h('div', [
                h(DatePicker, {
                  props: {
                    type: 'daterange',
                    transfer: true,
                    value: params.row.valiableTime,
                    disabled: !params.row.disabled
                  },
                  on: {
                    'on-change': (valiableTime) => {
                      this.role.data[params.index].effectTime = valiableTime[0]
                      this.role.data[params.index].expireTime = valiableTime[1]
                      this.role.data[params.index].valiableTime = valiableTime
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
                      this.role.data[params.index].disabled = isDisabled
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
                      this.showConfirmModal(params.row.roleId)
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
      return this.role.data.map(item => item.roleId)
    },
    getSelectedIds () {
      return this.role.selections.map(item => item.roleId)
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
      this.$axios.delete(`${api.rowners}/${this.currentGroup.id}/roles?roleIds=${this.id}`).then(res => {
        this.$Message.success('删除成功！')
        this.getRoleList()
      })
    },
    showConfirmModal (id) {
      this.id = id
      if (!id) {
        this.$Message.warning('请选择角色！')
        return
      }
      this.$refs.confirmModal.handleModal({
        content: '是否确认删除？'
      })
    },
    // 获取角色列表
    getRoleList () {
      let groupId = this.currentGroup.id
      let url = `${api.rowners}/${groupId}/roles`

      this.role.loading = true

      if (this.role.fuzzyName) {
        url += `?fuzzyName=${this.role.fuzzyName}`
      }

      this.$axios.get(url).then(res => {
        res.data.body.ownerRoles.forEach(item => {
          item.disabled = item.disabled === undefined ? false : item.disabled
          item.effectTime = item.effectTime || new Date()
          item.expireTime = item.expireTime || new Date()
          item.valiableTime = [new Date(item.effectTime), new Date(item.expireTime)]
        })
        this.role.data = res.data.body.ownerRoles
      }).finally(() => {
        this.role.loading = false
      })
    },
    // 修改用户组对应角色起止时间是否可用状态
    onStatusChange (index) {
      let { roleId, effectTime, expireTime, disabled } = this.role.data[index]
      effectTime = Number(new Date(effectTime))
      expireTime = Number(new Date(expireTime))
      let url = `${api.rowners}/${this.currentGroup.id}/roles?action=config&roleIds=${roleId}`
      this.$axios.put(url, { effectTime, expireTime, disabled })
    },
    showSettingModal () {
      if (!this.role.selections.length) {
        this.$Message.warning('请先选择角色！')
        return
      }
      this.isShowSettingModal = true
    },
    onSearchClick () {
      this.getRoleList()
    },
    onSelectionChange (selections) {
      this.role.selections = selections
    },
    // 编辑角色后刷新角色列表页面
    onReloadList () {
      this.isShowRoleModal = false
      this.isShowSettingModal = false
      if (this.currentGroup) {
        this.getRoleList()
      }
    }
  }
}
</script>
