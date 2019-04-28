<template>
  <div>
    <PasProjectDetail v-model="projectId" />
  </div>
</template>

<script>
import PasProjectDetail from '@/components/kfc-kmx-eaf-project'
export default {
  components: {
    PasProjectDetail
  },
  data () {
    return {
      projectId: 102295
    }
  }
}
</script>
