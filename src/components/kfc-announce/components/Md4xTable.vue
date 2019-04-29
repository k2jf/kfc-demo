<template>
  <div class="md4x-table">
    <i-table
      :loading="loading"
      :columns="headers"
      :data="datas">
    </i-table>
    <div class="md4x-bottom">
      <i-page
        class="md4x-page"
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
  name: 'Md4xTable',

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
  .md4x-table {
  }
  .md4x-bottom {
    margin-top: 10px;
    width: 100%;
  }
  .md4x-page {
    float: right;
  }
</style>
