<template>
  <div id="wrapper">
    <div id="box">
      <div id="marquee">
        {{ text }}
      </div>
    </div>
    <div id="node">
      {{ text }}
    </div><!-- model, for calculating box width -->
  </div>
</template>

<script>
export default {
  name: 'Danmaku',
  props: ['messageList'],
  data () {
    return {
      offset: 0, // 位移距离
      clock: null // setInterval
    }
  },
  computed: {
    text () {
      return this.messageList.join('    ')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.start()
      const wrapper = document.getElementById('wrapper')
      wrapper.addEventListener('mouseenter', this.stop)
      wrapper.addEventListener('mouseleave', this.start)
    })
  },
  methods: {
    start () {
      if (!this.clock) {
        // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
        let width = document.getElementById('node').getBoundingClientRect().width
        let box = document.getElementById('box')
        // 设置位移
        this.clock = setInterval(() => {
          this.offset = this.offset - 1
          // 如果位移超过文字宽度，则回到起点
          if (-(this.offset) >= width) {
            this.offset = 16
          }
          box.style.transform = 'translateX(' + this.offset + 'px)'
        }, 30)
      }
    },
    stop () {
      if (this.clock) {
        clearInterval(this.clock)
        this.clock = null
      }
    }
  }

}
</script>

<style scoped>
  #wrapper {
    overflow: hidden;
  }
  #box {
    width: 8000%;
  }
  #box div {
    float: left;
  }
  #marquee {
    margin: 0 50px 0 0;
  }
  #node {
    position: absolute;
    z-index: -999;
    top: -999999px;
  }

</style>
