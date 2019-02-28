<template>
  <div class="home page-container">
    <TimeSeries :queryParams="queryParams" />
    <PasResultsList :pasQueryParams="pasQueryParams"></PasResultsList>
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="KMX 应用组件开发模板" />
    <footer class="footer">
      <Button
        ghost
        type="success"
        @click="navigateToAnotherPage">
        去往另一个页面
      </Button>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld'
import { Button } from 'iview'
import TimeSeries from '@/components/kfc-timeseries-chart'
import PasResultsList from '@/components/kfc-pas-results-list'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Button,
    TimeSeries,
    PasResultsList
  },
  data () {
    return {
      queryParams: {
        'query': 'select type, ts,wfid,wtid,WTUR_WSpd_Ra_F32,WTUR_Temp_Ra_F32 from gw_scada_7s_extension where ((type=\'gw_scada_7s_extension\' and wfid = \'140604\' and wtid = \'140604006\')) and ts >= \'2019-01-11 00:00:00.000\' and ts <= \'2019-01-11 23:59:59.000\'',
        'resultType': 'REST',
        'path': 'filestore://',
        'queueName': 'default_queue',
        'timeout': 12000
      },
      pasQueryParams: {
        filePath: '/test-lxt/102282/31284/20190226140308149/EXTRACTION',
        expand: false
      }
    }
  },
  methods: {
    navigateToAnotherPage () {
      this.$router.push('/another-page')
    }
  }

}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
.footer {
  margin-top: 20px;
}
</style>
