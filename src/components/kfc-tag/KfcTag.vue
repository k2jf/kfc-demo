<template>
  <KfcTable
    style="margin-top: 20px"
    :headers="table.headers"
    :datas="table.dataList"
    :total="table.total"
    ref="table"
    @on-page-change="onPageChange" />
</template>

<script>
import KfcTable from './KfcTable'
export default {
  name: 'KfcTag',
  components: {
    KfcTable
  },
  data () {
    return {
      table: {
        headers: [
          { title: '标签ID', key: 'id', width: '' },
          { title: '标签名称', key: 'tagName', width: '' },
          { title: '引用数量', key: 'num', width: '' },
          { title: '操作',
            width: '',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editTag(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removeTag(params.index)
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
      this.$axios.get('/tag').then(res => {
        this.table.dataList = res.data.body.tags
        this.table.total = res.data.body.tags.length
      })
    },
    onPageChange (pageNo, pageSize) {
      this.table.pageNo = pageNo
      this.table.pageSize = pageSize
      this.reloadTable()
    },
    editTag () {

    },
    removeTag () {

    }
  }
}
</script>

<style scoped>

</style>
