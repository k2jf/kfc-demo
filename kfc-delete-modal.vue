<template>
  <i-modal
    v-model="visible"
    @on-ok="onOkClick"
    @on-cancel="onCancelClick"
  >
    <slot name="header">
      <div slot="header">
        {{ title }}
      </div>
    </slot>
    <slot><div>{{ desc }}</div></slot>
  </i-modal>
</template>

<script>
import { Modal } from 'iview'

export default {
  components: {
    'i-modal': Modal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: this.value
    }
  },
  watch: {
    value (val) {
      this.visible = val
    }
  },
  methods: {
    onOkClick () {
      this.$emit('input', false)
      this.$emit('on-ok')
    },
    onCancelClick () {
      this.$emit('input', false)
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang='css' scoped>
</style>
