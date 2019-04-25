<template>
  <div>
    <Button @click="handleClick">
      选择变量
    </Button>
    <Modal
      :styles="{width: '800px'}"
      title="选择变量"
      v-model="visible"
      @on-ok="ok"
      @on-cancel="cancel">
      <FieldSelection @on-field-select-change="handleChange" />
    </Modal>
  </div>
</template>
<script>
import { Button, Modal } from 'iview'
import FieldSelection from './FieldSelection'

export default {
  name: 'FieldSelectedButton',
  components: {
    Button,
    Modal,
    FieldSelection
  },
  data () {
    return {
      visible: false,
      fields: []
    }
  },
  methods: {
    ok () {
      this.$emit('on-ok', this.fields)
    },
    cancel () {
      console.log('Clicked cancel')
    },
    handleChange (selectedFields) {
      this.fields = selectedFields
    },
    handleClick () {
      this.visible = true
    }
  }
}
</script>
