<!-- 资源类型信息 -->
<template>
  <div style="height: 100%;">
    <Row :gutter="16" class="margin-bottom">
      <Col span="16">资源类型:
      <Select
        transfer
        style="max-width:200px;margin-left:10px;"
        v-model="resourceData.typeId"
        @on-change="onTypeChange">
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
      </Col>
      <Col span="8">
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
import ConfirmModal from '../components/ConfirmModal.vue'

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
      isShowAuthModal: false,
      id: null, // 删除id
      resourceData: {
        loading: false,
        fuzzyName: '',
        typeId: 0,
        data: [{ id: 1, resource: 'name' }],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          { title: '资源名称', key: 'resourceName', minWidth: 80 },
          { title: '类型', key: 'operations', minWidth: 80 },
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
  },
  methods: {
    // 搜索资源
    onSearchClick () {
      this.getResourceData()
    },
    // 删除权限
    onDeleteClick () {
      this.$axios.delete(`${api.roles}/${this.currentRole.id}/permissions/${this.id}`).then(res => {
        this.$Message.success('删除成功！')
        this.getResourceData()
      })
    },
    showConfirmModal (id) {
      this.id = id
      this.$refs.confirmModal.handleModal({
        content: '是否确认删除？'
      })
    },
    // 获取资源列表
    getResourceData () {
      this.resourceData.loading = true
      let { typeId, fuzzyName } = this.resourceData
      let { id } = this.currentRole
      let url = `${api.roles}/${id}/permissions?resourceTypeId=${typeId}`
      url = fuzzyName ? `${url}&fuzzyName=${fuzzyName}` : url

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
    onSelectionChange (selections) {
    },
    // 资源类型改变
    onTypeChange () {
      this.getResourceData()
    }
  }
}
</script>
