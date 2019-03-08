<template>
  <div>
    <Tabs value="name1">
      <TabPane label="服务作业" name="name1">
        <div style="width: 300px;margin-left: 0px">分析作业 <Input prefix="ios-search" placeholder="搜索" style="margin-left: 10px; width: 200px" /></div>
        <br/>
        <i-table style="margin-left: 10px;margin-right: 10px"
          :columns='table.headers'
          :data='table.dataList'>
        </i-table>
        <div class='md4x-bottom'>
          <i-page
            class='md4x-page'
            :current='pageNo'
            :total='table.total'
            @on-change='onPageNoChange'
            @on-page-size-change='onPageSizeChange'
            show-total
            show-sizer>
          </i-page>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { Table, Page, Tabs, TabPane, Input } from 'iview'
import { formatDateTime, formatDuring } from '@/components/jobs/utils'

export default {
  name: 'k2-job',
  components: {
    'i-table': Table,
    'i-page': Page,
    Tabs,
    TabPane,
    Input
  },
  mounted () {
    this.getJobsData()
  },
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      table: {
        headers: [
          { title: '序号', type: 'index', width: 80 },
          { title: '作业编号',
            render: (h, params) => {
              return h('span', params.row.instance.jobId)
            }
          },
          { title: '分析项目',
            render: (h, params) => {
              return h('span', params.row.project.projName)
            }
          },
          { title: '启动时间',
            render: (h, params) => {
              return h('span', formatDateTime(params.row.instance.taskInstance.startTime))
            }
          },
          { title: '结束时间',
            render: (h, params) => {
              return h('span', formatDateTime(params.row.instance.taskInstance.endTime))
            }
          },
          { title: '运行时长',
            render: (h, params) => {
              return h('span', formatDuring(params.row.instance.taskInstance.endTime - params.row.instance.taskInstance.startTime))
            }
          },
          { title: '运行状态',
            render: (h, params) => {
              return h('span', params.row.instance.taskInstance.status)
            }
          },
          { title: '运行结果',
            render: (h, params) => {
              return h('span', params.row.instance.taskInstance.result)
            }
          },
          { title: '执行者',
            render: (h, params) => {
              return h('span', params.row.instance.lastEditor)
            }
          },
          { title: '操作',
            width: 140,
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
        total: 7
      }
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
    },
    onPageChange (pageNo, pageSize) {
      this.table.tableLoading = true
      this.table.pageNo = pageNo
      this.table.pageSize = pageSize
      this.getJobsData()
    },
    getJobsData () {
      let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
      let xhr = new XMLHttpRequest()
      xhr.timeout = 6000
      xhr.ontimeout = function (event) {
        alert('请求超时！')
      }
      let url = `http://10.12.20.36:28085/pas/services/jobs?size=${this.table.pageSize}&page=${this.table.pageNo}`
      xhr.open('GET', url)
      xhr.setRequestHeader('K2_KEY', token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log(JSON.parse(xhr.responseText).result)
          this.table.dataList = JSON.parse(xhr.responseText).result
        }
      }
      xhr.send(null)
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
