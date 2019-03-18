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
import { api } from './api'
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
      var url = `${api.outputMysqlDetail}?projId=${this.projectId}`
      this.$axios.get(url).then(res => {
        this.output = res.data.result
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
</style>
