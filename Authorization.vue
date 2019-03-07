<template>
  <div class="auth-split">
    <Split
      :value="0.3"
      :min="240"
      :max="250">
      <div slot="left">
        <RoleInfo @on-role-change="getCurrentRole" />
      </div>
      <div slot="right">
        <Tabs value="auth" type="line">
          <Button
            type="primary"
            size="small"
            style="margin: 15px"
            slot="extra"
            @click="isShowAuthModal = true"
          >
            添加权限
          </Button>
          <TabPane label="用户" disabled></TabPane>
          <TabPane
            label="权限"
            name="auth"
            class="auth-right-pane">
            <ResourceInfo :currentRole="currentRole" :resourceTypeList="resourceTypeList" />
            <ResourceEdit
              :currentRole="currentRole"
              :resourceTypeList="resourceTypeList"
              :isShowAuthModal="isShowAuthModal"
              v-if="currentRole"
              @on-close="isShowAuthModal = false" />
          </TabPane>
        </Tabs>
      </div>
    </Split>
  </div>
</template>

<script>
import { Split, Button, Tabs, TabPane } from 'iview'

import RoleInfo from './role'
import ResourceInfo from './resource'
import ResourceEdit from './resource/ResourceEdit.vue'

export default {
  name: 'Authorization',
  components: {
    Split,
    Button,
    Tabs,
    TabPane,
    RoleInfo,
    ResourceInfo,
    ResourceEdit
  },
  data () {
    return {
      isShowAuthModal: false,
      currentRole: null,
      resourceTypeList: [],
      token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 获取资源类型列表
    init () {
      var xhr = new XMLHttpRequest()
      var url = 'http://10.12.20.36:28091/auth-service/v1/resourcetypes?type=all'

      xhr.open('GET', url, true)
      xhr.setRequestHeader('K2_KEY', this.token)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.resourceTypeList = JSON.parse(xhr.responseText).result
        }
      }
      xhr.send(null)
    },
    getCurrentRole (currentRole) {
      this.currentRole = currentRole
    }
  }
}
</script>
