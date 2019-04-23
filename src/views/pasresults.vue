<template>
  <PasResultsList :filePath="filePath" :expand="expand"></PasResultsList>
</template>

<script>
import PasResultsList from '@/components/kfc-kmx-eaf-result'

export default {
  components: {
    PasResultsList
  },
  data () {
    return {
      filePath: '/test-lxt/102282/31284/20190226140308149/EXTRACTION',
      expand: false
    }
  }
}
</script>
