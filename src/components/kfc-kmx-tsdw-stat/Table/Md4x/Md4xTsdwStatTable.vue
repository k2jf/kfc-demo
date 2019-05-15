<template>
  <component :is="panel" ref="table" />
</template>

<script>
import DataMd4xTsdwStatTable from './DataMd4xTsdwStatTable.js'
import FileMd4xTsdwStatTable from './FileMd4xTsdwStatTable.js'

export default {
  name: 'Md4xTsdwStatTable',
  components: {
    DataMd4xTsdwStatTable,
    FileMd4xTsdwStatTable
  },
  props: {
    type: {
      type: String,
      default: 'data'
    }
  },
  computed: {
    panel () {
      if (this.type === 'data') {
        return 'DataMd4xTsdwStatTable'
      }

      return 'FileMd4xTsdwStatTable'
    }
  },
  methods: {
    reload (filters) {
      this.$refs['table'].reload(filters)
    }
  }
}
</script>
