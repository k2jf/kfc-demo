<template>
  <div :class="[prefixCls]">
    <i-row :class="[prefixCls + '-body']">
      <i-col span="3">
        <span>项目名称:</span>
      </i-col>
      <i-col span="6">
        <i-input v-model="filters.projName" />
      </i-col>
      <i-col span="3">
        <p>创建者:</p>
      </i-col>
      <i-col span="6">
        <i-input v-model="filters.creator" />
      </i-col>
      <i-col span="4">
        <i-button type="primary" @click="onSearchClick()">
          查询
        </i-button>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import { Row, Col, Button, Input } from 'iview'
import DataApi from '../server.js'
import DateUtil from '../utils/date-util.js'

const prefixCls = 'project-search'

export default {
	name: 'Search',
	components: {
		'i-row': Row,
		'i-col': Col,
		'i-button': Button,
		'i-input': Input
	},
	data () {
		return {
			filters: {
				projName: '',
				creator: ''
			},
      prefixCls: prefixCls
		}
	},
  mounted () {
    this.$emit('init-ok', this.filters)
  },
	methods: {
		onSearchClick () {
			this.$emit('click', this.filters)
		}
	}
}
</script>
