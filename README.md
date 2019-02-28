···
<template>
  <div>
    <k-job :label1="label1" :inputLable="inputLable" :headers="table.headers" :datas='table.dataList' :total='table.total' @on-page-change='onPageChange'></k-job>
  </div>
</template>

<script>
import k2Job from '@/components/k2-job'

export default {
  name: 'service-jobs',
  components: {
    'k-job': k2Job
  },
  mounted () {
    this.addData()
  },
  data () {
    return {
      label1: '服务作业',
      inputLable: '分析作业',
      table: {
        headers: [
          { title: '序号', type: 'index', width: 80 },
          { title: '作业编号', key: 'jobId' },
          { title: '启动时间', key: 'startTimeFormat' },
          { title: '结束时间', key: 'endTimeFormat' },
          { title: '运行进度', key: 'progress' },
          { title: '运行状态', key: 'status' },
          { title: '运行结果', key: 'result' },
          { title: '执行者', key: 'runForUserName' },
          { title: '操作',
            width: 140,
            render: (h, params) => {
              if (params.row.resultHdfsUrl == null || params.row.resultHdfsUrl === '') {
                if (params.row.progress === '100.00%') {
                  return h('div', [
                    h('a', {
                      style: {
                        marginRight: '5px',
                        color: '#c5c8ce'
                      },
                      on: {
                      }
                    }, '下载'),
                    h('a', {
                      style: {
                        marginRight: '5px',
                        color: '#c5c8ce'
                      },
                      on: {
                      }
                    }, '停止'),
                    h('a', {
                      style: {
                        color: 'grey'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    }, '删除')
                  ])
                } else {
                  return h('div', [
                    h('a', {
                      style: {
                        marginRight: '5px',
                        color: '#c5c8ce'
                      },
                      on: {
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
              } else {
                if (params.row.progress === '100.00%') {
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
                        marginRight: '5px',
                        color: '#c5c8ce'
                      },
                      on: {
                      }
                    }, '停止'),
                    h('a', {
                      style: {
                        color: 'grey'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    }, '删除')
                  ])
                } else {
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
    onPageChange (pageNo, pageSize) {
      this.table.tableLoading = true
      this.table.pageNo = pageNo
      this.table.pageSize = pageSize
      this.reloadTable()
    },
    addData () {
      var obj = JSON.parse('[{"appTypeId":null,"endTime":1545989357000,"endTimeFormat":"2018-12-28 17:29:17","id":52,"jobId":30283,"message":"当前服务下有正在运行的作业.","msCategoryName":null,"msName":null,"progress":"100.00%","result":"FAILED","resultHdfsUrl":null,"runForUserName":"tadmin_goldwind","serviceId":null,"startTime":1545989357000,"startTimeFormat":"2018-12-28 17:29:17","status":"FINISHED"},{"appTypeId":null,"endTime":1545989249000,"endTimeFormat":"2018-12-28 17:27:29","id":52,"jobId":30282,"message":"当前服务下有正在运行的作业.","msCategoryName":null,"msName":null,"progress":"100.00%","result":"FAILED","resultHdfsUrl":null,"runForUserName":"tadmin_goldwind","serviceId":null,"startTime":1545989249000,"startTimeFormat":"2018-12-28 17:27:29","status":"FINISHED"},{"appTypeId":null,"endTime":1546761069000,"endTimeFormat":"2019-01-06 15:51:09","id":52,"jobId":30278,"message":null,"msCategoryName":null,"msName":null,"progress":"100.00%","result":"FAILED","resultHdfsUrl":null,"runForUserName":"tadmin_goldwind","serviceId":null,"startTime":1545987708000,"startTimeFormat":"2018-12-28 17:01:48","status":"FINISHED"},{"appTypeId":null,"endTime":1545757447000,"endTimeFormat":"2018-12-26 01:04:07","id":52,"jobId":30179,"message":"没有输出结果。\\r\\n没有抽取结果。","msCategoryName":null,"msName":null,"progress":"100.00%","result":"SUCCESS","resultHdfsUrl":null,"runForUserName":"liuxiaoxuan","serviceId":null,"startTime":1545757200000,"startTimeFormat":"2018-12-26 01:00:00","status":"FINISHED"},{"appTypeId":null,"endTime":1545632233000,"endTimeFormat":"2018-12-24 14:17:13","id":52,"jobId":30162,"message":"没有输出结果。\\r\\n没有抽取结果。","msCategoryName":null,"msName":null,"progress":"100.00%","result":"SUCCESS","resultHdfsUrl":null,"runForUserName":"liuxiaoxuan","serviceId":null,"startTime":1545631686000,"startTimeFormat":"2018-12-24 14:08:06","status":"FINISHED"},{"appTypeId":null,"endTime":1545616472000,"endTimeFormat":"2018-12-24 09:54:32","id":52,"jobId":30151,"message":"   ","msCategoryName":null,"msName":null,"progress":"100.00%","result":"SUCCESS","resultHdfsUrl":"/md4x/service_52/30151/20181224094954518/PREPROCESSING/operation1","runForUserName":"liuxiaoxuan","serviceId":null,"startTime":1545616194000,"startTimeFormat":"2018-12-24 09:49:54","status":"FINISHED"},{"appTypeId":null,"endTime":1545616061000,"endTimeFormat":"2018-12-24 09:47:41","id":52,"jobId":30150,"message":"没有输出结果。\\r\\n没有抽取结果。","msCategoryName":null,"msName":null,"progress":"100.00%","result":"SUCCESS","resultHdfsUrl":null,"runForUserName":"liuxiaoxuan","serviceId":null,"startTime":1545615979000,"startTimeFormat":"2018-12-24 09:46:19","status":"FINISHED"}]')
      this.table.dataList = obj
    }
  }
}
</script>

<style scoped>

</style>
···
