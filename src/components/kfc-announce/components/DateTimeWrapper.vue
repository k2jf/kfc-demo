<template>
  <i-tooltip :content="longForm" placement="top">
    <span class="short-form-wrapper">{{ shortForm }}</span>
  </i-tooltip>
</template>

<script>

import { Tooltip } from 'iview'

const acceptFormatRegex = /^(\d{4}-\d\d-\d\d)[T ][0-9:]{5,}.*$/

export default {
  name: 'DateTimeWrapper',
  components: {
    'i-tooltip': Tooltip
  },
  props: {
    value: {
      required: true,
      /* eslint-disable vue/require-prop-type-constructor */
      type: Date | String | Number,
      /**
         * accommodate for various data types, such as:
         * 1. Date object
         * 2. String in form 'yyyy-MM-dd HH:mm:ss...' or 'yyyy-MM-ddTHH:mm:ssZ...'
         * 3. number (long), indicating a timestamp
         */
      validator: function (value) {
        return (value && typeof value === 'string')
          ? !!(new Date(value).getTime()) || acceptFormatRegex.test(value)
          : true
      }
    }
  },
  computed: {
    /**
       * convert value into human-readable form
       * @returns {string} of form 'yyyy-MM-dd....'
       */
    longForm () {
      if (!this.value) {
        console.warn('DateTimeWrapper: falsy value[%o]!', this.value)
        return '暂无数据'
      } else if (typeof this.value === 'string') {
        if (new Date(this.value).getTime() || acceptFormatRegex.test(this.value)) {
          // a well-formed string, output directly
          return this.value
        }
      } else if (typeof this.value === 'object') {
        return this.formatDate(this.value)
      } else if (typeof this.value === 'number') { // number
        return this.formatDate(new Date(this.value))
      }

      return '不能解析时间值' + this.value.toString()

      // return typeof this.value === 'string'
      //   ? this.value || '暂无数据'
      //   : typeof this.value === 'object'
      //     ? this.formatDate(this.value)
      //     : '不能解析时间值' + this.value.toString();
    },
    shortForm () {
      if (acceptFormatRegex.test(this.longForm)) {
        return this.longForm.match(acceptFormatRegex)[1]
      } else {
        return '--'
      }
    }
  },
  methods: {
    /**
       * convert Date object into 'yyyy-MM-dd HH:mm:ss' format
       * (copied from utils.js#formatDate, but that piece of code may change)
       * @param dateObj
       * @returns {string}
       */
    formatDate (dateObj) {
      const yearStr = dateObj.getFullYear()
      const monthStr = ('00' + (dateObj.getMonth() + 1)).slice(-2)
      const dateStr = ('00' + dateObj.getDate()).slice(-2)

      const hourStr = ('00' + dateObj.getHours()).slice(-2)
      const minuteStr = ('00' + dateObj.getMinutes()).slice(-2)
      const secondStr = ('00' + dateObj.getSeconds()).slice(-2)

      return `${yearStr}-${monthStr}-${dateStr} ${hourStr}:${minuteStr}:${secondStr}`
    }
  },

  /**
     * a cell-render function generator, specifically designed for this component.
     * @param key
     * @returns {function(*, *): *}
     */
  cellRenderForColumn (key) {
    return (h, params) => {
      return h(this, { props: { value: params.row[key] || '' } })
    }
  }
}

</script>

<style scoped>
  .short-form-wrapper {
    display: inline-block;
    min-width: 4em;
    text-align: center;
    white-space: nowrap;
  }
</style>
