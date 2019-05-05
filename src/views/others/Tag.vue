<template>
  <Card style="height: 100%">
    <p slot="title">
      标签管理
    </p>
    <p><KfcTag></KfcTag></p>
  </Card>
</template>

<script>
import { Card } from 'iview'
import KfcTag from '@/components/kfc-tag'
export default {
  name: 'Tag',
  components: {
    Card,
    KfcTag
  }
}
</script>

<style scoped>

</style>
