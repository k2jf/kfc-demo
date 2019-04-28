# EafProjectDetail

## 功能
Eaf项目详情， 可重试

## 维护者
wangyanan

## 依赖
无

## 属性

| 属性        | 说明                                        | 类型   | 默认值 |
| ----------- | ------------------------------------------ | ------- | ------ |
| value       | 绑定v-model, 查询项目id | Number | 无   |

## 示例
```
<template>
  <div>
    <EafProjectDetail v-model="projectId" />
  </div>
</template>

<script>
import EafProjectDetail from '@/components/kfc-kmx-eaf-project'
export default {
  components: {
    EafProjectDetail
  },
  data () {
    return {
      projectId: 102295
    }
  }
}
</script>
```
