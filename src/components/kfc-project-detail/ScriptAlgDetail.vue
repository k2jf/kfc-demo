<template>
  <div class="scriptAlg" id="d-scrip-alg">
    <div class="dataMessage" id="div-dm">
      <i-row>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">分析类型：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">{{ scriptAlg.analysisType }}</span>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">脚本类型：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">{{ scriptAlg.fileType }}</span>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">入口文件：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">{{ mainScriptFile }}</span>
        </i-col>
      </i-row>
    </div>
    <!-- 入参展示 -->
    <div class="dataMessage" id="div-dm">
      <i-row>
        <i-col span="24">
          <span>算法入参</span>
        </i-col>
      </i-row>
      <i-table
        border
        :columns="inputHead"
        :data="inParam"
        :height="(inParam.length < 3 ? 'auto' : 200)">
      </i-table>
    </div>
    <!-- 出参展示 -->
    <div class="dataMessage" id="div-dm">
      <i-row>
        <i-col span="24">
          <span>算法出参</span>
        </i-col>
      </i-row>
      <i-table
        border
        :columns="outputHead"
        :data="outParam"
        :height="(outParam.length < 3 ? 'auto' : 200)">
      </i-table>
    </div>
    <!-- 高级参数 -->
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
  </div>
</template>

<script>
import { Row, Col, Table } from 'iview'
import { api } from './api'

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
      inputHead: [{ title: '名称', key: 'name' }, { title: '类型', key: 'type' }, { title: '值', key: 'value' }],
      outputHead: [{ title: '名称', key: 'name' }, { title: '类型', key: 'type' }],
      scriptAlg: {}
    }
  },
  computed: {
    mainScriptFile () {
      var mainFile = ''
      if (this.scriptAlg != null && this.scriptAlg.scriptFiles != null) {
        var scritFiles = this.scriptAlg.scriptFiles
        for (var i = 0; i < scritFiles.length; i++) {
          if (scritFiles[i].isMain) {
            mainFile = scritFiles[i].name
          }
        }
      }
      return mainFile
    },
    extension () {
      if (this.scriptAlg != null && this.scriptAlg.extention != null) {
        return this.scriptAlg.extention
      } else {
        return {}
      }
    },
    inParam () {
      if (this.scriptAlg != null && this.scriptAlg.inParam != null) {
        return this.scriptAlg.inParam
      } else {
        return []
      }
    },
    outParam () {
      if (this.scriptAlg != null && this.scriptAlg.outParam != null) {
        return this.scriptAlg.outParam
      } else {
        return []
      }
    }
  },
  mounted () {
    this.httpRequest()
  },
  methods: {
    httpRequest () {
      var url = `${api.scriptAlgDetail}?projId=${this.projectId}&id=${this.nodeId}`
      this.$axios.get(url).then(res => {
        this.scriptAlg = res.data.result
      })
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
