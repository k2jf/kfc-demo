<template>
  <component :is="panel" ref="table" />
</template>

<script>
import DataMd4xCompletenessTable from './DataMd4xCompletenessTable.js'
import FileMd4xCompletenessTable from './FileMd4xCompletenessTable.js'

export default {
	name: 'Md4xCompletenessTable',
	components: {
		DataMd4xCompletenessTable,
		FileMd4xCompletenessTable
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
				return 'DataMd4xCompletenessTable'
			}

			return 'FileMd4xCompletenessTable'
		}
	},
	methods: {
		reload (filters) {
			this.$refs['table'].reload(filters)
		}
	}
}
</script>
