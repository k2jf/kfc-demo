<template>
  <div class="data-type-tab">
    <Tabs value="realTime" @on-click="changeTab">
      <TabPane label="时序数据" name="realTime">
        <div class="tab-pane-div">
          <div
            class="col"
            :style="{border: checkedTypeId === item.id ? '1px solid #16A8F3' : '1px solid #cdcdcd'}"
            v-for="item in realTimeDataType"
            :key="item.id"
            @click="onSelectChange(item.id)">
            <Row>
              <Col span="2">
              <h1>&nbsp;</h1>
              </Col>
              <Col span="16">
              <h3>{{ item.id }}</h3>
              </Col>
              <Col span="4">
              <h5>
                <Tooltip
                  content="30天数据完整度"
                  placement="top"
                  :transfer="true">
                  <span>80%</span>
                </Tooltip>
              </h5>
              </Col>
              <Col span="2">
              <h4><Icon type="ios-arrow-forward" /></h4>
              </Col>
            </Row>
          </div>
        </div>
      </TabPane>
      <TabPane label="对象数据" name="objectClass">
        <div class="tab-pane-div">
          <div
            class="col"
            :style="{border: checkedTypeId === item.objectClassId ? '1px solid #16A8F3' : '1px solid #cdcdcd'}"
            v-for="item in objectClassDataType"
            :key="item.objectClassId"
            @click="onSelectChange(item.objectClassId)">
            <Row>
              <Col span="2">
              <h1>&nbsp;</h1>
              </Col>
              <Col span="16">
              <h3>{{ item.objectClassName }}</h3>
              </Col>
              <Col span="4">
              <h5>
                <Tooltip
                  content="30天文件个数"
                  placement="top"
                  :transfer="true">
                  <span>2</span>
                </Tooltip>
              </h5>
              </Col>
              <Col span="2">
              <h4><Icon type="ios-arrow-forward" /></h4>
              </Col>
            </Row>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { Tabs, TabPane, Row, Col, Icon, Tooltip } from 'iview'
import { api } from './api'
export default {
  name: 'DataTypeSelector',
  components: {
    Tabs,
    TabPane,
    Row,
    Col,
    Icon,
    Tooltip
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      checkedTypeId: this.value,
      realTimeDataType: [],
      objectClassDataType: [],
      currentDataType: this.value
    }
  },
  beforeDestroy () {
    this.checkedTypeId = ''
    this.currentDataType = ''
  },
  mounted () {
    this.changeTab('realTime')
  },
  methods: {
    onSelectChange (val) {
      this.currentDataType = val
      this.checkedTypeId = val
      if (this.currentDataType) {
        this.$emit('input', this.currentDataType)
      }
    },
    changeTab (name) {
      switch (name) {
      case 'realTime':
        if (this.realTimeDataType && this.realTimeDataType.length !== 0) {
          break
        }
        this.getDataType('realTime')
        break
      case 'objectClass':
        if (this.objectClassDataType && this.objectClassDataType.length !== 0) {
          break
        }
        this.getDataType('objectClass')
        break
      default:
        this.getDataType('realTime')
      }
    },
    getDataType (name) {
      var url = `${api.realTimeData}?select=*&order=desc-createdAt&pageSize=20&page=1`
      if (name === 'objectClass') {
        url = `${api.classObjectData}?page=1&pageSize=20`
      }
      this.$axios.get(url).then(res => {
        if (name === 'objectClass') {
          this.objectClassDataType = res.data.objectClasses
        } else {
          this.realTimeDataType = res.data.fieldGroups
        }
      })
    }
  }
}
</script>

<style scoped>
  .tab-pane-div{
    overflow-y:auto;
    overflow-x:auto;
    height: 360px;
  }
  .col {
    background: #fff;
    border: 1px solid #cdcdcd;
    padding: 0px 0px;
    height: 50px;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: border-color .3s ease, box-shadow .3s ease;
  }

  h1 {
    text-align: center;
  }

  h3 {
    /* display: inline-block; */
    /* width: 160px; */
    /* margin-left: 20px; */
    line-height: 50px;
    text-align: left;
    color:#333;
  }

  h4 {
    line-height: 50px;
  }

  h5 {
    line-height: 50px;
    font-weight: normal;
    color: #999;
  }
</style>
