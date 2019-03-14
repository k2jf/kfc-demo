<template>
  <div>
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
  </div>
</template>

<script>
import { Button, Input } from 'iview'
import DataTypeSelector from '@/components/kfc-datatype-selector'

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
