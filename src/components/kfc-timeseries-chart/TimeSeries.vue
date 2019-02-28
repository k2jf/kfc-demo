<template>
  <div class="chart-container" ref="TimeSeriesChart" />
</template>

<script>
import Echarts from 'echarts'

export default {
  name: 'TimeSeries',
  props: {
    queryParams: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      timeSeriesData: null,
      seriesItem: {
        type: 'line',
        showSymbol: false,
        legendHoverLink: true,
        lineStyle: {
          width: 0.5
        }
      },
      option: {
        title: {
          text: 'F084机组',
          textStyle: {
            color: '#666'
          },
          top: 10,
          left: 'center'
        },
        legend: {
          data: [
            'WTUR_Temp_Ra_F32',
            'WTUR_WSpd_Ra_F32'
          ],
          bottom: 0
        },
        toolbox: {
          feature: {
            dataZoom: {},
            restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {},
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            min: 'dataMin',
            max: 'dataMax'
          },
          {
            type: 'value',
            splitLine: {
              show: false
            },
            min: 'dataMin',
            max: 'dataMax'
          }
        ]
      }
    }
  },
  watch: {
    timeSeriesData: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.showTimeSeriesChart()
        }
      },
      deep: true
    }
  },
  created () {
    this.getTimeSeriesData()
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化图表
    init () {
      this.timeSeriesChart = Echarts.init(this.$refs.TimeSeriesChart)
      this.timeSeriesChart.showLoading({ text: '加载中...' })
    },
    // 调用接口获取时序数据
    getTimeSeriesData () {
      let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..DKInRzSv705fETH7equI1Q.Je2FVCpN_G2umkeLSexnmpTQZz2TWfOhLgG39iYspF1vyQfq3xtvXBxRCPdrQhN4MLPLEXRTlPx1cbDsuu0o9DA7DbwiU82x2ojTgFCVy5HvRi_uKtJW_2nAetFUopoi-EmYPhI44xrITztR_aE0x83Em95ijchagmCu012uBqZdv9nKht3DFsUIMvF4CSLFJMa0tFE274D1yQI_456_5ixhCb7-NggOrJ5Z_0w2BwPl4hyncLpH_i33KdQKoiGvD-E1EtbAsKq007Gk0N6pkQ.APvHmLOA3uFkJAL3wnZba8o5vJTds0zL'

      var xhr = new XMLHttpRequest()
      var url = 'http://10.12.20.36:8124/batch-rest/dataset'
      var body = this.queryParams

      xhr.open('POST', url, true)
      xhr.setRequestHeader('K2_KEY', token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.timeSeriesData = JSON.parse(xhr.responseText).body.results
        }
      }
      xhr.send(JSON.stringify(body))
    },
    // 时序折线图
    showTimeSeriesChart () {
      let option = {
        ...this.option,
        series: this.getSeriesData()
      }
      this.timeSeriesChart.hideLoading()
      this.timeSeriesChart.setOption(option)
      window.onresize = this.timeSeriesChart.resize
    },
    getSeriesData () {
      let legendData = this.option.legend.data
      let seriesList = []
      legendData.forEach((legendItem, index) => {
        seriesList.push({
          name: legendItem,
          yAxisIndex: index % 2 === 0 ? 0 : 1,
          ...this.seriesItem,
          markLine: {
            data: [{
              name: '平均值',
              type: 'average'
            }],
            symbol: 'circle',
            symbolSize: 2,
            label: {
              show: false
            }
          },
          data: this.getSeriesDataItem(legendItem)
        })
      })
      return seriesList
    },
    getSeriesDataItem (legendItem) {
      const seriesData = this.timeSeriesData.reduce((seriesList, item) => {
        seriesList.push([item.ts, item[legendItem]])
        return seriesList
      }, [])

      return seriesData
    }
  },
  beforDestory () {
    this.timeSeriesChart.clear()
  }
}
</script>

<style lang="css" scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
