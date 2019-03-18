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
        :height="(selectField.length < 9 ? 'auto' : 300)">
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
          <span>{{ key }}：</span>
        </i-col>
        <i-col span="12">
          <span>{{ value }}</span>
        </i-col>
      </i-row>
    </div>
    <div class="dataMessage">
      <i-row>
        <i-col span="24">
          <span>查询条件:</span>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <span>时间：</span>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div v-for="(partitionItem,index) in partitionInfo" :key="index">
            <span v-for="(tsItem, tsIndex) in partitionInfo[index].ts" :key="tsIndex">
              {{ partitionInfo[index].ts && partitionInfo[index].ts[tsIndex].from }} - {{ partitionInfo[index].ts && partitionInfo[index].ts[tsIndex].to }}
            </span>
          </div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <span>id：</span>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div v-for="(partitionItem,index) in partitionInfo" :key="index">
            <span v-for="(compoundId, compoundIdIndex) in partitionInfo[index].ts" :key="compoundIdIndex">
              {{ partitionInfo[index].ts && partitionInfo[index].compoundId[compoundIdIndex].fieldKey }} {{ partitionInfo[index].ts && partitionInfo[index].compoundId[compoundIdIndex].condition }} {{ partitionInfo[index].ts && partitionInfo[index].compoundId[compoundIdIndex].fieldValue }}
            </span>
          </div>
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
        return this.datasetDetail.partitionInfo
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
      var url = `${api.dataSetDetail}?projId=${this.projectId}&id=${this.nodeId}`
      this.$axios.get(url).then(res => {
        this.datasetDetail = res.data.result
      })
    }
  }
}
</script>

<style scoped>
  .dataMessage {
    width: 98%;
    padding: 15px;
    margin: 10px auto auto auto;
    border: 1px solid #e8eaec;
  }
  #div-dm .ivu-row{
    height: 30px;
  }

</style>
