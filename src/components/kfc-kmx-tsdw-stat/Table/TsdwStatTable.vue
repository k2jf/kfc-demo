<template>
  <div :class="[prefixCls]">
    <div :class="[prefixCls + '-title']">
      <p>风场数据完整度TOP10 (最近三个月)</p>
    </div>
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
import DataApi from '../server.js'

const prefixCls = 'tsdw-stat-table'

export default {
  name: 'TsdwStatTable',
  components: {
    'i-table': Table,
    'i-page': Page
  },
  data () {
    return {
      columns: [
        { title: '序号', type: 'index' },
        { title: '数据类型', key: 'dataTypeNameCh' }
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
      DataApi.getDataTsdwStat(this.filters, this.pageNo, this.pageSize)
        .then(data => {
          this.data = data.data
          this.total = data.total
        })
    },
    onPageSizeChange (pageSize) {
      this.pageSize = pageSize
      DataApi.getDataTsdwStat(this.filters, this.pageNo, this.pageSize)
        .then(data => {
          this.data = data.data
          this.total = data.total
        })
    },
    reload (filters) {
      this.filters = filters
      this.pageNo = 1
      this.pageSize = 10

      DataApi.getDataTsdwStat(this.filters, this.pageNo, this.pageSize)
        .then(data => {
          this.data = data.data
          this.total = data.total
        })
    }
  }
}
</script>
