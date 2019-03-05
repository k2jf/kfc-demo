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
    <k-job></k-job>
  </div>
</template>

<script>
import k2Job from '@/components/jobs/k2-job'

export default {
  name: 'service-jobs',
  components: {
    'k-job': k2Job
  }
}
</script>

<style scoped>

</style>

