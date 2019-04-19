<template>
  <Card class="container">
    <p slot="title">
      让我们嵌入一些kmx的页面吧……<span style="color: red">记得连接VPN哟</span>
    </p>
    <div class="wrapper">
      <div class="form-wrapper">
        <span>嵌入的页面：</span>
        <span style="margin-left: 8px;">
          <i-select
            style="width: calc( 100% - 250px );"
            placeholder="选择一个页面..."
            v-model="selectedPage">
            <i-option
              :value="item"
              :label="item"
              v-for="(item, index) in pages"
              :key="index">
              {{ item }}
            </i-option>
          </i-select>
        </span>
        <span style="margin-left: 16px;">
          <Button type="primary" @click="popup">在弹出框中加载</Button>
        </span>
      </div>
      <div class="iframe-wrapper">
        <KmxIframe :targetUrl="url"></KmxIframe>
      </div>
    </div>
    <Modal
      class="popup-iframe-wrapper"
      title="kmx popup"
      draggable
      width="800"
      v-model="showModal">
      <div style="position: relative; height: 600px;">
        <KmxIframe :targetUrl="url" v-if="showModal"></KmxIframe>
      </div>
    </Modal>
  </Card>
</template>

<script>
import { Card, Select, Option, Button, Modal } from 'iview'
import KmxIframe from '@/components/kfc-kmx-iframe'

const urlDictionary = {
  '总览': 'http://10.12.20.36:5010/basic/overview',
  '时序数据-数据管理': 'http://10.12.20.36:5010/basic/tsdw/data-manage',
  '时序数据-数据批量导入': 'http://10.12.20.36:5010/basic/tsdw/batchload',
  '时序数据-数据定时导入': 'http://10.12.20.36:5010/basic/tsdw/timedloads',
  '时序数据-数据实时接入': 'http://10.12.20.36:5010/basic/tsdw/real-time-load'
}

export default {
  components: {
    Card,
    'i-select': Select, // note 注意！Select和Option组件不能随意改名。否则会发生回显失败
    'i-option': Option,
    Button,
    Modal,

    KmxIframe
  },
  data () {
    return {
      pages: Object.keys(urlDictionary),
      selectedPage: '',
      showModal: false
    }
  },
  computed: {
    url () {
      return urlDictionary[this.selectedPage]
    }
  },
  methods: {
    popup () {
      this.showModal = true
    }
  }
}
</script>

<style scoped>
  .iframe-wrapper {
    position: relative;
    height: 800px;
    margin: 16px 0;
    border: 1px solid #d9d9d9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
</style>
