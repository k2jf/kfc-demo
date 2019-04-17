<template>
  <div>
    <i-table
      :loading="loading"
      :columns="headers"
      :data="datas">
    </i-table>
    <div class="kfc-bottom">
      <i-page
        class="kfc-page"
        :current="pageNo"
        :total="total"
        show-total
        show-sizer
        v-if="!disablePage"
        @on-change="onPageNoChange"
        @on-page-size-change="onPageSizeChange">
      </i-page>
    </div>
  </div>
</template>

<script>
import { Table, Page } from 'iview'

export default {
  name: 'KfcTable',

  components: {
    'i-table': Table,
    'i-page': Page
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default () {
        return []
      }
    },
    datas: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    disablePage: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      pageNo: 1,
      pageSize: 10
    }
  },

  methods: {
    onPageNoChange (pageNo) {
      this.pageNo = pageNo
      this.$emit('on-page-change', pageNo, this.pageSize)
    },
    onPageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.$emit('on-page-change', this.pageNo, pageSize)
    },
    resetPage (pageNo, pageSize) {
      this.pageNo = pageNo
      this.pageSize = pageSize || this.pageSize
    }
  }
}
</script>

<style scoped>
  .kfc-bottom {
    margin-top: 10px;
    width: 100%;
  }
  .kfc-page {
    float: right;
  }
</style>
