> 组件依赖 view， 请确保已安装

将下面配置加入 `package.json >> dependencies` 中

`"kfc-transfer": "git+https://github.com/k2jf/kfc-transfer.git"`

然后执行

```bash
# 安装依赖
npm install kfc-transfer
# 克隆组件到当前项目components中
git remote add -f kfc-kmx-tsdw-field git@github.com:k2jf/kfc-kmx-tsdw-field.git
git subtree add -P src/components/kfc-kmx-tsdw-field kfc-kmx-tsdw-field master --squash
# 检查一下是否成功连接远程库 kfc-kmx-tsdw-field
git remote -vv
```




## 使用示例：
```vue
<template>
  <div>
    <FieldSelection @on-field-select-change="handleChange" />
    <FieldSelectedButton @on-ok="handleOk" />
  </div>
</template>
<script>
import { FieldSelection, FieldSelectedButton } from '@/components/kfc-kmx-tsdw-field'

export default {
  components: {
    FieldSelection,
    FieldSelectedButton
  },
  methods: {
    handleChange (selectedFields) {
      // ...
    },
    handleOk (selectedFields) {
     // ...
    }
  }
}
</script>

```
## API

| 属性                    | 说明                           | 类型                 | 默认值        |
| ----------------------- | ------------------------------ | -------------------- | ------------- |
| fieldType               | 数据类型                       | String               | 'gw_scada_7s' |
| @on-field-select-change | 选项在两栏之间转移时的回调函数 | Func(selectedFields) | -             |
| @on-ok                  | 弹框确认时的回调               | Func(selectedFields) | -             |
