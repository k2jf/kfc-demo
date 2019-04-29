<template>
  <div class="container">
    <div class="form-wrapper">
      <div class="form-row">
        <span style="width: 450px;">
          <span class="four-char">通知内容</span>
          <Input
            class="four-char-out"
            placeholder="请输入通知内容"
            v-model="searchContent" />
        </span>
        <span style="width: 9em;">
          <Button :type="'primary'" @click="handleSearch">查询</Button>
          <Button style="margin-left: 8px;" @click="reloadTable">重置</Button>
        </span>
        <span style="float: right;">
          <Button :type="'primary'" @click="handleAdd">添加</Button>
        </span>
      </div>
    </div>
    <div class="table-wrapper">
      <Md4xTable
        :headers="table.headers"
        :datas="table.dataList"
        :total="table.total"
        ref="table"
        @on-page-change="onPageChange" />
    </div>
    <AddModal ref="addModal"></AddModal>
    <DelModal ref="delModal"></DelModal>
  </div>
</template>

<script>
import { Button, Input } from 'iview'
import Md4xTable from '../components/Md4xTable'
import AddModal from './ModalAddAnnounce'
import DelModal from './ModalDelAnnounce'
import DateTimeWrapper from '../components/DateTimeWrapper'
import { getAnnounces } from '../api'

export default {
  name: 'Manager',
  components: {
    Button,
    Input,
    Md4xTable,
    AddModal,
    DelModal
  },
  data () {
    return {
      searchContent: '',
      table: {
        headers: [
          { title: '序号', type: 'index', 'width': 65 },
          { title: '通知内容', key: 'content', minWidth: 400 },
          /* { title: '通知状态', key: 'stateName',"width": 100 }, */
          { title: '启动时间', width: 120, render: DateTimeWrapper.cellRenderForColumn('startTime') },
          { title: '结束时间', width: 120, render: DateTimeWrapper.cellRenderForColumn('endTime') },
          { title: '创建时间', width: 120, render: DateTimeWrapper.cellRenderForColumn('createDate') },
          { title: '操作',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: { marginRight: '1em' },
                  on: { click: () => this.beforeEdit(params.index) }
                }, '编辑'),
                h('a', {
                  style: { color: 'grey' },
                  on: { click: () => this.beforeRemove(params.index) }
                }, '删除')
              ])
            }
          }
        ],
        dataList: [],
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.loadTable()
  },
  methods: {
    onPageChange (pageNo, pageSize) {
      this.table.pageNo = pageNo
      this.table.pageSize = pageSize
      this.loadTable()
    },

    loadTable () {
      const params = {
        page: this.table.pageNo,
        size: this.table.pageSize,
        content: this.searchContent || undefined
      }
      getAnnounces(params).then(data => {
        this.table.dataList = data.list
        this.table.total = data.total
      })
    },

    reloadTable () {
      this.table.total = 0
      this.table.pageNo = 1
      this.searchContent = ''
      this.loadTable()
    },

    handleSearch () {
      this.table.total = 0
      this.table.pageNo = 1
      this.loadTable()
    },

    handleAdd () {
      this.$refs['addModal'].openForAdd()
    },

    beforeEdit (index) {
      const thatFormItem = this.table.dataList[index]
      this.$refs['addModal'].openForEdit({
        content: '' + thatFormItem.content,
        dateRange: [thatFormItem.startTime, thatFormItem.endTime].map(Date),
        remark: '' + thatFormItem.remark
      })
    },

    beforeRemove (index) {
      this.$refs['delModal'].openForDelete(index)
    }
  }
}
</script>

<style scoped>

  @import "manager.css";

  .container {
    padding: 24px 8px;
    text-align: initial;
    font-size: 16px;
  }

  /* hack to dim the shadow on the fixed-right column */
  .table-wrapper >>> .ivu-table-fixed-right {
    box-shadow: 0 0 6px -2px rgba(0,0,0,.2);
  }
</style>
