<template>
  <a ref="copyAction">复制APIKey</a>
</template>

<script>
import { Message } from 'iview'
import Clipboard from 'clipboard'
import Server from './server.js'

export default {
  name: 'KfcCopyAction',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      copyText: '',
      clipboard: null
    }
  },
  mounted () {
    Server.getUserTokens(this.username)
      .then(data => {
        if (!data.length) {
          return
        }
        this.copyText = data[0].token

        let copyText = this.copyText
        this.clipboard = new Clipboard(this.$refs.copyAction, {
          text: function () {
            return copyText
          }
        })

        this.clipboard.on('success', function () {
          Message.success({
            content: '复制成功！',
            duration: 5,
            closable: true
          })
        })
        this.clipboard.on('error', function () {
          Message.error({
            content: '复制失败，请手动选择复制！',
            duration: 10,
            closable: true
          })
        })
      })
  },
  beforeDestroy () {
    this.clipboard.destroy()
  }
}
</script>
