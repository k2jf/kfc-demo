<template>
  <Modal
    :mask-closable="false"
    v-model="showModal"
    @on-ok="ok"
    @on-cancel="cancel">
    <div slot="header">
      删除确认
    </div>
    <span>确定要删除这条通知吗？</span>
  </Modal>
</template>

<script>
import { Modal } from 'iview'
import { delAnnounce } from '../api'

export default {
  name: 'ModalDelAnnounce',
  components: {
    Modal
  },
  data () {
    return {
      showModal: false,
      indexToDel: ''
    }
  },
  methods: {

    /* public */ openForDelete (index) {
      this.indexToDel = index
      this.showModal = true
    },

    ok () {
      delAnnounce(this.indexToDel).then(data => {
        this.$Message.info('已删除')
        this.$parent.reloadTable()
        this.showModal = false
      })
    },

    cancel () {
      this.showModal = false
    }
  }
}
</script>

<style scoped>

</style>
