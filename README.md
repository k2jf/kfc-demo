# kfc-pas-jobs-list

## 功能
项目作业结果

## 维护者
wangliheng@k2data.com.cn

| 属性        | 说明     | 类型   | 默认值 |
| ----------- | -------- | ------ | ------ |
| datas | 列表数据 | Object | -      |
| total | 数据总量 | Object | -      |

## 示例
```
<template>
  <div>
    <k-job :datas='table.dataList' :total='table.total' @on-page-change='onPageChange'></k-job>
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
    this.getJobsData()
  },
  data () {
    return {
      table: {
        dataList: [],
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    onPageChange (pageNo, pageSize) {
      this.table.tableLoading = true
      this.table.pageNo = pageNo
      this.table.pageSize = pageSize
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

</style>
