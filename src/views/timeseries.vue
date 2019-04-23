<template>
  <TimeSeries
    :title="title"
    :path="path"
    :queueName="queueName"
    :selectType="selectType"
    :selectTable="selectTable"
    :wfid="wfid"
    :wtid="wtid"
    :startTime="startTime"
    :endTime="endTime"
  />
</template>

<script>
import TimeSeries from '@/components/kfc-kmx-tsdw-chart'

export default {
  components: {
    TimeSeries
  },
  data () {
    return {
      title: '新疆哈密烟墩大二期整装天润风电场-F084机组',
      path: 'filestore://',
      queueName: 'default_queue',
      selectType: 'ts,wfid,wtid,WTUR_WSpd_Ra_F32,WTUR_Temp_Ra_F32',
      selectTable: 'gw_scada_7s_extension',
      wfid: '140604',
      wtid: '140604006',
      startTime: '2019-01-11 00:00:00.000',
      endTime: '2019-01-11 23:59:59.000'
    }
  }
}
</script>
