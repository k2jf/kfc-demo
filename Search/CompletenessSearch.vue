<template>
  <div :class="[prefixCls]">
    <div :class="[prefixCls + '-title']">
      <p>数据完整度查询</p>
    </div>
    <i-row :class="[prefixCls + '-body']">
      <i-col span="3">
        <span>时间范围:</span>
      </i-col>
      <i-col span="6">
        <i-date-picker
          type="daterange"
          format="yyyy-MM-dd"
          placeholder="请选择时间范围"
          v-model="dateRange" />
      </i-col>
      <i-col span="3">
        <p>数据类型:</p>
      </i-col>
      <i-col span="6">
        <i-select v-model="filters.dataType">
          <i-option
            :value="opt.id"
            v-for="opt in dataTypes"
            :key="opt.id">
            {{ opt.tableNameCh }}
          </i-option>
        </i-select>
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
import { Row, Col, Button, DatePicker, Select, Option } from 'iview'
import DataApi from '../server.js'
import DateUtil from '../utils/date-util.js'

const prefixCls = 'completeness-search'

export default {
	name: 'CompletenessSearch',
	components: {
		'i-row': Row,
		'i-col': Col,
		'i-button': Button,
		'i-date-picker': DatePicker,
		'i-select': Select,
		'i-option': Option
	},
	data () {
		return {
			filters: {
				startTime: '',
				endTime: '',
				dataType: null
			},
			dataTypes: [],
			dateRange: [],
			prefixCls: prefixCls
		}
	},
	mounted () {
		DataApi.getDataTypes()
			.then(data => {
				this.dataTypes = data
			})

		this.setDatePicker()
	},
	methods: {
		onSearchClick () {
			if (this.dateRange.length === 2) {
				this.filters.startTime = DateUtil.toSecStr(this.dateRange[0])
				this.filters.endTime = DateUtil.toSecStr(this.dateRange[1])
			}

			this.$emit('click', this.filters)
		},

		setDatePicker () {
			let now = DateUtil.now()
			this.dateRange[0] = DateUtil.addMonth(now, -3)
			this.dateRange[1] = now

			this.filters.startTime = DateUtil.toSecStr(this.dateRange[0])
			this.filters.endTime = DateUtil.toSecStr(this.dateRange[1])
			this.$emit('init-ok', this.filters)
		}
	}
}
</script>
