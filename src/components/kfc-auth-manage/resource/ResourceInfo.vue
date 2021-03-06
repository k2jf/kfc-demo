<!-- 资源类型信息 -->
<template>
  <div style="height: 100%;">
    <Row :gutter="16" class="margin-bottom">
      <Col span="18">资源类型:
      <Select
        transfer
        style="max-width:200px;margin-left:10px;"
        v-model="resourceData.typeId"
        @on-change="onTypeChange">
        <Option :value="-1">
          全部资源
        </Option>
        <Option
          :value="item.id"
          v-for="item in resourceTypeList"
          :key="item.id">
          {{ item.name }}
        </Option>
      </Select>
      <Button
        type="primary"
        style="margin-left: 10px"
        @click="isShowAuthModal = true"
      >
        添加权限
      </Button>
      <Button
        type="primary"
        style="margin-left: 10px"
        @click="showSettingModal()"
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
      <Col span="6">
      <Input
        placeholder="搜索资源个例"
        v-model="resourceData.fuzzyName"
        @on-blur="onSearchClick"></Input>
      </Col>
    </Row>
    <ResourceEdit
      :currentRole="currentRole"
      :resourceTypeList="resourceTypeList"
      :isShowAuthModal="isShowAuthModal"
      :typeId="resourceData.typeId"
      v-if="currentRole"
      @on-submit="getSubmitResource"
      @on-close="isShowAuthModal = false" />
    <ResourceSetting
      :currentRole="currentRole"
      :isShowSettingModal="isShowSettingModal"
      :resourceIdList="getSelectedIds"
      :operations="getOperations"
      v-if="currentRole"
      @on-submit="onModifySetting"
      @on-close="isShowSettingModal = false" />
    <Table
      :columns="resourceData.columns"
      :data="resourceData.data"
      size="small"
      :loading="resourceData.loading"
      class="margin-bottom"
      @on-selection-change="onSelectionChange"></Table>
    <ConfirmModal ref="confirmModal" @transfer-ok="onDeleteClick"></ConfirmModal>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Col, Row, Input, Select, Option, Table, Page, Icon, Button} from 'iview'
import ResourceEdit from './ResourceEdit.vue'
import ResourceSetting from './ResourceSetting.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import OperationCell from './OperationCell.vue'

import api from '../api'

export default {
  name: 'ResourceInfo',
  components: {
    Col,
    Row,
    Input,
    Select,
    Option,
    Table,
    Button,
    ResourceEdit,
    ResourceSetting,
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
      isShowSettingModal: false,
      isShowAuthModal: false,
      id: null, // 删除id
      resourceData: {
        loading: false,
        fuzzyName: '',
        typeId: -1,
        data: [],
        selections: [],
        columns: [
          { type: 'selection', width: 60, align: 'center' },
          { title: '资源名称', key: 'resourceName', minWidth: 80 },
          { title: '操作类型',
            minWidth: 220,
            render: (h, params) => {
              return h(OperationCell, {
                props: {
                  operations: params.row.operations,
                  operationList: this.getOperations
                },
                on: {
                  change: (operations) => {
                    this.onOperationChange(operations, params.index)
                  }
                }
              })
            }
          },
          {
            title: '操作',
            width: 70,
            render: (h, params) => {
              return h(
                'span',
                {
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.showConfirmModal(params.row.resourceId)
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
                  )
                ]
              )
            }
          }
        ]
      },
      resourceTypeList: []
    }
  },
  computed: {
    getSelectedIds () {
      return this.resourceData.selections.map(item => item.resourceId)
    },
    getOperations () {
      let typeId = this.resourceData.typeId
      if (typeId < 0) {
        let operations = []
        this.resourceTypeList.forEach(item => operations.push(...item.operations))
        return operations
      }
      let typeInfo = this.resourceTypeList.find(item => item.id === typeId)
      if (!this.resourceTypeList.length || !typeInfo) return []
      return typeInfo ? typeInfo.operations : []
    }
  },
  watch: {
    currentRole: {
      handler (curVal, oldVal) {
        if (curVal && curVal.id && this.resourceData.typeId) {
          this.getResourceData()
        }
      }
    }
  },
  mounted () {
    // 获取资源类型列表
    this.$axios.get(`${api.restyps}`).then(res => {
      this.resourceTypeList = res.data.body.restyps
    })
    this.getResourceData()
  },
  methods: {
    // 搜索资源
    onSearchClick () {
      this.getResourceData()
    },
    // 删除权限
    onDeleteClick () {
      this.$axios.delete(`${api.roles}/${this.currentRole.id}/permissions?resourceIds=${this.id}`).then(res => {
        this.$Message.success('删除成功！')
        this.getResourceData()
      })
    },
    showConfirmModal (id) {
      this.id = id
      if (!id) {
        this.$Message.warning('请选择权限！')
        return
      }
      this.$refs.confirmModal.handleModal({
        content: '是否确认删除？'
      })
    },
    showSettingModal () {
      if (!this.resourceData.selections.length) {
        this.$Message.warning('请选择权限！')
        return
      }
      this.isShowSettingModal = true
    },
    onModifySetting () {
      this.getResourceData()
      this.isShowSettingModal = false
      this.resourceData.selections = []
    },
    // 获取资源列表
    getResourceData () {
      this.resourceData.loading = true
      let { typeId, fuzzyName } = this.resourceData
      let { id } = this.currentRole
      let url = `${api.roles}/${id}/permissions?resourceTypeId=${typeId}`
      url = fuzzyName ? `${url}&fuzzyName=${fuzzyName}` : url

      // 全部资源
      if (typeId < 0) {
        url = `${api.roles}/${id}/permissions`
      }

      this.$axios.get(url).then(res => {
        this.resourceData.data = res.data.body.roles
      }).finally(() => {
        this.resourceData.loading = false
      })
    },
    // 获取新增权限
    getSubmitResource (typeId) {
      this.isShowAuthModal = false
      if (typeId === this.resourceData.typeId) {
        // 新增权限类型为当前列表显示类型刷新页面
        this.getResourceData()
      }
    },
    // 修改单个资源权限
    onOperationChange (operations, index) {
      let { resourceId } = this.resourceData.data[index]
      let url = `${api.roles}/${this.currentRole.id}/permissions?resourceIds=${resourceId}&operations=${operations}&action=config`
      this.$axios.put(url)
    },
    onSelectionChange (selections) {
      this.resourceData.selections = selections
    },
    // 资源类型改变
    onTypeChange () {
      this.getResourceData()
    }
  }
}
</script>
