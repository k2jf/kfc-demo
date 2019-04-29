<template>
  <div class="container">
    <AnnounceDisplay></AnnounceDisplay>
    <AnnounceManager></AnnounceManager>
  </div>
</template>

<script>
import AnnounceManager from '@/components/kfc-announce/manager'
import AnnounceDisplay from '@/components/kfc-announce/display'

export default {
  name: 'AnnounceParts',
  components: {
    AnnounceDisplay, AnnounceManager
  }
}
</script>

<style scoped>

</style>
