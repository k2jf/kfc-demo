# TimeSeries

## 功能
数据类型选择器

## 维护者
wangyanan

## 依赖
无

## 属性

| 属性        | 说明                                        | 类型   | 默认值 |
| ----------- | ------------------------------------------ | ------- | ------ |
| value       | 绑定v-model, true显示对话框, false隐藏对话框 | Boolean | false   |

## 示例
```
<template>
    <!--显示选择的数据类型id-->
    <Input placeholder="default size" v-model="dataType" />
   <!-- 触发对话框按钮 -->
    <Button type="primary" @click="checkDataType2">
      选择数据类型
    </Button>
    <DataTypeSelector
      v-model="modal2"
      @on-close="modal2 = false"
      @checked-type="getDataType" />
</template>

<script>
import { Button, Input } from 'iview'
import DataTypeSelector from '@/components/DataTypeSelector'

export default {
    components: {
        Button,
        Input,
        DataTypeSelector
    },
    data () {
        return {
            dataType: '',
            modal2: false
        }
    },
    methods: {
        checkDataType2 () {
            this.modal2 = !this.modal2
        },
        getDataType (val) {
            this.dataType = val
        }
    }
}
</script>

```