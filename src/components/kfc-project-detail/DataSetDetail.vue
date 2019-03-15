<template>
  <div class="dataset-detail" id="d-data-set">
    <div class="dataMessage" id="div-dm">
      <i-row>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">数据来源：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">{{ datasetDetail.dataSource }}</span>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">文件类型：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">{{ datasetDetail.dataType }}</span>
        </i-col>
        <i-col
          span="4"
          style="text-align: center"
          v-if="datasetDetail.dataSource==='kmx'">
          <span class="detail-key">数据类型：</span>
        </i-col>
        <i-col
          span="4"
          style="text-align: center"
          v-else-if="datasetDetail.dataSource==='hdfs'">
          <span class="detail-key">数据文件路径：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">{{ dataCategory }}</span>
        </i-col>
      </i-row>
    </div>
    <div class="dataMessage">
      <i-row>
        <i-col span="24">
          <span>抽取变量:</span>
        </i-col>
      </i-row>
      <i-table
        border
        :columns="selectHeader"
        :data="selectField"
        :height="(selectField.length < 9 ? 'auto' : 400)">
      </i-table>
    </div>
    <div class="dataMessage">
      <i-row>
        <i-col span="24">
          <span>高级参数:</span>
        </i-col>
      </i-row>
      <i-row v-for="(value, key) in extension" :key="key">
        <i-col span="12">
          <span>{{ key }}:</span>
        </i-col>
        <i-col span="12">
          <span>{{ value }}</span>
        </i-col>
      </i-row>
    </div>
    <div class="dataMessage">
      <i-row>
        <i-col span="24">
          <span>筛选条件:</span>
        </i-col>
      </i-row>
      <i-row style="height: 40px">
        <i-col span="24">
          <span>{{ partitionInfo }}</span>
        </i-col>
      </i-row>
    </div>
  </div>
</template>

<script>
import { Row, Col, Table } from 'iview'
export default {
	components: {
		'i-row': Row,
		'i-col': Col,
		'i-table': Table
	},
	props: {
		projectId: {
			type: Number,
			required: true
		},
		nodeId: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			datasetDetail: {},
			selectHeader: [{ title: '名称', key: 'name' }, { title: '类型', key: 'type' }]
		}
	},
	computed: {
		selectField () {
			if (this.datasetDetail != null && this.datasetDetail.stmtSelect != null) {
				return this.datasetDetail.stmtSelect
			} else {
				return []
			}
		},
		partitionInfo () {
			if (this.datasetDetail != null && this.datasetDetail.partitionInfo != null) {
				return JSON.stringify(this.datasetDetail.partitionInfo)
			} else {
				return ''
			}
		},
		extension () {
			if (this.datasetDetail != null && this.datasetDetail.extention != null) {
				return this.datasetDetail.extention
			} else {
				return {}
			}
		},
		dataCategory () {
			var sourceData = ''
			if (this.datasetDetail != null) {
				if (this.datasetDetail.dataSource === 'kmx' && this.datasetDetail.stmtTable != null) {
					sourceData = this.datasetDetail.stmtTable
				} else if (this.datasetDetail.dataSource === 'hdfs') {
					sourceData = this.datasetDetail.hdfsPath
				}
			}
			return sourceData
		}
	},
	mounted () {
		this.httpRequest()
	},
	methods: {
		httpRequest () {
			var xhr = new XMLHttpRequest()
			var url = 'http://10.12.20.36:28085/pas/services/projects/data-set?projId=' +
                 this.projectId + '&id=' + this.nodeId
			let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
			xhr.open('GET', url, true)
			xhr.setRequestHeader('K2_KEY', token)
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					this.datasetDetail = JSON.parse(xhr.responseText).result
				}
			}
			xhr.send(null)
		}
	}
}
</script>

<style scoped>
.dataMessage {
    width: 98%;
    padding:15px;
    margin:10px auto auto auto;
    border: 1px solid #e8eaec;
  }
  #div-dm .ivu-row{
    height: 30px;
  }

</style>
