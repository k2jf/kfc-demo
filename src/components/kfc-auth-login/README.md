# kfc-auth-login
分为基础登录页和酷炫登录页

### 基础登录页：

维护：wlh

```html
<template>
  <Login></Login>
</template>

<script>
import Login from '@/components/kfc-auth-login'
export default {
  name: 'LoginPage',
  components: {
    Login
  }
}
</script>

<style scoped>

</style>
```

### 酷炫登录页：

此页面不依赖第三方插件。

![cool-login](./demo.gif)

维护：kk

```html
<CoolLogin />
```
```js
import { CoolLogin } from '@/components/kfc-auth-login'

export default {
  components: { CoolLogin }
}
```
API：

| 属性     | 说明       | 类型   | 默认值               |
| -------- | ---------- | ------ | ----------------- |
| videoSrc | 背景视频源 | String | 金风官网宣传视频地址   |
| title    | 主标题     | String | -                  |
| subTitle | 副标题     | String | -                  |

> 标题位置可以通过 slot 自定义，slot='title'。使用 slot 后，title 和 subTitle 失效。

