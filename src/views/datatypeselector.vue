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
import { DataTypeSelector, DataTypeButton } from '@/components/kfc-kmx-tsdw-table'

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
