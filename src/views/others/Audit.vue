<template>
  <Card style="height: 100%">
    <p slot="title">
      审计日志
    </p>
    <p><KfcAudit></KfcAudit></p>
  </Card>
</template>

<script>
import { Card } from 'iview'
import KfcAudit from '@/components/kfc-audit'
export default {
  name: 'Audit',
  components: {
    Card,
    KfcAudit
  }
}
</script>

<style scoped>

</style>
