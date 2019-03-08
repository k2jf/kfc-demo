<!-- 资源类型信息 -->
<template>
  <div style="height: 100%;">
    <Row :gutter="16" class="margin-bottom">
      <Col span="6">资源类型管理</Col>
      <Col span="7">
      <Select
        :transfer="true"
        v-model="resourceData.appResTypeId"
        @on-change="onTypeChange">
        <template v-for="item in resourceTypeList">
          <Option
            :value="item.appResTypeId"
            :key="item.appResTypeId">
            {{ item.appResTypeName }}
          </Option>
        </template>
      </Select>
      </Col>
      <Col span="11">
      <Input
        placeholder="搜索资源个例id"
        v-model="resourceData.appResInfoId"
        @on-blur="onSearchClick"></Input>
      </Col>
    </Row>
    <Table
      :columns="resourceData.columns"
      :data="resourceData.data"
      size="small"
      :height="500"
      :loading="resourceData.loading"
      class="margin-bottom"></Table>
    <Page
      :total="resourceData.total"
      class="page-container"
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
// eslint-disable-next-line
import { Col, Row, Input, Select, Option, Table, Page, Icon } from 'iview'

export default {
  name: 'ResourceInfo',
  components: {
    Col,
    Row,
    Input,
    Select,
    Option,
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
    resourceTypeList: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    // 新增权限
    permission: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      resourceData: {
        page: 1,
        size: 20,
        total: 0,
        loading: false,
        appResInfoId: '',
        subjectType: 'role',
        appResTypeId: '',
        data: [],
        columns: [
          { title: '资源个例id', key: 'appResInfoId', minWidth: 110 },
          { title: '资源个例名称', key: 'appResInfoName', minWidth: 130 },
          { title: '权限',
            minWidth: 100,
            render: (h, params) => {
              return h(
                'span', params.row.operations.join(',')
              )
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
                      this.deleteResource(params.row.appResInfoId)
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
        if (curVal && curVal.id && this.resourceData.appResTypeId) {
          this.getResourceData()
        }
      }
    },
    permission: {
      handler (curVal, oldVal) {
        if (curVal && curVal.appResTypeId === this.resourceData.appResTypeId) {
          // 新增权限类型为当前列表显示类型刷新页面
          this.getResourceData()
        }
      }
    }
  },
  methods: {
    // 搜索资源
    onSearchClick () {
      this.getResourceData()
    },
    deleteResource (id) {
      var xhr = new XMLHttpRequest()
      var url = `http://10.12.20.36:28091/auth-service/v1/permissions?subjectId=${this.currentRole.id}&subjectType=role&appResTypeId=${this.resourceData.appResTypeId}&appResInfoId=${id}`

      xhr.open('DELETE', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.getResourceData()
        }
      }
      xhr.send(JSON.stringify({}))
    },
    // 获取资源列表
    getResourceData () {
      this.resourceData.loading = true
      let { page, size, subjectType, appResTypeId, appResInfoId } = this.resourceData
      let subjectId = this.currentRole.id
      let xhr = new XMLHttpRequest()
      let url = `http://10.12.20.36:28091/auth-service/v1/resourceinfos?page=${page}&size=${size}&subjectId=${subjectId}&subjectType=${subjectType}&appResTypeId=${encodeURIComponent(appResTypeId)}`

      if (appResInfoId) {
        url += `&appResInfoId=${appResInfoId}`
      }

      xhr.open('GET', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.resourceData.loading = false
          this.resourceData.data = JSON.parse(xhr.responseText).result
          this.resourceData.total = JSON.parse(xhr.responseText).pages.total
        }
      }
      xhr.send(null)
    },
    // 资源类型改变
    onTypeChange () {
      this.getResourceData()
    },
    // 切换页数
    onPageChange (page) {
      this.resourceData.page = page
      this.getResourceData()
    }
  }
}
</script>

<style lang="css" scoped>

</style>
