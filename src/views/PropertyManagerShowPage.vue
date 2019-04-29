<template>
  <Card dis-hover shadow>
    <p slot="title">
      属性查看器
    </p>
    <PropertyManager></PropertyManager>
  </Card>
</template>

<script>
import { Card } from 'iview'
import PropertyManager from '@/components/kfc-properties'
export default {
  name: 'PropertyManagerShowPage',
  components: {
    Card,
    PropertyManager
  }
}
</script>

<style scoped>

</style>
