<template>
  <i-content>
    <p-search @click="onSearchClick" @init-ok="onSearchClick" />
    <p-table ref="table" />
  </i-content>
</template>

<script>
import { Content } from 'iview'
import Search from './Search'
import Table from './Table'

export default {
	name: 'CompletenessList',
	components: {
		'p-search': Search,
		'p-table': Table,
		'i-content': Content
	},
	data () {
		return {
			searchFilters: null
		}
	},
	methods: {
		onSearchClick (filters) {
			this.$refs['table'].reload(filters)
		}
	}
}
</script>
