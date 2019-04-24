<!-- 用户组列表信息 -->
<template>
  <div>
    <CellGroup class="aside-list-panel" @on-click="onSelectClick">
      <Cell
        :selected="currentGroup && groupItem.id === currentGroup.id"
        :name="groupItem.id"
        v-for="groupItem in groupData"
        :key="groupItem.id">
        <Icon
          type="ios-people"
          size="18"
          color="#5cadff"
          slot="icon" />
        <span
          class="c-pointer"
          slot="label"
        >{{ groupItem.name }}</span>
        <span slot="extra" @click="showConfirmModal(groupItem.id)"><Icon
          type="ios-trash"
          size="16"
          color="#5cadff" /></span>
      </Cell>
    </CellGroup>
    <ConfirmModal ref="confirmModal" @transfer-ok="onDeleteClick"></ConfirmModal>
  </div>
</template>

<script>
import { Icon, CellGroup, Cell } from 'iview'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  name: 'GroupList',
  components: {
    Icon,
    CellGroup,
    Cell,
    ConfirmModal
  },
  props: {
    groupData: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    currentGroup: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      id: null // 删除id
    }
  },
  methods: {
    showConfirmModal (id) {
      this.id = id
      this.$refs.confirmModal.handleModal({
        content: '是否确认删除？'
      })
    },
    onDeleteClick () {
      this.$emit('on-delete', this.id)
    },
    onSelectClick (id) {
      this.$emit('on-select', id)
    }
  }
}
</script>
