<template>
  <div>
    <span style="width: 450px;">
      <span class="four-char">标签名称:</span>
      <Input
        style="width: 8em;margin-left: 0.5em"
        placeholder="标签名称"
        v-model="searchContent" />
    </span>
    <span style="width: 9em; margin-left: 1em">
      <Button :type="'primary'" @click="handleSearch">查询</Button>
      <Button style="margin-left: 8px;" @click="reloadTable">重置</Button>
    </span>
    <span style="float: right;">
      <Button :type="'primary'" @click="handleAdd">添加</Button>
    </span>
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
import { Input, Button } from 'iview'
import KfcTable from './KfcTable'

export default {
  name: 'KfcTag',
  components: {
    KfcTable,
    Input,
    Button
  },
  data () {
    return {
      searchContent: '',
      table: {
        headers: [
          { title: '标签ID', key: 'id', width: '' },
          { title: '标签名称', key: 'tagName', width: '' },
          { title: '引用数量', key: 'num', width: '' },
          { title: '操作',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editTag(params)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removeTag(params)
                    }
                  }
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
  mounted () {
    this.reloadTable()
  },
  methods: {
    reloadTable () {
      this.$axios.get('/tags').then(res => {
        this.table.dataList = res.data.body.tags
        this.table.total = res.data.body.tags.length
      })
    },
    onPageChange (pageNo, pageSize) {
      this.table.pageNo = pageNo
      this.table.pageSize = pageSize
      this.reloadTable()
    },
    editTag (params) {
      console.log(params)
    },
    removeTag (params) {
      console.log(params)
    },
    handleSearch () {},
    handleAdd () {}
  }
}
</script>

<style scoped>

</style>
