<template>
  <div class="chart-container" ref="TimeSeriesChart" />
</template>

<script>
import Echarts from 'echarts'
import { api } from './api'

export default {
  name: 'TimeSeries',
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: false,
      default () {
        return 'filestore://'
      }
    },
    queueName: {
      type: String,
      required: false,
      default () {
        return 'default_queue'
      }
    },
    selectType: {
      type: String,
      required: true
    },
    selectTable: {
      type: String,
      required: true
    },
    wfid: {
      type: String,
      required: false,
      default () {
        return '140604'
      }
    },
    wtid: {
      type: String,
      required: false,
      default () {
        return '140604006'
      }
    },
    startTime: {
      type: String,
      required: false,
      default () {
        return '2019-01-11 00:00:00.000'
      }
    },
    endTime: {
      type: String,
      required: false,
      default () {
        return '2019-01-11 23:59:59.000'
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
          text: this.title,
          textStyle: {
            color: '#666'
          },
          top: 10,
          left: 'center'
        },
        legend: {
          data: [],
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
      let queryParams = {
        // eslint-disable-next-line
        query: `select type, ${this.selectType} from ${this.selectTable} where ((type=\'${this.selectTable}\' and wfid = \'${this.wfid}\' and wtid = \'${this.wtid}\')) and ts >= \'${this.startTime}\' and ts <= \'${this.endTime}\'`,
        resultType: 'REST',
        path: this.path,
        queueName: this.queueName,
        timeout: 6000
      }

      this.$axios.post(`${api.timeSeries}`, queryParams).then(res => {
        this.timeSeriesData = res.data.body.results
      }).catch(() => {
        this.timeSeriesChart.hideLoading()
      })
    },
    // 时序折线图
    showTimeSeriesChart () {
      let dataType = ['ts', 'type', 'wfid', 'wtid']
      let legendData = []
      // 获取图例
      Object.keys(this.timeSeriesData[0]).filter(item => {
        if (!dataType.includes(item)) {
          legendData.push(item)
        }
      })
      this.option.legend.data = legendData

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
  height: 100%;
  min-height: 360px;
}
</style>
