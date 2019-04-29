<template>
  <div>
    <FieldSelection @on-field-select-change="handleChange" />
    <FieldSelectedButton @on-ok="handleOk" />
  </div>
</template>
<script>
import { FieldSelection, FieldSelectedButton } from '@/components/kfc-kmx-tsdw-field'

export default {
  components: {
    FieldSelection,
    FieldSelectedButton
  },
  methods: {
    handleChange (selectedFields) {
      // ...
    },
    handleOk (selectedFields) {
      // ...
    }
  }
}
</script>
