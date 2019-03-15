<template>
  <div :class="[prefixCls]">
    <div :class="[prefixCls + '-body']">
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
    </div>
  </div>
</template>

<script>
import { Table, Page } from 'iview'
import DateCell from './DateCell.vue'

const prefixCls = 'project-table'

export default {
  name: 'Table',
  components: {
    'i-table': Table,
    'i-page': Page
  },
  data () {
    return {
      columns: [
        { title: '序号', type: 'index' },
        { title: '项目名称', key: 'projName' },
        { title: '描述', key: 'description' },
        { title: '创建者', key: 'creator' },
        { title: '拥有者', key: 'owner' },
        { title: '创建时间',
          render: (h, params) => {
            return h(DateCell, {
              props: {
                timestamp: params.row.createTime
              }
            })
          }
        },
        { title: '更新时间',
          render: (h, params) => {
            return h(DateCell, {
              props: {
                timestamp: params.row.updateTime
              }
            })
          }
        }
      ],
      data: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      filters: null,
      prefixCls: prefixCls
    }
  },
  methods: {
    onPageNoChange (pageNo) {
      this.pageNo = pageNo
      this.reloadTable()
    },
    onPageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.reloadTable()
    },
    reload (filters) {
      this.filters = filters
      this.pageNo = 1
      this.pageSize = 10

      this.reloadTable()
    },

    reloadTable () {
      let params = {}
      for (let key in this.filters) {
        if (this.filters[key]) {
          params[key] = this.filters[key]
        }
      }

      this.$axios.get(`/kmx/pas/services/projects?size=${this.pageSize}&page=${this.pageNo}`, { params: params })
        .then(res => {
          this.data = res.data.result
          this.total = res.data.pageInfo.total
        })
    }
  }
}
</script>
