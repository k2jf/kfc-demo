<template>
  <div>
    <div
      class="button-div"
      :style="{'border': borderStyle}"
      style="display: inline-block"
      @click="openModal">
      <slot name="button">
        <Button type="primary">
          选择数据类型
        </Button>
      </slot>
    </div>
    <Modal
      class-name="data-type-modal"
      title="请选择数据类型"
      :mask-closable="false"
      :closable="false"
      style="height: 40px"
      v-model="openFlag">
      <DataTypeSelector v-model="currentDataType" />
      <Button
        key="primary"
        slot="footer"
        @click="cancel">
        取消
      </Button>
    </Modal>
  </div>
</template>

<script>
import { Button, Modal } from 'iview'
import DataTypeSelector from './DataTypeSelector.vue'
export default {
  name: 'DataTypeButton',
  components: {
    Button,
    Modal,
    DataTypeSelector
  },
  props: {
    value: {
      type: [String, Number]
    },
    borderStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      openFlag: false,
      currentDataType: ''
    }
  },
  watch: {
    value: function (val) {
      this.currentDataType = val
    },
    currentDataType: function (val) {
      this.$emit('input', val)
      this.openFlag = false
    }
  },
  methods: {
    openModal () {
      this.openFlag = true
    },
    cancel () {
      this.openFlag = false
    }
  }
}
</script>
