<template>
  <div>
    <div style="margin-top: 1px">
      <span style="width: 15em;">
        <span class="four-char">操作用户</span>
        <Input
          class="four-char-out"
          placeholder="请输入用户名称"
          v-model="searchContent"></Input>
      </span>
      <span style="width: 21em;margin-left: 20px">
        <span class="four-char">操作时间</span>
        <DatePicker
          type="daterange"
          class="four-char-out"
          v-model="dateRange"></DatePicker>
      </span>
      <span style="width: 9em; margin-left: 20px">
        <Button type="primary" @click.native="onSearch">查询</Button>
        <Button style="margin-left: 5px" @click.native="onReset">重置</Button>
      </span>
    </div>
    <KfcTable
      style="margin-top: 20px"
      :headers="table.headers"
      :datas="table.dataList"
      :total="table.total"
      ref="table"
      @on-page-change="onPageChange" />
  </div>
</template>

<script>
import { Input, DatePicker, Button } from 'iview'
import KfcTable from './KfcTable'
export default {
  name: 'KfcAudit',
  components: {
    Input,
    DatePicker,
    Button,
    KfcTable
  },
  data () {
    return {
      searchContent: '',
      dateRange: [],
      table: {
        headers: [
          { title: '操作标题', key: 'title' },
          { title: '请求地址', key: 'requestURL' },
          { title: '请求方式', key: 'requestMethod' },
          { title: '操作用户', key: 'creator' },
          { title: '操作用户IP', key: 'ip' },
          { title: '操作时间', key: 'createDate' }
        ],
        dataList: [],
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.reloadTable()
  },
  methods: {
    // todo 对接数据
    reloadTable () {
      let param =
        {
          creator: this.searchContent,
          createStartDate: this.dateRange[0],
          createEndDate: this.dateRange[1],
          pageNo: this.table.pageNo,
          size: this.table.pageSize
        }
      this.$axios.get('/auditLogList', param).then(res => {
        this.table.dataList = res.body.audiLogList
        /* this.table.total = res.body. */
      })
    },
    onSearch () {
      this.reloadTable()
    },
    onReset () {
      this.searchContent = ''
      this.dateRange = []
      this.reloadTable()
    },
    onPageChange (pageNo, pageSize) {
      this.table.pageNo = pageNo
      this.table.pageSize = pageSize
      this.reloadTable()
    }
  }
}
</script>

<style scoped>
  .four-char {
    display: inline-block;
    text-align: right;
    width: 5em;
    margin-right: 0.5em;
    margin-top: 3px;
    vertical-align: text-top;
  }
  .four-char:after {
    content: ' :'
  }

  .four-char-out {
    width: calc( 100% - 6.5em );
    height: auto;
    display: inline-block;
    vertical-align: top;
    width: 200px;
  }
</style>
