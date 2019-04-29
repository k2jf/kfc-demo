<template>
  <div class="danmaku-container">
    <div class="danmaku-wrapper" v-if="messageList.length">
      <Icon
        type="md-megaphone"
        style="float: left;margin-right: 5px"
        size="20" />
      <Danmaku :messageList="messageList" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'iview'
import Danmaku from './Danmaku'
import { getEffectiveAnnounce } from '../api'

export default {
  name: 'Display',
  components: {
    Icon,
    Danmaku
  },
  data () {
    return {
      messageList: []
    }
  },
  created () {
    getEffectiveAnnounce().then(data => {
      for (let i = 0; i < data.list.length; i++) {
        this.messageList.push(i + 1 + '.' + ' ' + data.list[i].content)
      }
    })
  }
}
</script>

<style scoped>

  .danmaku-container {
    position: absolute;
    top: 5px;
    width: 100%;
    z-index: 999;
  }
  .danmaku-wrapper {
    position: relative;
    width: 60%;
    margin: 0 auto;
    padding: 2px 12px;
    background-color: #D9EBFF;
    border-radius: 999px;
  }
</style>
