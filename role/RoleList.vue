<!-- 角色列表信息 -->
<template>
  <div>
    <CellGroup class="aside-list-panel" @on-click="onSelectClick">
      <Cell
        :selected="currentRole && roleItem.id === currentRole.id"
        :name="roleItem.id"
        v-for="roleItem in roleData"
        :key="roleItem.id">
        <Icon
          type="ios-people"
          size="18"
          color="#5cadff"
          slot="icon" />
        <span
          class="c-pointer"
          slot="label"
        >{{ roleItem.name }}</span>
        <span slot="extra" @click.prevent="showConfirmModal(roleItem.id)"><Icon
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
  name: 'RoleList',
  components: {
    Icon,
    CellGroup,
    Cell,
    ConfirmModal
  },
  props: {
    roleData: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    currentRole: {
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
