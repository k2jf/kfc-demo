<template>
  <div>
    <Tabs value="name1">
      <TabPane label="项目作业" name="name1">
        <div style="width: 300px;margin-left: 0px">
          分析作业 <Input
            prefix="ios-search"
            placeholder="搜索"
            style="margin-left: 10px; width: 200px"
            v-model="content"
            @on-enter="onsearch()" />
        </div>
        <br />
        <i-table
          style="margin-left: 10px;margin-right: 10px"
          :columns="table.headers"
          :data="table.dataList">
        </i-table>
        <div class="md4x-bottom">
          <i-page
            class="md4x-page"
            :current="pageNo"
            :total="table.total"
            show-total
            show-sizer
            @on-change="onPageNoChange"
            @on-page-size-change="onPageSizeChange">
          </i-page>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { Table, Page, Tabs, TabPane, Input } from 'iview'
import { formatDateTime, formatDuring } from '@/components/kfc-kmx-eaf-job/utils'

export default {
  name: 'Jobs',
  components: {
    'i-table': Table,
    'i-page': Page,
    Tabs,
    TabPane,
    Input
  },
  data () {
    return {
      content: '',
      pageNo: 1,
      pageSize: 10,
      table: {
        headers: [
          { title: '序号', type: 'index', width: 80 },
          { title: '作业编号',
            render: (h, params) => {
              return h('span', params.row.instance.jobId)
            },
            width: 120
          },
          { title: '分析项目',
            render: (h, params) => {
              return h('span', params.row.project.projName)
            },
            minWidth: 180
          },
          { title: '启动时间',
            render: (h, params) => {
              return h('span', formatDateTime(params.row.instance.taskInstance.startTime))
            },
            width: 180
          },
          { title: '结束时间',
            render: (h, params) => {
              return h('span', formatDateTime(params.row.instance.taskInstance.endTime))
            },
            width: 180
          },
          { title: '运行时长',
            render: (h, params) => {
              return h('span', formatDuring(params.row.instance.taskInstance.endTime - params.row.instance.taskInstance.startTime))
            },
            width: 120
          },
          { title: '运行状态',
            render: (h, params) => {
              return h('span', params.row.instance.taskInstance.status)
            },
            width: 120
          },
          { title: '运行结果',
            render: (h, params) => {
              return h('span', params.row.instance.taskInstance.result)
            },
            width: 120
          },
          { title: '执行者',
            render: (h, params) => {
              return h('span', params.row.instance.lastEditor)
            },
            minWidth: 120
          },
          { title: '操作',
            minWidth: 140,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.download(params)
                    }
                  }
                }, '下载'),
                h('a', {
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.stop(params)
                    }
                  }
                }, '停止'),
                h('a', {
                  style: {
                    color: '#c5c8ce'
                  },
                  on: {
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
    this.getJobsData()
  },

  methods: {
    onPageNoChange (pageNo) {
      this.pageNo = pageNo
      this.table.pageNo = pageNo
      // this.$emit('on-page-change', pageNo, this.pageSize)
      this.getJobsData()
    },
    onPageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.table.pageSize = pageSize
      // this.$emit('on-page-change', this.pageNo, pageSize)
      this.getJobsData()
    },
    resetPage (pageNo, pageSize) {
      this.pageNo = pageNo
      this.pageSize = pageSize || this.pageSize
    },
    getJobsData () {
      let url = ''
      if (this.content === '') {
        url = `/kmx/pas/services/jobs?size=${this.table.pageSize}&page=${this.table.pageNo}`
      } else {
        url = `/kmx/pas/services/jobs?size=${this.table.pageSize}&page=${this.table.pageNo}&type=like&name=${this.content}`
      }
      this.getData(url)
    },
    onsearch () {
      this.getJobsData()
    },
    getData (url) {
      this.$axios.get(url).then(res => {
        this.table.dataList = res.data.result
        this.table.total = res.data.pageInfo.total
      })
    },
    download (param) {
      console.log('下载')
      console.log(param)
    },
    stop (params) {
      console.log('停止')
      console.log(params)
    }
  }
}
</script>

<style scoped>
  .md4x-bottom {
    margin-top: 10px;
    width: 100%;
  }
  .md4x-page {
    float: right;
  }
</style>
