<template>
  <div id="project">
    <div class="project-detail">
      <i-row>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">项目名称：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">测试项目</span>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">创建者：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">wangyn</span>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">执行队列：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">default</span>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">输出路径：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">/Jeff_en</span>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">创建时间：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">2019-03-01 12:00:29</span>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">最后修改时间：</span>
        </i-col>
        <i-col span="4" style="text-align: left">
          <span class="detail-key">2019-03-01 12:07:54</span>
        </i-col>
      </i-row>
      <i-row>
        </i-col>
        <i-col span="4" style="text-align: center">
          <span class="detail-key">项目描述：</span>
        </i-col>
        <i-col span="16" style="text-align: left">
          <span class="detail-key">此处省略n多字</span>
        </i-col>
        <i-col span="4">
          <i-button type="primary" @click="runJob">
            运行
          </i-button>
        </i-col>
      </i-row>
    </div>
    <div class="div-params">
      <Tabs :value="flow.nodes[0].id">
        <TabPane
          :label="node.name"
          :name="node.id"
          v-for="(node, index) in flow.nodes"
          :key="index">
          <TabItemContent
            :itemType="node.type"
            :projectId="value"
            :nodeId="node.id" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { Row, Col, Tabs, TabPane, Button } from 'iview'
import TabItemContent from './TabItemContent.js'

export default {
  components: {
    'i-row': Row,
    'i-col': Col,
    Tabs,
    TabPane,
    TabItemContent,
    'i-button': Button
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      extensions: { 'pas.target.extraction.result.withTitle': true },
      flow: { 'nodes': [{ 'x': 5, 'y': 58, 'id': 'e6fdc3cf-7031-4843-9aab-60a5893b8a77', 'name': 'KMX时序数据源', 'type': 'data-set', 'input': 1, 'output': 1, 'operationId': 'f1834623-e78e-48f6-927d-bd9b0fca8bf9' }, { 'x': 142, 'y': 327, 'id': 'de43180f-ee07-4bdc-bb4d-edfb9bc47a53', 'name': 'mysql', 'type': 'output-mysql', 'input': 1, 'output': 1, 'operationId': '6c5bfb94-4ab9-466a-8f9f-cd5ecbe87dc5' }, { 'x': 140, 'y': 215, 'id': '0eab1a15-d7e0-4202-8b98-e0268d99e409', 'name': 'R脚本', 'type': 'script-alg', 'input': 2, 'output': 1, 'operationId': 'c1a14c95-88cf-44d5-a6d9-cde951316450' }, { 'x': 276, 'y': 52, 'id': '77a1cfa6-3c6e-4da0-9fad-990c9668bd60', 'name': '文件系统数据源', 'type': 'data-set', 'input': 1, 'output': 1, 'operationId': '1dcf8c1a-8e3f-4a70-bdff-9a3ca58e89e0' }], 'arrows': [{ 'to': { 'id': '0eab1a15-d7e0-4202-8b98-e0268d99e409', 'input': 'input', 'location': 1 }, 'from': { 'id': 'e6fdc3cf-7031-4843-9aab-60a5893b8a77', 'output': 'output', 'location': 1 } }, { 'to': { 'id': 'de43180f-ee07-4bdc-bb4d-edfb9bc47a53', 'input': 'input', 'location': 1 }, 'from': { 'id': '0eab1a15-d7e0-4202-8b98-e0268d99e409', 'output': 'output', 'location': 1 } }, { 'to': { 'id': '0eab1a15-d7e0-4202-8b98-e0268d99e409', 'input': 'input', 'location': 2 }, 'from': { 'id': '77a1cfa6-3c6e-4da0-9fad-990c9668bd60', 'output': 'output', 'location': 1 } }] }
    }
  },
  methods: {
    runJob () {
      alert('运行了项目' + this.value)
    }
  }
}
</script>

<style>
  .project-detail {
    width: 90%;
    padding:15px;
    margin:30px auto auto auto;
    border: 1px solid #e8eaec;
  }
  #project .ivu-row{
    height: 30px;
  }
  .div-params{
    width: 90%;
    text-align: left;
    margin: 15px auto auto auto;
    border: 1px solid #e8eaec;
  }
  /* #d-extention .ivu-col{
    text-align: left;
  } */
</style>
