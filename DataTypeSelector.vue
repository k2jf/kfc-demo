<template>
  <Modal
    class-name="data-type-modal"
    title="请选择数据类型"
    :mask-closable="false"
    :closable="false"
    style="height: 40px"
    v-model="val"
    @on-ok="ok"
    @on-cancel="cancel">
    <div class="data-type-tab">
      <Tabs value="realTime" @on-click="changeTab">
        <TabPane label="时序数据" name="realTime">
          <div class="tab-pane-div">
            <div
              class="col"
              :style="{border: checkedTypeId === item.id ? '1px solid #16A8F3' : '1px solid #fff'}"
              v-for="item in realTimeDataType"
              :key="item.id"
              @click="onSelectChange(item.id)">
              <Row>
                <Col span="4">
                <h1><img src="../../assets/category_7s.png" style="width: 40px"></h1>
                </Col>
                <Col span="14">
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
              :style="{border: checkedTypeId === item.objectClassId ? '1px solid #16A8F3' : '1px solid #fff'}"
              v-for="item in objectClassDataType"
              :key="item.objectClassId"
              @click="onSelectChange(item.objectClassId)">
              <Row>
                <Col span="4">
                <h1><img src="../../assets/category_b.png" style="width: 40px"></h1>
                </Col>
                <Col span="14">
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
  </Modal>
</template>

<script>
import { Modal, Tabs, TabPane, Row, Col, Icon, Tooltip } from 'iview'

export default {
	name: 'DataTypeSelector',
	components: {
		Modal,
		Tabs,
		TabPane,
		Row,
		Col,
		Icon,
		Tooltip
	},
	props: {
		value: {
			type: Boolean,
			default: false,
			required: true
		},
		checkedDataType: {
			type: String,
			default: '',
			required: false
		}
	},
	data () {
		return {
			checkedTypeId: this.checkedDataType,
			val: this.value,
			realTimeDataType: [],
			objectClassDataType: [],
			currentDataType: ''
		}
	},
	watch: {
		value: function (val) {
			this.val = val
			if (this.val) {
				this.changeTab('realTime')
			}
		},
		checkedDataType: function (val) {
			this.checkedTypeId = val
		}
	},
	beforeDestroy () {
		this.checkedTypeId = ''
		this.currentDataType = ''
	},
	methods: {
		onSelectChange (val) {
			this.currentDataType = val
			this.checkedTypeId = val
		},
		ok () {
			if (this.currentDataType) {
				this.$emit('input-text', this.currentDataType)
			}
			this.$emit('on-close')
		},
		cancel () {
			// this.$Message.info('Clicked cancel')
			this.$emit('on-close')
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
			var xhr = new XMLHttpRequest()
			var url = 'http://10.12.20.36:8081/data-service/v2/field-groups?select=*&order=desc-createdAt&pageSize=20&page=1'
			let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..DKInRzSv705fETH7equI1Q.Je2FVCpN_G2umkeLSexnmpTQZz2TWfOhLgG39iYspF1vyQfq3xtvXBxRCPdrQhN4MLPLEXRTlPx1cbDsuu0o9DA7DbwiU82x2ojTgFCVy5HvRi_uKtJW_2nAetFUopoi-EmYPhI44xrITztR_aE0x83Em95ijchagmCu012uBqZdv9nKht3DFsUIMvF4CSLFJMa0tFE274D1yQI_456_5ixhCb7-NggOrJ5Z_0w2BwPl4hyncLpH_i33KdQKoiGvD-E1EtbAsKq007Gk0N6pkQ.APvHmLOA3uFkJAL3wnZba8o5vJTds0zL'
			if (name === 'objectClass') {
				url = 'http://10.12.20.36:28090/object-rest/object-classes/?page=1&pageSize=20'
			}
			xhr.open('GET', url, true)
			xhr.setRequestHeader('K2_KEY', token)
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (name === 'objectClass') {
						this.objectClassDataType = JSON.parse(xhr.responseText).objectClasses
					} else {
						this.realTimeDataType = JSON.parse(xhr.responseText).fieldGroups
					}
				}
			}
			xhr.send(null)
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
