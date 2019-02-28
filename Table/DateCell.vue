<template>
  <span>{{ formatedDate }}</span>
</template>

<script>
import DateUtil from '../utils/date-util.js'

export default {
	name: 'DateCell',
  props: {
    timestamp: {
      type: Number
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    }
  },
	computed: {
    formatedDate: function () {
      return DateUtil.formatToStr(new Date(this.timestamp), this.format)
    }
  }
}

</script>
