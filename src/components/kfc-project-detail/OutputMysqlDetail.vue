<template>
  <div class="outputClass" id="d-output">
    <div
      class="dataMessage"
      v-for="(item, index) in output"
      :key="index">
      <i-row style="height: 30px">
        <i-col span="6" style="text-align: center">
          <span class="detail-key">数据库类型：</span>
        </i-col>
        <i-col span="6" style="text-align: left">
          <span class="detail-key">{{ item.name }}</span>
        </i-col>
        <i-col span="6" style="text-align: center">
          <span class="detail-key">数据库名称：</span>
        </i-col>
        <i-col span="6" style="text-align: left">
          <span class="detail-key">{{ item.conf.dbName }}</span>
        </i-col>
      </i-row>
      <i-row style="height: 30px">
        <i-col span="6" style="text-align: center">
          <span class="detail-key">数据库host：</span>
        </i-col>
        <i-col span="6" style="text-align: left">
          <span class="detail-key">{{ item.conf.host }}</span>
        </i-col>
        <i-col span="6" style="text-align: center">
          <span class="detail-key">数据库端口：</span>
        </i-col>
        <i-col span="6" style="text-align: left">
          <span class="detail-key">{{ item.conf.port }}</span>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="6" style="text-align: center">
          <span class="detail-key">数据库用户：</span>
        </i-col>
        <i-col span="6" style="text-align: left">
          <span class="detail-key">{{ item.conf.username }}</span>
        </i-col>
        <i-col span="6" style="text-align: center">
          <span class="detail-key">数据库密码：</span>
        </i-col>
        <i-col span="6" style="text-align: left">
          <span class="detail-key">{{ item.conf.password }}</span>
        </i-col>
      </i-row>
    </div>
  </div>
</template>

<script>
import { Row, Col } from 'iview'
export default {
	components: {
		'i-row': Row,
		'i-col': Col
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
			output: []
		}
	},
	mounted () {
		this.httpRequest()
	},
	methods: {
		httpRequest () {
			var xhr = new XMLHttpRequest()
			var url = 'http://10.12.20.36:28085/pas/services/projects/output-nodes?projId=' + this.projectId
			let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
			xhr.open('GET', url, true)
			xhr.setRequestHeader('K2_KEY', token)
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					this.output = JSON.parse(xhr.responseText).result
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
</style>
