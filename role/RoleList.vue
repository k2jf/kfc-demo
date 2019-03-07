<!-- 角色列表信息 -->
<template>
  <CellGroup>
    <Cell
      icon="ios-people"
      :selected="currentRole && roleItem.id === currentRole.id"
      v-for="roleItem in roleData"
      :key="roleItem.id">
      <Icon type="ios-people" slot="icon" />
      <span
        class="c-pointer"
        slot="label"
        @click="onSelectClick(roleItem.id)">{{ roleItem.name }}</span>
      <span slot="extra" @click="onDeleteClick(roleItem.id)"><Icon type="ios-trash" /></span>
    </Cell>
  </CellGroup>
</template>
<script>
import { Icon, CellGroup, Cell } from 'iview'

export default {
  name: 'RoleList',
  components: {
    Icon,
    CellGroup,
    Cell
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
    }
  },
  methods: {
    onDeleteClick (id) {
      this.$emit('on-delete', id)
    },
    onSelectClick (id) {
      this.$emit('on-select', id)
    }
  }
}
</script>
