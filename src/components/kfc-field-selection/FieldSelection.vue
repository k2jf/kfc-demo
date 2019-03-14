<template>
  <div class="transfer-demo">
    <K2Transfer
      :data="fieldData"
      filterable
      :style="{width: '702px', margin: '0 auto'}"
      :list-style="{height: '400px', width: '300px'}"
      :target-keys="targetKeys"
      :titles="['未选字段', '已选字段']"
      :operations="['去除','选取']"
      @on-change="handleChange"
      @on-dblclick="handleChange">
    </K2Transfer>
  </div>
</template>
<script>
import K2Transfer from 'kfc-k2transfer'
import { token, baseUrl, testUrl } from './conf'

export default {
  name: 'FieldSelection',
  components: {
    K2Transfer
  },
  props: {
    fieldType: {
      type: String,
      default: 'gw_scada_7s'
    }
  },
  data () {
    return {
      fields: [],
      targetKeys: []
    }
  },
  computed: {
    fieldData () {
      return this.fields.map(f => {
        return {
          key: f.systemId.toString(),
          label: f.name
        }
      })
    }
  },
  mounted () {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', `${baseUrl}${this.fieldType}`, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const res = JSON.parse(xhr.responseText)
        if (res.code === 0) {
          this.fields = res.fieldGroup.fields
        }
      }
    }
    xhr.send()
  },
  methods: {
    handleChange (newTargetKeys) {
      this.targetKeys = newTargetKeys
      const selectedFeilds = this.fields.filter(
        f => newTargetKeys.includes(f.systemId.toString())
      )
      this.$emit('on-field-select-change', selectedFeilds)
    }
  }
}
</script>
<style lang="scss" scoped>
.transfer-demo {
  padding: 30px;
}
</style>
