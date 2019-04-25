# DataTypeSelector

## 功能
数据类型选择器

## 维护者
wangyanan

## 组件
DataTypeSelector： 数据类型选择tab页展示
DataTypeButton： 数据类型选择button对话框展示

## 依赖
无

## 属性

| 属性        | 说明                                        | 类型   | 默认值 |
| ----------- | ------------------------------------------ | ------- | ------ |
| v-model       | 绑定v-model, 获取选中的数据类型| String,Number | 无   |

## Slot

| 名称        | 说明                                        |
| ----------- | ------------------------------------------ |
| button       | 自定义按钮，可以是img, icon，a等|

## 示例
```
<template>
  <div>
    <div style="width: 500px; height: 450px; margin:auto;margin-top: 20px;text-align: center;">
      <DataTypeSelector v-model="dataType01" />
      <span>数据类型id: {{ dataType01 }}</span>
    </div>
    <div style="text-align: center">
      <DataTypeButton v-model="dataType02">
        <!-- 使用slot修改按钮 -->
        <!-- <a href="#" slot="button">数据类型</a> -->
      </DataTypeButton>
      <span>数据类型id: {{ dataType02 }}</span>
    </div>
  </div>
</template>

<script>
import { DataTypeSelector, DataTypeButton } from '@/components/kfc-kmx-eaf-result'

export default {
  components: {
    DataTypeSelector,
    DataTypeButton
  },
  data () {
    return {
      dataType01: '',
      dataType02: ''
    }
  }
}
</script>

```
