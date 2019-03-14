<template>
  <PasResultsList :pasQueryParams="pasQueryParams"></PasResultsList>
</template>

<script>
import PasResultsList from '@/components/kfc-pas-results-list'

export default {
  components: {
    PasResultsList
  },
  data () {
    return {
      pasQueryParams: {
        filePath: '/test-lxt/102282/31284/20190226140308149/EXTRACTION',
        expand: false
      }
    }
  }
}
</script>
